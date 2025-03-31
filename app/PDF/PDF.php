<?php

namespace App\PDF;

use App\Models\Admin;

class PDF extends BasePDF
{
    private readonly Admin $school;

    public bool $header = true;

    public bool|int $footer = 15;

    private $leftMargin = 10;

    public $headerFirstPage = false;

    public function __construct(string $title, $orientation = 'P', $unit = 'mm', $size = 'A4')
    {
        $this->school = Admin::getPrimaryAdmin()->first();
        parent::__construct($orientation, $unit, $size);
        $this->SetFillColor(89, 171, 227);
        $this->SetTitle($title, true);
        $this->SetAuthor($this->school->colegio, true);
        $this->SetCreator(config('app.name'), true);
    }

    #[\Override]
    public function header(): void
    {
        if (! $this->header) {
            return;
        }
        $this->leftMargin = $this->lMargin;
        $this->SetXY($this->leftMargin, 10);
        $this->SetMargins($this->leftMargin, 10);
        $this->SetFont('Times', 'B', 15);

        if (($this->headerFirstPage && $this->PageNo() === 1) || ! $this->headerFirstPage) {
            $this->Cell(0, 5, $this->school->colegio, 0, 1, 'C');
            $this->SetFont('Times', '', 9);

            if ($this->school->dir1 !== '') {
                $this->Cell(0, 4, $this->school->dir1, 0, 1, 'C');
            }

            if ($this->school->dir2 !== '') {
                $this->Cell(0, 4, $this->school->dir2, 0, 1, 'C');
            }
            $this->Cell(0, 4, $this->school->pueblo1.', '.$this->school->esta1.' '.$this->school->zip1, 0, 1, 'C');
            $this->Cell(0, 4, 'Tel: '.$this->school->telefono.' Fax: '.$this->school->fax, 0, 1, 'C');
            $this->Cell(0, 4, $this->school->correo, 0, 1, 'C');
            $this->Ln(10);
            $this->SetLeftMargin($this->leftMargin);
        }
    }

    #[\Override]
    public function Footer(): void
    {
        if ($this->footer === false) {
            return;
        }
        $this->SetTextColor(0);
        $this->AliasNbPages();
        $this->SetY(-$this->footer);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, __('Página')." {$this->PageNo()}/{nb}", 0, 0, 'C');

    }

    public function useHeader(bool $bool): void
    {
        $this->header = $bool;
    }

    public function useFooter(bool|int $bool): void
    {
        $this->footer = $bool;
    }
}
