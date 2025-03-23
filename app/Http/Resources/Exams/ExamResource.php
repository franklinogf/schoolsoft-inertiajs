<?php

namespace App\Http\Resources\Exams;

use App\Http\Resources\Teacher\TeacherResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'profesor' => TeacherResource::make($this->teacher),
            'titulo' => $this->titulo,
            'curso' => $this->curso,
            'valor' => $this->valor,
            'valor2' => $this->valor2,
            'ver_nota' => $this->ver_nota,
            'fecha' => $this->fecha,
            'hora' => $this->hora,
            'hora_final' => $this->hora_final,
            'activo' => $this->activo,
            'tiempo' => $this->tiempo,
            'temas' => [
                'verdadero_falso' => [
                    'titulo' => $this->desc1 === 'si' ? $this->desc1_1 : 'Preguntas verdadero o falso',
                    'preguntas' => TrueOrFalseResource::collection($this->truesOrFalses),
                ],
                'selecciona' => [
                    'titulo' => $this->desc2 === 'si' ? $this->desc2_1 : 'Preguntas de selección',
                    'preguntas' => SelectResource::collection($this->selects),
                ],
                'preguntas' => [
                    'titulo' => $this->desc3 === 'si' ? $this->desc3_1 : 'Preguntas de desarrollo',
                    'preguntas' => QuestionResource::collection($this->questions),
                ],
                'lineas_blanco' => [
                    'titulo' => $this->desc4 === 'si' ? $this->desc4_1 : 'Preguntas de completar',
                    'preguntas' => BlankLineResource::collection($this->blankLines),
                ],
                'parea' => [
                    'titulo' => $this->desc5 === 'si' ? $this->desc5_1 : 'Preguntas de parear',
                    'respuestas' => PairCodeResource::collection($this->pairsCodes),
                    'preguntas' => PairResource::collection($this->pairs),
                ],
            ],
        ];
    }
}
