<?php

namespace App\PDF;

use Codedge\Fpdf\Fpdf\Fpdf;

class BasePDF extends Fpdf
{
    use RotatePDF;
}
