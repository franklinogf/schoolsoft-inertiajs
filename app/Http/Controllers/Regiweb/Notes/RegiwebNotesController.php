<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Notes;

use App\Enums\FlashMessageKey;
use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\Notes\SaveAttendanceRequest;
use App\Http\Requests\Regiweb\Notes\SaveDefaultRequest;
use App\Http\Requests\Regiweb\Notes\ShowRequest;
use App\Models\Admin;
use App\Models\StudentGrade;
use App\Models\Teacher;
use App\Services\AdminService;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

final class RegiwebNotesController extends Controller
{
    public function __construct(
        #[CurrentUser()]
 private readonly Teacher $user,
        private ?string $year,
        private ?Admin $admin,
        private readonly AdminService $adminService,

    ) {
        $this->admin = $this->adminService->getPrimaryAdmin();
        $this->year = app('year');
    }

    public function index()
    {
        $this->user->load(['courses', 'students']);
        $students = $this->user->students;

        return Inertia::render('Regiweb/Notes/Index', [
            'students' => $students,
        ]);
    }

    public function show(ShowRequest $request)
    {
        $validated = $request->validated();
        $trimester = TrimesterEnum::from($validated['trimester']);
        $course = $validated['course'];
        $page = PagesEnum::from($validated['page']);

        $gradeInfo = $this->getGradeInfo($course, $trimester->endColum());

        [$gradesValues, $gradesValuesId] = $this->getGradesValues($course, $trimester, $page);

        $studentsGrades = $this->getStudentsGrades($course, $page, $trimester);

        return Inertia::render('Regiweb/Notes/Show', [
            'course' => $course,
            'page' => $page,
            'trimester' => $trimester->value,
            'studentsGrades' => Inertia::defer(fn () => $studentsGrades),
            'initialDate' => $this->admin->{$trimester->startDateColumn()},
            'finalDate' => $this->admin->{$trimester->endDateColumn()},
            'isLetter' => $gradeInfo['isLetter'],
            'isPercent' => $gradeInfo['isPercent'],
            'canEnd' => $gradeInfo['canEnd'],
            'hasEnded' => $gradeInfo['hasEnded'],
            'isSumTrimester' => $gradeInfo['isSumTrimester'],
            'trimesterNumber' => $trimester->number(),
            'gradesValues' => $gradesValues,
            'gradesValuesId' => $gradesValuesId,
            'columns' => $page->extraColumns(),
            'amountOfGrades' => $page->amountOfGrades($trimester),
        ]);
    }

    public function saveDefault(SaveDefaultRequest $request)
    {
        $validated = $request->validated();
        $page = PagesEnum::from($validated['page']);
        $trimester = TrimesterEnum::from($validated['trimester']);

        // $trimesterInfo = $thisReport[$validated['trimester']];
        // $values = $trimesterInfo['values'];

        foreach ($validated['data'] as $data) {
            $student = StudentGrade::fromTable($page->table())->where('aa', $data['id']);
            $array = [
                $page->tpaColumn($trimester) => $data['tpa'] ?? '',
                $page->tdpColumn($trimester) => $data['tdp'] ?? '',
                $page->totalGradeColumn($trimester) => $data['total'] ?? '',
            ];

            if ($page === PagesEnum::GRADES) {
                $array[$page->tdiaColumn($trimester)] = $data['tdia'] ?? '';
                $array[$page->tlibColumn($trimester)] = $data['tlib'] ?? '';
                $array[$page->pcorColumn($trimester)] = $data['pcor'] ?? '';
            }

            foreach ($data['notas'] as $grade) {
                $array[$grade['column']] = $grade['value'] ?? '';
            }
            $student->update($array);
        }

        return redirect()->back()->with(FlashMessageKey::SUCCESS->value, __('Notes saved successfully'));
    }

    public function saveAttendance(SaveAttendanceRequest $request)
    {
        $validated = $request->validated();

        foreach ($validated['data'] as $data) {
            $student = StudentGrade::fromTable('padres')->where('aa', $data['id']);
            $array = [
                $data['conduct']['column'] => $data['conduct']['value'] ?? '',
                $data['absence']['column'] => $data['absence']['value'] ?? '',
                $data['tardy']['column'] => $data['tardy']['value'] ?? '',
                $data['demerits']['column'] => $data['demerits']['value'] ?? '',
            ];
            $student->update($array);
        }

        return redirect()->back()->with(FlashMessageKey::SUCCESS->value, __('Attendance saved successfully'));
    }

    public function saveValues(Request $request, int $id)
    {
        $valuesValidation = [];

        for ($i = 1; $i <= 12; $i++) {
            $valuesValidation["tema{$i}"] = ['nullable', "required_with:val{$i},fec{$i}", 'string'];
            $valuesValidation["val{$i}"] = ['nullable', "required_with:tema{$i},fec{$i}", 'numeric'];
            $valuesValidation["fec{$i}"] = ['nullable', "required_with:tema{$i},val{$i}", 'date'];
        }
        $validated = $request->validate([
            ...$valuesValidation,
        ]);

        DB::table('valores')->where('id', $id)->update($validated);

        return redirect()->back()->with(FlashMessageKey::SUCCESS->value, __('Values saved successfully'));

    }
    // private function findTotal($info, $type, $trimesterNumber, $page, $student)
    // {
    //     if ($trimesterNumber === 2 || $trimesterNumber === 4) {
    //         $lastTrimester = $trimesterNumber - 1;
    //         $t = $info[$page]["Trimestre-$lastTrimester"]['values'][$type];

    //         return (int) $student->{$t};
    //     }

    //     return 0;
    // }

    private function findValueFor(string $table, string $course, $ss): ?object
    {
        return DB::table($table)->where([
            ['curso', $course],
            ['ss', $ss],
            ['year', $this->year],
        ])->first();
    }

    // private function findValue($table, $course, $ss, $column): string
    // {
    //     return DB::table($table)->select($column)->where([
    //         ['curso', $course],
    //         ['ss', $ss],
    //         ['year', $this->admin->getYear],
    //     ])->first()->{$column};
    // }
    private function getGradeInfo(string $course, ?string $end): array
    {
        $gradeInfo = StudentGrade::where([
            ['curso', $course],
            ['year', $this->year],
        ])->first();

        return [
            'isLetter' => $gradeInfo?->letra === 'ON',
            'isPercent' => $gradeInfo?->nota_por === '1',
            'hasEnded' => $gradeInfo?->{$end} === 'X',
            'canEnd' => $this->admin->sie === YesNoEnum::YES->value && (int) ($this->admin->sieab) === 4,
            'isSumTrimester' => $this->admin->sutri === YesNoEnum::YES->value,
        ];
    }

    private function getStudentsGrades(string $course, PagesEnum $page, TrimesterEnum $trimester)
    {
        $year = app('year');
        $table = $page->table();
        if ($page === PagesEnum::CONDUCT_ATTENDANCE) {
            $trimesterInfo = $page->trimesterInfo($trimester);

            return StudentGrade::fromTable($table)
                ->where([
                    ['curso', $course],
                    ['year', $year],
                ])->orderBy('apellidos')
                ->get()->map(fn (StudentGrade $student): array => [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'conduct' => ['value' => $student->{$trimesterInfo[0]}, 'column' => $trimesterInfo[0]],
                    'absence' => ['value' => $student->{$trimesterInfo[1]}, 'column' => $trimesterInfo[1]],
                    'tardy' => ['value' => $student->{$trimesterInfo[2]}, 'column' => $trimesterInfo[2]],
                    'demerits' => ['value' => $student->{$trimesterInfo[3]}, 'column' => $trimesterInfo[3]],
                    'changed' => false,
                ]);
        }

        if ($page === PagesEnum::FINAL_EXAM) {
            $trimesterInfo = $page->trimesterInfo($trimester);

            return StudentGrade::fromTable($table)
                ->where([
                    ['curso', $course],
                    ['year', $year],
                ])->orderBy('apellidos')
                ->get()->map(fn (StudentGrade $student): array => [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'nota' => ['value' => $student->{$trimesterInfo}, 'column' => $trimesterInfo],
                    'changed' => false,
                ]);
        }

        return StudentGrade::fromTable($table)
            ->where([
                ['curso', $course],
                ['year', $year],
            ])->when($page === PagesEnum::SUMMER_GRADES, function ($query): void {
                $query->where('verano', 2);
            })->orderBy('apellidos')
            ->get()->map(function (StudentGrade $student) use ($trimester, $course, $page): array {
                $grades = [];
                $index = 1;
                $gradesNumbers = $page->gradesRange($trimester);

                if ($gradesNumbers !== null) {
                    for ($i = $gradesNumbers[0]; $i <= $gradesNumbers[1]; $i++) {
                        $grades["nota{$index}"]['value'] = mb_trim((string) $student->{"not{$i}"});
                        $grades["nota{$index}"]['column'] = "not{$i}";
                        $index++;
                    }
                }

                $tdiaData = $this->findValueFor(PagesEnum::DAILY_WORKS->table(), $course, $student->ss);
                $tdia = $tdiaData->{PagesEnum::DAILY_WORKS->totalGradeColumn($trimester)} ?? '';
                $tdiaTdp = $tdiaData->{PagesEnum::DAILY_WORKS->tdpColumn($trimester)} ?? '';

                $tlibData = $this->findValueFor(PagesEnum::NOTEBOOKS_WORKS->table(), $course, $student->ss);
                $tlib = $tlibData->{PagesEnum::NOTEBOOKS_WORKS->totalGradeColumn($trimester)} ?? '';
                $tlibTdp = $tlibData->{PagesEnum::NOTEBOOKS_WORKS->tdpColumn($trimester)} ?? '';

                $pcorData = $this->findValueFor(PagesEnum::SHORT_TESTS->table(), $course, $student->ss);
                $pcor = $pcorData->{PagesEnum::SHORT_TESTS->totalGradeColumn($trimester)} ?? '';
                $pcorTdp = $pcorData->{PagesEnum::SHORT_TESTS->tdpColumn($trimester)} ?? '';

                $tpa = $student->{$page->tpaColumn($trimester)};
                $tdp = $student->{$page->tdpColumn($trimester)};

                return [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'notas' => $grades,
                    'total' => mb_trim((string) $student->{$page->totalGradeColumn($trimester)}),
                    'tdia' => $tdia,
                    'tlib' => $tlib,
                    'pcor' => $pcor,
                    'tpa' => $tpa,
                    'tdp' => $tdp,
                    'tdiaTdp' => $tdiaTdp,
                    'tlibTdp' => $tlibTdp,
                    'pcorTdp' => $pcorTdp,
                    'changed' => false,
                ];
            });

    }

    private function getGradesValues(string $course, TrimesterEnum $trimester, PagesEnum $page): array
    {
        $gradesValuesData = DB::table('valores')->where([
            ['curso', $course],
            ['year', $this->year],
            ['trimestre', $trimester],
            ['nivel', $page],
        ])->first();

        if (! $gradesValuesData) {
            $id = DB::table('valores')->insertGetId([
                'curso' => $course,
                'year' => $this->year,
                'trimestre' => $trimester,
                'nivel' => $page,
            ]);
            $gradesValuesData = DB::table('valores')->where('id', $id)->first();
        }
        $gradesValuesId = $gradesValuesData->id ?: null;
        $gradesValues = [];

        $amountOfValues = $page->amountOfValues($trimester);

        for ($i = 1; $i <= $amountOfValues; $i++) {
            $gradesValues["tema{$i}"] = $gradesValuesData->{"tema{$i}"} ?? '';
            $gradesValues["val{$i}"] = $gradesValuesData->{"val{$i}"} ?? '';
            $gradesValues["fec{$i}"] = $gradesValuesData->{"fec{$i}"} === '0000-00-00' ? '' : ($gradesValuesData->{"fec{$i}"} ?? '');
        }

        return [count($gradesValues) > 0 ? $gradesValues : null, $gradesValuesId];
    }
}
