<?php

namespace App\Http\Controllers\Regiweb;

use App\Http\Controllers\Controller;

class RegiwebOptionsIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $options = [
            [
                'title' => 'Mensajes',
                'items' => [
                    [
                        'label' => 'Correo electrónico',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'SMS',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Mensajes',
                        'route' => route('regiweb.options.index'),
                    ],
                ],
            ],
            [
                'title' => 'Informes',
                'items' => [
                    [
                        'label' => 'Informe de cambios de notas',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Listado de 100',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Lista de promedios',
                        'route' => route('regiweb.options.index'),
                    ],
                ],
            ],
            [
                'title' => 'Otros',
                'items' => [
                    [
                        'label' => 'Generador de exámenes',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Crear tareas',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Documentos',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Notas por examen',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Curva de notas',
                        'route' => route('regiweb.options.index'),
                    ],
                    [
                        'label' => 'Clasificación de notas',
                        'route' => route('regiweb.options.index'),
                    ],
                ],
            ],
        ];

        return inertia('Regiweb/Options/Index', compact('options'));
    }
}
