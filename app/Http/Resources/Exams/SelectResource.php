<?php

declare(strict_types=1);

namespace App\Http\Resources\Exams;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class SelectResource extends JsonResource
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
            'examen' => $this->whenLoaded('exam'),
            'pregunta' => $this->pregunta,
            'correcta' => $this->correcta,
            'valor' => $this->valor,
            'respuestas' => [
                'respuesta1' => $this->respuesta1,
                'respuesta2' => $this->respuesta2,
                'respuesta3' => $this->respuesta3,
                'respuesta4' => $this->respuesta4,
                'respuesta5' => $this->respuesta5,
                'respuesta6' => $this->respuesta6,
                'respuesta7' => $this->respuesta7,
                'respuesta8' => $this->respuesta8,
            ],
        ];
    }
}
