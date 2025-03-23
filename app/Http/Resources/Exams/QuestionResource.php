<?php

namespace App\Http\Resources\Exams;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'lineas' => $this->lineas,
            'valor' => $this->valor,
        ];
    }
}
