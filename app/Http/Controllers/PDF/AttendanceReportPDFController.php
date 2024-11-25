<?php

namespace App\Http\Controllers\PDF;

use App\Enums\TrimesterEnum;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\PDF\PDF;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AttendanceReportPDFController extends Controller
{
    public function report(Request $request)
    {
        $validated = $request->validate([
            'course' => ['required', 'string'],
            'trimester' => ['required', Rule::enum(TrimesterEnum::class)],
        ]);

        $pdf = new Fpdf;
        $pdf->AddPage();
        $pdf->SetFont('Courier', 'B', 18);
        $pdf->Cell(50, 25, 'Hello World!');

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
        // $pdf->SetAuthor($school->colegio);
        // $pdf->SetCreator(config('app.name'));
        // $pdf->AddPage();
        // $pdf->SetFont('Courier', 'B', 18);
        // $pdf->Cell(50, 25, 'Hello World!');

        $pdf->Output();
        exit;
    }
}
