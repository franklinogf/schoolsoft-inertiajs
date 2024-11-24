<?php

namespace App\Http\Controllers\PDF;

use App\Enums\TrimesterEnum;
use App\Http\Controllers\Controller;
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

        return inertia()->location(route('regiweb.notes.attendance.report', $validated));

    }

    public function reportPdf(Request $request)
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
        $pdf = new Fpdf;
        $pdf->AddPage();
        $pdf->SetFont('Courier', 'B', 18);
        $pdf->Cell(50, 25, 'Hello World!');

        $pdf->Output();
        exit;
    }
}
