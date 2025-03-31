<?php

declare(strict_types=1);

namespace App\Http\Controllers\PDF;

use App\Enums\AttendanceEnum;
use App\Enums\TrimesterEnum;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Course;
use App\Models\Student;
use App\Models\StudentAttendance;
use App\Models\Teacher;
use App\PDF\PDF;
use App\Utils;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

final class AttendanceReportPDFController extends Controller
{
    private $year;

    public function __construct()
    {
        $this->year = app('year');
    }

    public function report(Request $request): void
    {
        $validated = $request->validate([
            'course' => ['required', 'string'],
            'trimester' => ['required', Rule::enum(TrimesterEnum::class)],
        ]);

        [$year1,$year2] = explode('-', (string) $this->year);

        $trimesterValue = [
            TrimesterEnum::FIRST_TRIMESTER->value => ['1', '2', '10'],
            TrimesterEnum::SECOND_TRIMESTER->value => ['3', '4', '12'],
            TrimesterEnum::THIRD_TRIMESTER->value => ['5', '6', '03'],
            TrimesterEnum::FOURTH_TRIMESTER->value => ['7', '8', '05'],
        ];
        $selectedTrimesterValue = $trimesterValue[$validated['trimester']];
        $isHomeCourse = $validated['course'] === 'home';

        $month = ucfirst(Utils::getMonthName($selectedTrimesterValue[2]));

        if ($isHomeCourse) {
            $teacher = Teacher::find(auth()->id());
            $students = Student::ofGrade($teacher->grado)->get();
        } else {
            $course = Course::where('curso', $validated['course'])->with('teacher')->firstOrFail();
            $teacher = $course->teacher;
            $students = Student::ofCourse($validated['course'])->get();
        }
        $school = Admin::getPrimaryAdmin()->first();
        $date1 = $school->{"asis{$selectedTrimesterValue[0]}"};
        $date2 = $school->{"asis{$selectedTrimesterValue[1]}"};

        $pdf = new PDF(__('pdf.attendanceReport.metaTitle'));
        $pdf->useFooter(false);
        $pdf->SetLeftMargin(5);
        $pdf->AddPage();
        $pdf->SetFont('Times', 'B', 12);
        $pdf->Cell(0, 5, __('pdf.attendanceReport.schoolYear'), 0, 1, 'C');
        $pdf->Cell(0, 5, "20{$year1}-20{$year2}", 0, 1, 'C');
        $date = (int) ($selectedTrimesterValue[2]) < 6 ? "20{$year1}-{$selectedTrimesterValue[2]}-31" : "20{$year2}-{$selectedTrimesterValue[2]}-31";
        $pdf->Cell(0, 5, "{$month} {$date}", 0, 1, 'C');
        $pdf->Cell(0, 5, __('pdf.attendanceReport.title'), 0, 1, 'C');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, __('pdf.attendanceReport.teacher'), 0, 0, 'C');
        $pdf->Cell(75, 5, "{$teacher->apellidos} {$teacher->nombre}", 'B');

        if ($isHomeCourse) {
            $pdf->Cell(20, 5, __('pdf.attendanceReport.grade'), 0, 0, 'C');
            $pdf->Cell(15, 5, $teacher->grado, 'B', 1, 'C');
        } else {
            $pdf->Cell(25, 5, __('pdf.attendanceReport.subject'), 0, 0, 'C');
            $pdf->Cell(0, 5, "{$course->curso} - {$course->desc1}", 'B', 1);
        }

        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(10, 5, '', 1, 0, 0, true);
        $pdf->Cell(70, 5, __('pdf.attendanceReport.columns.1'), 1, 0, 'C', true);
        $pdf->Cell(20, 5, __('pdf.attendanceReport.columns.2'), 1, 0, 'C', true);
        $pdf->Cell(25, 5, __('pdf.attendanceReport.columns.3'), 1, 0, 'C', true);
        $pdf->Cell(25, 5, __('pdf.attendanceReport.columns.4'), 1, 0, 'C', true);
        $pdf->Cell(50, 5, __('pdf.attendanceReport.columns.5'), 1, 1, 'C', true);
        $pdf->SetFont('Arial', '', 9);

        foreach ($students as $index => $student) {
            $attendances = $student->attendances()
                ->whereDatesBetween($date1, $date2)
                ->get();
            $attended = 0;
            $late = 0;

            foreach ($attendances as $attendance) {
                if ($attendance->codigo <= 7) {
                    $attended++;
                } elseif ($attendance->codigo >= 8) {
                    $late++;
                }
            }
            $pdf->Cell(10, 5, $index + 1, 1);
            $pdf->Cell(70, 5, "{$student->nombre} {$student->apellidos}", 1);
            $pdf->Cell(20, 5, '', 1, 0, 'C');
            $pdf->Cell(25, 5, $attended, 1, 0, 'C');
            $pdf->Cell(25, 5, $late, 1, 0, 'C');
            $pdf->Cell(50, 5, '', 1, 1);
        }

        $pdf->Output();

        exit;

    }

    public function dailyReport(Request $request): void
    {
        $validated = $request->validate([
            'initialDate' => ['required', 'date:Y-m-d'],
            'finalDate' => ['required', 'date:Y-m-d'],
            'option' => ['required', Rule::in(['home', 'student'])],
            'type' => ['sometimes', Rule::in(['list', 'summary'])],
            'student' => ['sometimes', 'exists:year,mt'],
        ]);
        $isHomeCourse = $validated['option'] === 'home';
        $isList = $validated['type'] === 'list';
        $pdf = new PDF('Daily Report');
        $pdf->useFooter(false);
        $pdf->SetLeftMargin(5);
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 12);

        if ($isHomeCourse) {
            $title = $validated['type'] === 'list' ? 'Lista de asistencias diarias' : 'Resumen de asistencias diarias';
            $teacher = Teacher::find(auth()->id());
            $grade = $teacher->grado;
        } else {
            $title = 'Asistencias diarias';
        }
        $initialDate = ucfirst(Carbon::createFromDate($validated['initialDate'])->translatedFormat('F j, Y'));
        $finalDate = ucfirst(Carbon::createFromDate($validated['finalDate'])->translatedFormat('F j, Y'));
        $pdf->Cell(0, 5, "{$title} {$this->year}", 0, 1, 'C');
        $pdf->Cell(0, 10, "Desde: {$initialDate} / Hasta: {$finalDate}", 0, 1, 'C');
        $pdf->SetFont('Arial', 'B', 10);

        if ($isHomeCourse) {

            if (! $isList) {
                $pdf->Cell(15);
            }
            $pdf->Cell(10, 5, '', 'LTB', 0, 'C', true);
            $pdf->Cell(50, 5, 'Apellidos', 'RTB', 0, 'C', true);
            $pdf->Cell(50, 5, 'Nombre', 1, 0, 'C', true);

            if ($isList) {
                $pdf->Cell(25, 5, 'Fecha', 1, 0, 'C', true);
                $pdf->Cell(60, 5, 'Asistencia', 1, 0, 'C', true);
            } else {
                $pdf->Cell(30, 5, 'Ausencias', 1, 0, 'C', true);
                $pdf->Cell(30, 5, 'Tardanzas', 1, 0, 'C', true);
            }
            $pdf->Ln();
            $pdf->SetFont('Arial', '', 10);

            if ($isList) {
                $studentAttendances = StudentAttendance::where([['codigo', '>', 0], ['grado', $grade]])
                    ->whereDatesBetween($validated['initialDate'], $validated['finalDate'])
                    ->orderBy('apellidos')->orderBy('nombre')->orderBy('fecha')->get();

                foreach ($studentAttendances as $index => $attendance) {
                    $pdf->Cell(10, 5, $index + 1, 1, 0, 'C');
                    $pdf->Cell(50, 5, $attendance->apellidos, 1);
                    $pdf->Cell(50, 5, $attendance->nombre, 1);
                    $pdf->Cell(25, 5, $attendance->fecha, 1, 0, 'C');
                    $pdf->Cell(60, 5, AttendanceEnum::get($attendance->codigo)->labelWithType(), 1, 1);
                }
            } else {
                $studentAttendances = StudentAttendance::where([['codigo', '>', 0], ['grado', $grade]])
                    ->whereDatesBetween($validated['initialDate'], $validated['finalDate'])
                    ->orderBy('apellidos')->orderBy('nombre')
                    ->get()->groupBy('ss');
                $count = 1;

                foreach ($studentAttendances as $ss => $attendances) {
                    $absences = $tardiness = 0;

                    foreach ($attendances as $attendance) {
                        $absences += (int) ($attendance->codigo) <= 7 ? 1 : 0;
                        $tardiness += (int) ($attendance->codigo) >= 8 ? 1 : 0;

                    }
                    $student = Student::where('ss', $ss)->select(['nombre', 'apellidos'])->first();

                    $pdf->Cell(15);
                    $pdf->Cell(10, 5, $count, 1, 0, 'C');
                    $pdf->Cell(50, 5, $student->apellidos, 1);
                    $pdf->Cell(50, 5, $student->nombre, 1);
                    $pdf->Cell(30, 5, $absences, 1, 0, 'C');
                    $pdf->Cell(30, 5, $tardiness, 1, 1, 'C');
                    $count++;
                }

            }
        } else {
            $student = Student::with('attendances')->findOrFail($validated['student']);

            $pdf->splitCells("Nombre: {$student->apellidos}, {$student->nombre}", "Grado: {$student->grado}");
            $pdf->Ln(10);
            $pdf->Cell(40);
            $pdf->Cell(10, 5, '', 'LTB', 0, 'C', true);
            $pdf->Cell(35, 5, 'Fecha', 'RTB', 0, 'C', true);
            $pdf->Cell(70, 5, 'Asistencia', 1, 1, 'C', true);
            $pdf->SetFont('Arial', '', 10);

            foreach ($student->attendances as $index => $attendance) {
                $pdf->Cell(40);
                $pdf->Cell(10, 5, $index + 1, 1, 0, 'C');
                $pdf->Cell(35, 5, $attendance->fecha, 1, 0, 'C');
                $pdf->Cell(70, 5, AttendanceEnum::get($attendance->codigo)->labelWithType(), 1, 1);
            }

        }

        $pdf->Output();

        exit;
    }
}
