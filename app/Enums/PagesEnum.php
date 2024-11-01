<?php

namespace App\Enums;

enum PagesEnum: string
{
    case GRADES = 'Notas';
    case SHORT_TESTS = 'Pruebas-Cortas';
    case DAILY_WORKS = 'Trab-Diarios';
    case NOTEBOOKS_WORKS = 'Trab-Libreta';
    case CONDUCT_ATTENDANCE = 'Cond-Asis';
    case FINAL_EXAM = 'Ex-Final';
    case SUMMER_GRADES = 'V-Nota';
}
