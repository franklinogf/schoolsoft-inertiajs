<?php

declare(strict_types=1);

namespace App\Http\Resources\Exams;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Override;

final class BlankLineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    #[Override]
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'examen' => $this->whenLoaded('exam'),
            'pregunta' => $this->pregunta,
            'valor' => $this->valor,
            'respuestas' => [
                'respuesta1' => $this->respuesta1,
                'respuesta2' => $this->respuesta2,
                'respuesta3' => $this->respuesta3,
                'respuesta4' => $this->respuesta4,
                'respuesta5' => $this->respuesta5,
            ],
        ];
    }
}
