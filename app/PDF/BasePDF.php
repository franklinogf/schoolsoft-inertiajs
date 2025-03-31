<?php

namespace App\PDF;

use Codedge\Fpdf\Fpdf\Fpdf;

class BasePDF extends Fpdf
{
    use HtmlPDF,RotatePDF;

    public function SetDash($black = null, $white = null): void
    {
        $s = $black !== null ? sprintf('[%.3F %.3F] 0 d', $black * $this->k, $white * $this->k) : '[] 0 d';
        $this->_out($s);
    }

    public function splitCells(string $value1, string $value2): void
    {
        $this->Cell(0, 5, $value1, 0, 0, 'L');
        $this->Cell(0, 5, $value2, 0, 1, 'R');
    }

    #[\Override]
    public function Cell($w, $h = 0, $txt = '', $border = 0, $ln = 0, $align = '', $fill = false, $link = ''): void
    {
        parent::Cell($w, $h, mb_convert_encoding($txt, 'windows-1252', 'UTF-8'), $border, $ln, $align, $fill, $link);
    }
}
