<?php

namespace App\Http\Controllers\PDF;

use App\Http\Controllers\Controller;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Http\Request;

class AttendanceReportPDFController extends Controller
{
    public function report(Request $request)
    {
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
