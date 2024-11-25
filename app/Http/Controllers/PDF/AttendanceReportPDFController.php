<?php

namespace App\Http\Controllers\PDF;

use App\Enums\TrimesterEnum;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\PDF\PDF;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AttendanceReportPDFController extends Controller
{
    private $year;

    public function __construct()
    {
        $this->year = app('year');
    }

    public function report(Request $request)
    {
        $validated = $request->validate([
            'course' => ['required', 'string'],
            'trimester' => ['required', Rule::enum(TrimesterEnum::class)],
        ]);

        [$year1,$year2] = explode('-', $this->year);

        $trimesterValue = [
            TrimesterEnum::FIRST_TRIMESTER->value => ['1', '2', '10'],
            TrimesterEnum::SECOND_TRIMESTER->value => ['3', '4', '12'],
            TrimesterEnum::THIRD_TRIMESTER->value => ['5', '6', '03'],
            TrimesterEnum::FOURTH_TRIMESTER->value => ['7', '8', '05'],
        ];
        $selectedTrimesterValue = $trimesterValue[$validated['trimester']];

        $months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ];
        $teacher = Teacher::find(auth()->id());
        $school = Admin::getPrimaryAdmin();
        $date1 = $school->{"asis{$selectedTrimesterValue[0]}"};
        $date2 = $school->{"asis{$selectedTrimesterValue[1]}"};

        $pdf = new PDF('Informe de asistencia');
        $pdf->useFooter(false);
        $pdf->SetLeftMargin(5);
        $pdf->AddPage();
        $pdf->SetFont('Times', 'B', 12);
        $pdf->Cell(0, 5, __('Año escolar'), 0, 1, 'C');
        $pdf->Cell(0, 5, "20{$year1}-20{$year2}", 0, 1, 'C');
        if (intval($selectedTrimesterValue[2]) < 6) {
            $date = "20{$year1}-{$selectedTrimesterValue[2]}-31";
        } else {
            $date = "20{$year2}-{$selectedTrimesterValue[2]}-31";
        }
        $pdf->Cell(0, 5, "{$months[$selectedTrimesterValue[2]]} {$date}", 0, 1, 'C');
        $pdf->Cell(0, 5, __('Informe de estudiantes con problemas de tardanzas y ausentismo por horario de clase'), 0, 1, 'C');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, __('Maestro(a):'));
        $pdf->Cell(75, 5, "$teacher->apellidos $teacher->nombre", 'B');

        if ($validated['course'] === 'grado') {
            $pdf->Cell(20, 5, __('Grado:'), 0, 0, 'C');
            $pdf->Cell(15, 5, "$teacher->grado", 'B', 1, 'C');
        } else {
            $course = Course::where('curso', $validated['course'])->first();
            $pdf->Cell(25, 5, __('Asignatura:'), 0, 0, 'C');
            $pdf->Cell(0, 5, "$course->curso - $course->desc1", 'B', 1);
        }

        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(10, 5, '', 1);
        $pdf->Cell(70, 5, __('Nombre del estudiante'), 1, 0, 'C');
        $pdf->Cell(20, 5, __('Horario'), 1, 0, 'C');
        $pdf->Cell(25, 5, __('Ausencias'), 1, 0, 'C');
        $pdf->Cell(25, 5, __('Tardanzas'), 1, 0, 'C');
        $pdf->Cell(50, 5, __('Observaciones'), 1, 1, 'C');
        $pdf->SetFont('Arial', '', 9);
        if ($validated['course'] === 'grado') {
            $students = Student::ofGrade($teacher->grado)->get();
        } else {
            $students = Student::ofCourse($validated['course'])->get();
        }

        foreach ($students as $index => $student) {
            $attendances = $student->attendances()
                ->whereDate('fecha', '>=', $date1)
                ->whereDate('fecha', '<=', $date2)->get();
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
            $pdf->Cell(70, 5, "$student->nombre $student->apellidos", 1);
            $pdf->Cell(20, 5, '', 1, 0, 'C');
            $pdf->Cell(25, 5, $attended, 1, 0, 'C');
            $pdf->Cell(25, 5, $late, 1, 0, 'C');
            $pdf->Cell(50, 5, '', 1, 1);
        }

        $pdf->Output();
        exit;

    }

    public function dailyReport(Request $request)
    {
        $validated = $request->validate([
            'initialDate' => ['required', 'date:Y-m-d'],
            'finalDate' => ['required', 'date:Y-m-d'],
            'option' => ['required', Rule::in(['home', 'student'])],
            'type' => ['required', Rule::in(['list', 'summary'])],
        ]);
        // $school = Admin::getPrimaryAdmin();
        $pdf = new PDF('Daily Report');
        $pdf->RotatedText(100, 60, 'Hello World!', 45);
        // $pdf->SetAuthor($school->colegio);
        // $pdf->SetCreator(config('app.name'));
        // $pdf->AddPage();
        // $pdf->SetFont('Courier', 'B', 18);
        // $pdf->Cell(50, 25, 'Hello World!');

        $pdf->Output();
        exit;
    }
}
