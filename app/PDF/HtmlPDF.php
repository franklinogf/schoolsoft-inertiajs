<?php

namespace App\PDF;

trait HtmlPDF
{
    private $HREF = '';

    private $ALIGN = '';

    public function WriteHTML($html): void
    {
        // HTML parser
        $html = str_replace("\n", ' ', $html);
        $a = preg_split('/<(.*)>/U', $html, -1, PREG_SPLIT_DELIM_CAPTURE);

        foreach ($a as $i => $e) {
            if ($i % 2 == 0) {
                // Text
                if ($this->HREF) {
                    $this->PutLink($this->HREF, $e);
                } elseif ($this->ALIGN == 'center') {
                    $this->Cell(0, 5, $e, 0, 1, 'C');
                } else {
                    $this->Write(5, $e);
                }
            } elseif ($e[0] === '/') {
                // Tag
                $this->CloseTag(strtoupper(substr($e, 1)));
            } else {
                // Extract properties
                $a2 = explode(' ', $e);
                $tag = strtoupper(array_shift($a2));
                $prop = [];

                foreach ($a2 as $v) {
                    if (preg_match('/([^=]*)=["\']?([^"\']*)/', $v, $a3)) {
                        $prop[strtoupper($a3[1])] = $a3[2];
                    }
                }
                $this->OpenTag($tag, $prop);
            }
        }
    }

    public function OpenTag($tag, $prop): void
    {
        // Opening tag
        if ($tag == 'B' || $tag == 'I' || $tag == 'U') {
            $this->SetStyle($tag, true);
        }

        if ($tag == 'A') {
            $this->HREF = $prop['HREF'];
        }

        if ($tag == 'BR') {
            $this->Ln(5);
        }

        if ($tag == 'P') {
            $this->ALIGN = $prop['ALIGN'];
        }

        if ($tag == 'HR') {
            $Width = empty($prop['WIDTH']) ? $this->w - $this->lMargin - $this->rMargin : $prop['WIDTH'];
            $this->Ln(2);
            $x = $this->GetX();
            $y = $this->GetY();
            $this->SetLineWidth(0.4);
            $this->Line($x, $y, $x + $Width, $y);
            $this->SetLineWidth(0.2);
            $this->Ln(2);
        }
    }

    public function CloseTag($tag): void
    {
        // Closing tag
        if ($tag == 'B' || $tag == 'I' || $tag == 'U') {
            $this->SetStyle($tag, false);
        }

        if ($tag == 'A') {
            $this->HREF = '';
        }

        if ($tag == 'P') {
            $this->ALIGN = '';
        }
    }

    public function SetStyle($tag, $enable): void
    {
        // Modify style and select corresponding font
        $this->{$tag} += ($enable ? 1 : -1);
        $style = '';

        foreach (['B', 'I', 'U'] as $s) {
            if ($this->{$s} > 0) {
                $style .= $s;
            }
        }
        $this->SetFont('', $style);
    }

    public function PutLink($URL, $txt): void
    {
        // Put a hyperlink
        $this->SetTextColor(0, 0, 255);
        $this->SetStyle('U', true);
        $this->Write(5, $txt, $URL);
        $this->SetStyle('U', false);
        $this->SetTextColor(0);
    }
}
