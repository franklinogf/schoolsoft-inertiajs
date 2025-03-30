<?php

namespace App\Enums;

enum PagesEnum: string
{
    case GRADES = 'Notas';
    case GRADES2 = 'Notas2';
    case SHORT_TESTS = 'Pruebas-Cortas';
    case DAILY_WORKS = 'Trab-Diarios';
    case DAILY_WORKS2 = 'Trab-Diarios2';
    case NOTEBOOKS_WORKS = 'Trab-Libreta';
    case NOTEBOOKS_WORKS2 = 'Trab-Libreta2';
    case CONDUCT_ATTENDANCE = 'Cond-Asis';
    case FINAL_EXAM = 'Ex-Final';
    case SUMMER_GRADES = 'V-Nota';

    public function table(): string
    {
        return match ($this) {
            self::GRADES => 'padres',
            self::GRADES2 => 'padres7',
            self::SHORT_TESTS => 'padres4',
            self::DAILY_WORKS => 'padres2',
            self::DAILY_WORKS2 => 'padres5',
            self::NOTEBOOKS_WORKS => 'padres3',
            self::NOTEBOOKS_WORKS2 => 'padres6',
            self::CONDUCT_ATTENDANCE => 'padres',
            self::FINAL_EXAM => 'padres',
            self::SUMMER_GRADES => 'padres',
        };
    }

    public function extraColumns(): array
    {
        return match ($this) {
            self::GRADES => [
                __('common.bonus.long'),
                __('common.dailyWork.short'),
                __('common.notebookWork.short'),
                __('common.shortTests.short'),
            ],
            self::SHORT_TESTS,
            self::DAILY_WORKS,
            self::DAILY_WORKS2,
            self::NOTEBOOKS_WORKS,
            self::NOTEBOOKS_WORKS2 => ['Nota 10'],
            self::SUMMER_GRADES => ['Bono', 'T-Diario', 'T-Libreta', 'P-Cor'],
            default => [],
        };
    }

    public function trimesterInfo(TrimesterEnum $trimesterEnum): array
    {
        return match ($this) {
            self::GRADES => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'totalAverage' => 'average1',
                    'grades' => [1, 10],
                    'values' => [
                        'tdia' => 'td1',
                        'tlib' => 'tl1',
                        'pcor' => 'pc1',
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'totalAverage' => 'average2',
                    'grades' => [11, 20],
                    'values' => [
                        'tdia' => 'td2',
                        'tlib' => 'tl2',
                        'pcor' => 'pc2',
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'totalAverage' => 'average3',
                    'grades' => [21, 30],
                    'values' => [
                        'tdia' => 'td3',
                        'tlib' => 'tl3',
                        'pcor' => 'pc3',
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],
                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'totalAverage' => 'average4',
                    'grades' => [31, 40],
                    'values' => [
                        'tdia' => 'td4',
                        'tlib' => 'tl4',
                        'pcor' => 'pc4',
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],
                ],
                default => [],
            },
            self::GRADES2 => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'totalAverage' => 'average1',
                    'grades' => [1, 10],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'totalAverage' => 'average2',
                    'grades' => [11, 20],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'totalAverage' => 'average3',
                    'grades' => [21, 30],
                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'totalAverage' => 'average4',
                    'grades' => [31, 40],
                ],
                default => [],
            },
            self::SHORT_TESTS => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
                default => [],
            },
            self::DAILY_WORKS => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
                default => [],
            },
            self::DAILY_WORKS2 => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
                default => [],
            },
            self::NOTEBOOKS_WORKS => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
                default => [],
            },
            self::NOTEBOOKS_WORKS2 => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 10],
                    'values' => [
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                TrimesterEnum::SECOND_TRIMESTER => [
                    'totalGrade' => 'nota2',
                    'grades' => [11, 20],
                    'values' => [
                        'tpa' => 'tpa2',
                        'tdp' => 'por2',
                    ],
                ],
                TrimesterEnum::THIRD_TRIMESTER => [
                    'totalGrade' => 'nota3',
                    'grades' => [21, 30],
                    'values' => [
                        'tpa' => 'tpa3',
                        'tdp' => 'por3',
                    ],

                ],
                TrimesterEnum::FOURTH_TRIMESTER => [
                    'totalGrade' => 'nota4',
                    'grades' => [31, 40],
                    'values' => [
                        'tpa' => 'tpa4',
                        'tdp' => 'por4',
                    ],

                ],
                default => [],
            },
            self::CONDUCT_ATTENDANCE => match ($trimesterEnum) {
                TrimesterEnum::FIRST_TRIMESTER => ['con1', 'aus1', 'tar1', 'de1'],
                TrimesterEnum::SECOND_TRIMESTER => ['con2', 'aus2', 'tar2', 'de2'],
                TrimesterEnum::THIRD_TRIMESTER => ['con3', 'aus3', 'tar3', 'de3'],
                TrimesterEnum::FOURTH_TRIMESTER => ['con4', 'aus4', 'tar4', 'de4'],
                default => [],
            },
            self::FINAL_EXAM => match ($trimesterEnum) {
                TrimesterEnum::SECOND_TRIMESTER => 'ex1',
                TrimesterEnum::FOURTH_TRIMESTER => 'ex2',
                default => null,
            },
            self::SUMMER_GRADES => match ($trimesterEnum) {
                TrimesterEnum::SUMMER => [
                    'totalGrade' => 'nota1',
                    'grades' => [1, 7],
                    'others' => ['con1', 'aus1', 'tar1'],
                    'values' => [
                        'tdia' => 'td1',
                        'tlib' => 'tl1',
                        'pcor' => 'pc1',
                        'tpa' => 'tpa1',
                        'tdp' => 'por1',
                    ],
                ],
                default => [],
            },
            default => []
        };

    }

    public function totalGradeColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['totalGrade'] ?? null;
    }

    public function totalAverageColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['totalAverage'] ?? null;
    }

    public function valuesColumns(TrimesterEnum $trimesterEnum): ?array
    {
        return $this->trimesterInfo($trimesterEnum)['values'] ?? null;
    }

    public function tdiaColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['values']['tdia'] ?? null;
    }

    public function tlibColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['values']['tlib'] ?? null;
    }

    public function pcorColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['values']['pcor'] ?? null;
    }

    public function tdpColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['values']['tdp'] ?? null;
    }

    public function tpaColumn(TrimesterEnum $trimesterEnum): ?string
    {
        return $this->trimesterInfo($trimesterEnum)['values']['tpa'] ?? null;
    }

    public function gradesRange(TrimesterEnum $trimesterEnum): ?array
    {
        return $this->trimesterInfo($trimesterEnum)['grades'] ?? null;
    }

    public function amountOfGrades(TrimesterEnum $trimesterEnum): int
    {

        return match ($this) {
            self::CONDUCT_ATTENDANCE, self::FINAL_EXAM => 0,
            self::SUMMER_GRADES => 7,
            default => $this->gradesRange($trimesterEnum)[1] - $this->gradesRange($trimesterEnum)[0],
        };
    }

    public function amountOfValues(TrimesterEnum $trimesterEnum): int
    {
        return match ($this) {
            self::FINAL_EXAM => 1,
            default => $this->amountOfGrades($trimesterEnum)
        };
    }
}
