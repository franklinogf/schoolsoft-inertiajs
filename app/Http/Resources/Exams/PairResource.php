<?php

namespace App\Http\Resources\Exams;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PairResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    #[\Override]
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'examen' => $this->whenLoaded('exam'),
            'pregunta' => $this->pregunta,
            'valor' => $this->valor,
            'respuesta_c' => $this->respuesta_c,
        ];
    }
}
