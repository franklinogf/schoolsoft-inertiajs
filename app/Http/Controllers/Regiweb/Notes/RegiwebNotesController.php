<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Enums\PagesEnum;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\Notes\SaveAttendanceRequest;
use App\Http\Requests\Regiweb\Notes\SaveDefaultRequest;
use App\Http\Requests\Regiweb\Notes\ShowRequest;
use App\Models\Admin;
use App\Models\StudentGrade;
use App\Models\Teacher;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegiwebNotesController extends Controller
{
    private Admin $admin;

    public function __construct(
        #[CurrentUser()] protected Teacher $user

    ) {
        $this->admin = Admin::getPrimaryAdmin();
     }

    public function index()
    {
        $this->user->load('courses');
        return Inertia::render('Regiweb/Notes/Index');
    }


    public function show(ShowRequest $request)
    {
        
        $year = $this->admin->getYear;

        $validated = $request->validated();
        $trimester = $validated['trimester'];
        $course = $validated['course'];
        $page = $validated['page'];

        $_schoolInfo = [
            'Trimestre-1' => [
                'number' => 1,
                'dates' => ['ft1', 'ft2'],
                'end' => 'sie1',
            ],
            'Trimestre-2' => [
                'number' => 2,
                'dates' => ['ft3', 'ft4'],
                'end' => 'sie2',
            ],
            'Trimestre-3' => [
                'number' => 3,
                'dates' => ['ft5', 'ft6'],
                'end' => 'sie3',
            ],
            'Trimestre-4' => [
                'number' => 4,
                'dates' => ['ft7', 'ft8'],
                'end' => 'sie4',
            ],
            'Verano' => [
                'number' => 5,
                'dates' => ['fechav1', 'fechav2'],
            ],
        ];

        $dates = $_schoolInfo[$trimester]['dates'];
        $end = $_schoolInfo[$trimester]['end'];
        $trimesterNumber = $_schoolInfo[$trimester]['number'];
        $initialDate = $this->admin->{$dates[0]};
        $finalDate = $this->admin->{$dates[1]};

        $gradeInfo = StudentGrade::where([
            ['curso', $course],
            ['year', $year],
        ])->first();

        $isLetter = !$gradeInfo ? false : $gradeInfo->letra === 'ON';
        $isPercent = $gradeInfo && $gradeInfo->nota_por === '1';
        $canEnd = $this->admin->sie === 'Si' && intval($this->admin->sieab) === 4;
        $hasEnded = $gradeInfo && $gradeInfo->{$end} === 'X';
        $isSumTrimester = $this->admin->sutri === YesNoEnum::NO;
        $_info = $this->getInfo();

        $_options = $_info[$page][$trimester];
        $values = $_options['values'] ?? null;
        $columns = $_info[$page]['columns'] ?? null;
        $thisReport = $_info[$page];
        $gradesValues = null;
        $gradesValuesId = null;
        $amountOfGrades = null;
        if (
            $page === PagesEnum::GRADES->value ||
            $page === PagesEnum::SUMMER_GRADES->value ||
            $page === PagesEnum::SHORT_TESTS->value ||
            $page === PagesEnum::DAILY_WORKS->value ||
            $page === PagesEnum::NOTEBOOKS_WORKS->value
        ) {
            $amountOfGrades = $page === PagesEnum::SUMMER_GRADES ? 7 : ($_options['grades'][1]) - ($_options['grades'][0]);
            $gradesNumbers = $thisReport[$trimester]['grades'];

            $amountOfValues = $page === PagesEnum::FINAL_EXAM ? 1 : $amountOfGrades ?? null;

            [$gradesValues, $gradesValuesId] = $this->getGradesValues($course, $trimester, $page, $amountOfValues);

            $students = StudentGrade::fromTable($thisReport['table'])
                ->where([
                    ['curso', $course],
                    ['year', $year],
                ])->when($page === PagesEnum::SUMMER_GRADES, function ($query) {
                    $query->where('verano', 2);
                })->orderBy('apellidos')
                ->get();
            $studentsGrades = $students->map(function (StudentGrade $student) use ($thisReport, $trimester, $_info, $course, $values, $gradesNumbers) {
                $grades = [];
                $index = 1;
                for ($i = $gradesNumbers[0]; $i <= $gradesNumbers[1]; $i++) {
                    $grades["nota$index"]['value'] = trim($student->{"not$i"});
                    $grades["nota$index"]['column'] = "not$i";
                    $index++;
                }

                $tdia = $this->findValueFor($_info[PagesEnum::DAILY_WORKS->value]['table'], $_info[PagesEnum::DAILY_WORKS->value][$trimester]['totalGrade'], $course, $student->ss);
                $tlib = $this->findValueFor($_info[PagesEnum::NOTEBOOKS_WORKS->value]['table'], $_info[PagesEnum::NOTEBOOKS_WORKS->value][$trimester]['totalGrade'], $course, $student->ss);
                $pcor = $this->findValueFor($_info[PagesEnum::SHORT_TESTS->value]['table'], $_info[PagesEnum::SHORT_TESTS->value][$trimester]['totalGrade'], $course, $student->ss);

                $tdiaTdp = $this->findValueFor($_info[PagesEnum::DAILY_WORKS->value]['table'], $_info[PagesEnum::DAILY_WORKS->value][$trimester]['values']['tdp'], $course, $student->ss);
                $tlibTdp = $this->findValueFor($_info[PagesEnum::NOTEBOOKS_WORKS->value]['table'], $_info[PagesEnum::NOTEBOOKS_WORKS->value][$trimester]['values']['tdp'], $course, $student->ss);
                $pcorTdp = $this->findValueFor($_info[PagesEnum::SHORT_TESTS->value]['table'], $_info[PagesEnum::SHORT_TESTS->value][$trimester]['values']['tdp'], $course, $student->ss);

                $tpa = $student->{$values['tpa']};
                $tdp = $student->{$values['tdp']};

                return [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'notas' => $grades,
                    'total' => trim($student->{$thisReport[$trimester]['totalGrade']}),
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
        } else if ($page === PagesEnum::CONDUCT_ATTENDANCE->value) {
            $students = StudentGrade::fromTable($thisReport['table'])
                ->where([
                    ['curso', $course],
                    ['year', $year],
                ])->orderBy('apellidos')
                ->get();
            $studentsGrades = $students->map(function (StudentGrade $student) use ($thisReport, $trimester) {

                return [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'conduct' => ['value' => $student->{$thisReport[$trimester][0]}, 'column' => $thisReport[$trimester][0]],
                    'absence' => ['value' => $student->{$thisReport[$trimester][1]}, 'column' => $thisReport[$trimester][1]],
                    'tardy' => ['value' => $student->{$thisReport[$trimester][2]}, 'column' => $thisReport[$trimester][2]],
                    'demerits' => ['value' => $student->{$thisReport[$trimester][3]}, 'column' => $thisReport[$trimester][3]],
                    'changed' => false,
                ];
            });

        } else if ($page === PagesEnum::FINAL_EXAM->value) {
            $students = StudentGrade::fromTable($thisReport['table'])
                ->where([
                    ['curso', $course],
                    ['year', $year],
                ])->orderBy('apellidos')
                ->get();
            $studentsGrades = $students->map(function (StudentGrade $student) use ($thisReport, $trimester) {
                return [
                    'id' => $student->aa,
                    'nombre' => $student->nombre,
                    'apellidos' => $student->apellidos,
                    'nota' => ['value' => $student->{$thisReport[$trimester]}, 'column' => $thisReport[$trimester]],
                    'changed' => false,
                ];
            });
        }




        return Inertia::render('Regiweb/Notes/Show', [
            'course' => $course,
            'page' => $page,
            'trimester' => $trimester,
            'studentsGrades' => $studentsGrades,
            'initialDate' => $initialDate,
            'finalDate' => $finalDate,
            'isLetter' => $isLetter,
            'isPercent' => $isPercent,
            'canEnd' => $canEnd,
            'hasEnded' => $hasEnded,
            'trimesterNumber' => $trimesterNumber,
            'isSumTrimester' => $isSumTrimester,
            'gradesValues' => $gradesValues,
            'gradesValuesId' => $gradesValuesId,
            'columns' => $columns,
            'amountOfGrades' => $amountOfGrades,
        ]);
    }

    public function saveDefault(SaveDefaultRequest $request)
    {
        $validated = $request->validated();
        $_info = $this->getInfo();
        $thisReport = $_info[$validated['page']];
        $trimesterInfo = $thisReport[$validated['trimester']];
        $values = $trimesterInfo['values'];

        foreach ($validated['data'] as $data) {
            $student = StudentGrade::fromTable($thisReport['table'])->where('aa', $data['id']);
            $array = [
                $values['tpa'] => $data['tpa'] ?? '',
                $values['tdp'] => $data['tdp'] ?? '',
                $trimesterInfo['totalGrade'] => $data['total'] ?? '',
            ];
            if ($validated['page'] === PagesEnum::GRADES->value) {
                $array[$values['tdia']] = $data['tdia'] ?? '';
                $array[$values['tlib']] = $data['tlib'] ?? '';
                $array[$values['pcor']] = $data['pcor'] ?? '';
            }
            foreach ($data['notas'] as $grade) {
                $array[$grade['column']] = $grade['value'] ?? '';
            }
            $student->update($array);
        }
        
        return redirect()->back();
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
        return redirect()->back();
    }

    public function saveExam()
    {

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

    private function findValueFor($table, $column, $course, $ss): string
    {
        $data = DB::table($table)->where([
            ['curso', $course],
            ['ss', $ss],
            ['year', $this->admin->getYear],
        ])->first();
        if (!$data) {
            return '';
        }

        return $data->{$column};
    }

    // private function findValue($table, $course, $ss, $column): string
    // {
    //     return DB::table($table)->select($column)->where([
    //         ['curso', $course],
    //         ['ss', $ss],
    //         ['year', $this->admin->getYear],
    //     ])->first()->{$column};
    // }

    private function getGradesValues($course, $trimester, $page, $amountOfValues)
    {
        $gradesValuesData = DB::table('valores')->where([
            ['curso', $course],
            ['year', $this->admin->getYear],
            ['trimestre', $trimester],
            ['nivel', $page],
        ])->first();
        if (!$gradesValuesData) {
            $id = DB::table('valores')->insertGetId([
                'curso' => $course,
                'year' => $this->admin->getYear,
                'trimestre' => $trimester,
                'nivel' => $page,
            ]);
            $gradesValuesData = DB::table('valores')->where('id', $id)->first();
        }
        $gradesValuesId = $gradesValuesData->id;
        $gradesValues = [];
        for ($i = 1; $i <= $amountOfValues; $i++) {
            $gradesValues["tema$i"] = $gradesValuesData->{"tema$i"} ?? '';
            $gradesValues["val$i"] = $gradesValuesData->{"val$i"} ?? '';
            $gradesValues["fec$i"] = $gradesValuesData->{"fec$i"} === '0000-00-00' ? '' : ($gradesValuesData->{"fec$i"} ?? '');
        }

        return [$gradesValues, $gradesValuesId];
    }

    public function saveValues(Request $request, int $id)
    {
        $valuesValidation = [];
        for ($i = 1; $i <= 12; $i++) {
            $valuesValidation["tema$i"] = ['nullable', "required_with:val{$i},fec{$i}", 'string'];
            $valuesValidation["val$i"] = ['nullable', "required_with:tema{$i},fec{$i}", 'numeric'];
            $valuesValidation["fec$i"] = ['nullable', "required_with:tema{$i},val{$i}", 'date'];
        }
        $validated = $request->validate([
            ...$valuesValidation,
        ]);

        DB::table('valores')->where('id', $id)->update($validated);
        return redirect()->back();

    }

    private function getInfo(): array
    {
        //TODO: Refactor this to use an enum
        $isCppd = $this->admin->cppd === YesNoEnum::YES->value;
        if ($isCppd) {
            return [
                'Notas' => [
                    'table' => 'padres',
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 12],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1',
                        ],
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [13, 24],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2',
                        ],
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [25, 36],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3',
                        ],
                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [37, 48],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4',
                        ],
                    ],
                ],
                'V-Nota' => [
                    'table' => 'padres',
                    'Verano' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 7],
                        'others' => ['con1', 'aus1', 'tar1'],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1',
                        ],
                    ],
                ],
            ];
        }
        // if (__ONLY_CBTM__) {
        //     $columns = [
        //         'es' => ['Bono', 'Promedio', 'T-Diario', 'T-Libreta', 'P-Cor'],
        //         'en' => ['Bonus', 'Average', 'DW', 'HW', 'Quiz'],
        //         'text' => [false, '60%', '10%', '10%', '20%']
        //     ];
        // } else {
        $columnsArray = ['Bono', 'T-Diario', 'T-Libreta', 'P-Cor'];
        // }

        return [
            'Notas' => [
                'table' => 'padres',
                'columns' => $columnsArray,
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'totalAverage' => 'average1',
                    'grades' => [1, 10],
                    'values' => [
                        'tdia' => 'td1',
                        'tlib' => 'tl1',
                        'pcor' => 'pc1',
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'totalAverage' => 'average2',
                    'grades' => [11, 20],
                    'values' => [
                        'tdia' => 'td2',
                        'tlib' => 'tl2',
                        'pcor' => 'pc2',
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'totalAverage' => 'average3',
                    'grades' => [21, 30],
                    'values' => [
                        'tdia' => 'td3',
                        'tlib' => 'tl3',
                        'pcor' => 'pc3',
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],
                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'totalAverage' => 'average4',
                    'grades' => [31, 40],
                    'values' => [
                        'tdia' => 'td4',
                        'tlib' => 'tl4',
                        'pcor' => 'pc4',
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],
                ],
            ],
            'Notas2' => [
                'table' => 'padres7',
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'totalAverage' => 'average1',
                    'grades' => [1, 10],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'totalAverage' => 'average2',
                    'grades' => [11, 20],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'totalAverage' => 'average3',
                    'grades' => [21, 30],
                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'totalAverage' => 'average4',
                    'grades' => [31, 40],
                ],
            ],
            'Pruebas-Cortas' => [
                'table' => 'padres4',
                'columns' => ['Nota 10'],
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
            ],
            'Trab-Diarios' => [
                'table' => 'padres2',
                'columns' => ['Nota 10'],
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
            ],
            'Trab-Diarios2' => [
                'table' => 'padres5',
                'columns' => ['Nota 10'],
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
            ],
            'Trab-Libreta' => [
                'table' => 'padres3',
                'columns' => ['Nota 10'],
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
            ],
            'Trab-Libreta2' => [
                'table' => 'padres6',
                'columns' => ['Nota 10'],
                'Trimestre-1' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                'Trimestre-2' => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                'Trimestre-3' => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                'Trimestre-4' => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
            ],
            'Cond-Asis' => [
                'table' => 'padres',
                'Trimestre-1' => ['con1', 'aus1', 'tar1', 'de1'],
                'Trimestre-2' => ['con2', 'aus2', 'tar2', 'de2'],
                'Trimestre-3' => ['con3', 'aus3', 'tar3', 'de3'],
                'Trimestre-4' => ['con4', 'aus4', 'tar4', 'de4'],
            ],
            'Ex-Final' => [
                'table' => 'padres',
                'Trimestre-2' => 'ex1',
                'Trimestre-4' => 'ex2',
            ],
            'V-Nota' => [
                'table' => 'padres',
                'columns' => ['Bono', 'T-Diario', 'T-Libreta', 'P-Cor'],
                'Verano' => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 7],
                    'others' => ['con1', 'aus1', 'tar1'],
                    'values' => [
                        'tdia' => 'td1',
                        'tlib' => 'tl1',
                        'pcor' => 'pc1',
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
            ],
        ];

    }
}
