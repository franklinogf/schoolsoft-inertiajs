<?php

namespace App\Http\Resources\Exams;

use App\Enums\YesNoEnum;
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
                    'titulo' => $this->desc1 === YesNoEnum::YES->value ? $this->desc1_1 : 'Verdadero o falso',
                    'preguntas' => TrueOrFalseResource::collection($this->truesOrFalses),
                ],
                'selecciona' => [
                    'titulo' => $this->desc2 === YesNoEnum::YES->value ? $this->desc2_1 : 'Selecciona la respuesta correcta',
                    'preguntas' => SelectResource::collection($this->selects),
                ],
                'parea' => [
                    'titulo' => $this->desc3 === YesNoEnum::YES->value ? $this->desc3_1 : 'Parea la respuesta correcta',
                    'respuestas' => PairCodeResource::collection($this->pairsCodes),
                    'preguntas' => PairResource::collection($this->pairs),
                ],
                'lineas_blanco' => [
                    'titulo' => $this->desc4 === YesNoEnum::YES->value ? $this->desc4_1 : 'Completa las lineas en blanco',
                    'preguntas' => BlankLineResource::collection($this->blankLines),
                ],
                'preguntas' => [
                    'titulo' => $this->desc5 === YesNoEnum::YES->value ? $this->desc5_1 : 'Responde las preguntas correctamente',
                    'preguntas' => QuestionResource::collection($this->questions),
                ],
            ],
        ];
    }
}
