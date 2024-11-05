<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Enums\FlashMessageKey;
use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentGradeResource;
use App\Models\Admin;
use App\Models\StudentGrade;
use App\Models\Teacher;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RegiwebNotesController extends Controller
{
    private Admin $admin;
    public function __construct(
        #[CurrentUser()] protected Teacher $user

    ) {
        $user->load('courses');
        $this->admin = Admin::primary();
    }
    public function index()
    {
        return Inertia::render('Regiweb/Notes/Index');
    }

    // public function submit(Request $request)
    // {
    //     $validated = $request->validate([
    //         'course' => [
    //             'required',
    //             'string',
    //             Rule::in($this->getCoursesArray()),
    //         ],
    //         'page' => [
    //             'required',
    //             'string',
    //             Rule::enum(PagesEnum::class),
    //         ],
    //         'trimester' => [
    //             'required',
    //             'string',
    //             Rule::enum(TrimesterEnum::class),

    //         ],
    //     ]);

    //     return to_route('regiweb.notes.show', $validated);
    // }


    public function show(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'course' => [
                'required',
                'string',
                Rule::in($this->getCoursesArray()),
            ],
            'page' => [
                'required',
                'string',
                Rule::enum(PagesEnum::class),
            ],
            'trimester' => [
                'required',
                'string',
                Rule::enum(TrimesterEnum::class),

            ],
        ]);
        if ($validator->fails()) {
            return redirect()->route('regiweb.notes.index')->with(FlashMessageKey::ERROR_LIST->value, $validator->errors());
        }
        $validated = $validator->validated();
        $trimester = $validated['trimester'];
        $course = $validated['course'];
        $page = $validated['page'];



        $_schoolInfo = [
            'Trimestre-1' => [
                'number' => 1,
                'dates' => ['ft1', 'ft2'],
                'end' => 'sie1'
            ],
            'Trimestre-2' => [
                'number' => 2,
                'dates' => ['ft3', 'ft4'],
                'end' => 'sie2'
            ],
            'Trimestre-3' => [
                'number' => 3,
                'dates' => ['ft5', 'ft6'],
                'end' => 'sie3'
            ],
            'Trimestre-4' => [
                'number' => 4,
                'dates' => ['ft7', 'ft8'],
                'end' => 'sie4'
            ],
            'Verano' => [
                'number' => 5,
                'dates' => ['fechav1', 'fechav2']
            ]
        ];

        $dates = $_schoolInfo[$trimester]['dates'];
        $end = $_schoolInfo[$trimester]['end'];
        $trimesterNumber = $_schoolInfo[$trimester]['number'];
        $initialDate = $this->admin->{$dates[0]};
        $finalDate = $this->admin->{$dates[1]};

        $gradeInfo = StudentGrade::where([
            ['curso', $course],
            ['year', $this->admin->getYear],
        ])->first();

        $isLetter = !$gradeInfo ? false : $gradeInfo->letra === "ON";
        $isPercent = $gradeInfo && $gradeInfo->nota_por === "1";
        $canEnd = $this->admin->sie === "Si" && intval($this->admin->sieab) === 4;
        $hasEnded = $gradeInfo && $gradeInfo->{$end} === "X";
        $isCppd = $this->admin->cppd === 'Si';
        $isSumTrimester = $this->admin->sutri === YesNoEnum::NO;
        if ($isCppd) {
            $_info = [
                "Notas" => [
                    'table' => 'padres',
                    'title' => 'Notas',
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 12],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [13, 24],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [25, 36],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]
                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [37, 48],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]
                    ]
                ],
                "V-Nota" => [
                    'table' => 'padres',
                    'title' => 'Notas de verano',
                    'Verano' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 7],
                        'others' => ['con1', 'aus1', 'tar1'],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ]
                ]
            ];
        } else {
            // if (__ONLY_CBTM__) {
            //     $columns = [
            //         'es' => ['Bono', 'Promedio', 'T-Diario', 'T-Libreta', 'P-Cor'],
            //         'en' => ['Bonus', 'Average', 'DW', 'HW', 'Quiz'],
            //         'text' => [false, '60%', '10%', '10%', '20%']
            //     ];
            // } else {
            $columnsArray = ['Bono', 'T-Diario', 'T-Libreta', 'P-Cor'];
            // }

            $_info = [
                "Notas" => [
                    'table' => 'padres',
                    'title' => 'Notas',
                    'columns' => $columnsArray,
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'totalAverage' => 'average1',
                        'grades' => [1, 10],
                        'values' => [
                            'tdia' => 'td1',
                            'tlib' => 'tl1',
                            'pcor' => 'pc1',
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'totalAverage' => 'average2',
                        'grades' => [11, 20],
                        'values' => [
                            'tdia' => 'td2',
                            'tlib' => 'tl2',
                            'pcor' => 'pc2',
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'totalAverage' => 'average3',
                        'grades' => [21, 30],
                        'values' => [
                            'tdia' => 'td3',
                            'tlib' => 'tl3',
                            'pcor' => 'pc3',
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]
                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'totalAverage' => 'average4',
                        'grades' => [31, 40],
                        'values' => [
                            'tdia' => 'td4',
                            'tlib' => 'tl4',
                            'pcor' => 'pc4',
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]
                    ]
                ],
                "Notas2" => [
                    'table' => 'padres7',
                    'title' => 'Notas 2',
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'totalAverage' => 'average1',
                        'grades' => [1, 10],
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'totalAverage' => 'average2',
                        'grades' => [11, 20],
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'totalAverage' => 'average3',
                        'grades' => [21, 30],
                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'totalAverage' => 'average4',
                        'grades' => [31, 40],
                    ]
                ],
                "Pruebas-Cortas" => [
                    'table' => 'padres4',
                    'title' => 'Pruebas Cortas',
                    'columns' => ['Nota 10'],
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 10],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [11, 20],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [21, 30],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]

                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [31, 40],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]

                    ]
                ],
                "Trab-Diarios" => [
                    'table' => 'padres2',
                    'title' => 'Trabajos Diarios',
                    'columns' => ['Nota 10'],
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 10],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [11, 20],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [21, 30],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]

                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [31, 40],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]

                    ]
                ],
                "Trab-Diarios2" => [
                    'table' => 'padres5',
                    'title' => 'Trabajos Diarios 2',
                    'columns' => ['Nota 10'],
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 10],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [11, 20],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [21, 30],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]

                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [31, 40],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]

                    ]
                ],
                "Trab-Libreta" => [
                    'table' => 'padres3',
                    'title' => 'Trabajos de libreta',
                    'columns' => ['Nota 10'],
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 10],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [11, 20],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [21, 30],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]

                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [31, 40],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]

                    ]
                ],
                "Trab-Libreta2" => [
                    'table' => 'padres6',
                    'title' => 'Trabajos de libreta 2',
                    'columns' => ['Nota 10'],
                    'Trimestre-1' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 10],
                        'values' => [
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ],
                    'Trimestre-2' => [
                        'totalGrade' => 'nota2',
                        'grades' => [11, 20],
                        'values' => [
                            'tpa' => 'tpa2',
                            'tdp' => 'por2'
                        ]
                    ],
                    'Trimestre-3' => [
                        'totalGrade' => 'nota3',
                        'grades' => [21, 30],
                        'values' => [
                            'tpa' => 'tpa3',
                            'tdp' => 'por3'
                        ]

                    ],
                    'Trimestre-4' => [
                        'totalGrade' => 'nota4',
                        'grades' => [31, 40],
                        'values' => [
                            'tpa' => 'tpa4',
                            'tdp' => 'por4'
                        ]

                    ]
                ],
                "Cond-Asis" => [
                    'table' => 'padres',
                    'title' => 'Conducta y Asistencia',
                    'Trimestre-1' => ['con1', 'aus1', 'tar1', 'de1'],
                    'Trimestre-2' => ['con2', 'aus2', 'tar2', 'de2'],
                    'Trimestre-3' => ['con3', 'aus3', 'tar3', 'de3'],
                    'Trimestre-4' => ['con4', 'aus4', 'tar4', 'de4']
                ],
                "Ex-Final" => [
                    'table' => 'padres',
                    'title' => 'Examen Final',
                    'Trimestre-2' => 'ex1',
                    'Trimestre-4' => 'ex2'
                ],
                "V-Nota" => [
                    'table' => 'padres',
                    'title' => 'Notas de verano',
                    'columns' => ['Bono', 'T-Diario', 'T-Libreta', 'P-Cor'],
                    'Verano' => [
                        'totalGrade' => 'nota1',
                        'grades' => [1, 7],
                        'others' => ['con1', 'aus1', 'tar1'],
                        'values' => [
                            'tdia' => 'td1',
                            'tlib' => 'tl1',
                            'pcor' => 'pc1',
                            'tpa' => 'tpa1',
                            'tdp' => 'por1'
                        ]
                    ]
                ]
            ];
        }

        $_options = $_info[$page][$trimester];
        $values = $_options['values'];
        $columns = $_info[$page]['columns'] ?? null;
        $thisReport = $_info[$page];
        $amountOfGrades = $page === PagesEnum::SUMMER_GRADES ? 7 : ($_options['grades'][1]) - ($_options['grades'][0]);
        $gradesNumbers = $thisReport[$trimester]['grades'];


        $students = StudentGrade::fromTable($thisReport['table'])
            ->where([
                ['curso', $course],
                ['year', $this->admin->getYear],
            ])->when($page === PagesEnum::SUMMER_GRADES, function ($query) {
                $query->where('verano', 2);
            })->orderBy('apellidos')
            ->get();
        $amountOfValues = $page === PagesEnum::FINAL_EXAM ? 1 : $amountOfGrades;

        [$gradesValues, $gradesValuesId] = $this->getGradesValues($course, $trimester, $page, $amountOfValues);

        return Inertia::render('Regiweb/Notes/Show', [
            'course' => $course,
            'page' => $page,
            'trimester' => $trimester,
            'students' => StudentGradeResource::collection($students),
            'initialDate' => $initialDate,
            'finalDate' => $finalDate,
            'isLetter' => $isLetter,
            'isPercent' => $isPercent,
            'canEnd' => $canEnd,
            'hasEnded' => $hasEnded,
            'trimesterNumber' => $trimesterNumber,
            'isSumTrimester' => $isSumTrimester,
            'gradesValues' => $gradesValues,
            'gradesValuesId' => $gradesValuesId,
            'columns' => $columns,
            'amountOfGrades' => $amountOfGrades,
            'gradesNumbers' => $gradesNumbers,
        ]);
    }
    private function getCoursesArray(): array
    {
        $coursesArray = $this->user->courses()->pluck('curso')->toArray();
        return $coursesArray;
    }

    public function saveValues(Request $request, int $id)
    {
        $valuesValidation = [];
        for ($i = 1; $i <= 12; $i++) {
            $valuesValidation["tema$i"] = ['nullable', "required_with:val{$i},fec{$i}", 'string'];
            $valuesValidation["val$i"] = ['nullable', "required_with:tema{$i},fec{$i}", 'numeric'];
            $valuesValidation["fec$i"] = ['nullable', "required_with:tema{$i},val{$i}", 'date'];
        }
        $validated = $request->validate([
            ...$valuesValidation
        ]);


        DB::table('valores')->where('id', $id)->update($validated);

    }

    private function getGradesValues($course, $trimester, $page, $amountOfValues)
    {
        $gradesValuesData = DB::table('valores')->where([
            ['curso', $course],
            ['year', $this->admin->getYear],
            ['trimestre', $trimester],
            ['nivel', $page],
        ])->first();
        if (!$gradesValuesData) {
            $id = DB::table('valores')->insertGetId([
                'curso' => $course,
                'year' => $this->admin->getYear,
                'trimestre' => $trimester,
                'nivel' => $page,
            ]);
            $gradesValuesData = DB::table('valores')->where('id', $id)->first();
        }
        $gradesValuesId = $gradesValuesData->id;
        $gradesValues = [];
        for ($i = 1; $i <= $amountOfValues; $i++) {
            $gradesValues["tema$i"] = $gradesValuesData->{"tema$i"} ?? '';
            $gradesValues["val$i"] = $gradesValuesData->{"val$i"} ?? '';
            $gradesValues["fec$i"] = $gradesValuesData->{"fec$i"} === '0000-00-00' ? '' : ($gradesValuesData->{"fec$i"} ?? '');
        }
        return [$gradesValues, $gradesValuesId];
    }
}
