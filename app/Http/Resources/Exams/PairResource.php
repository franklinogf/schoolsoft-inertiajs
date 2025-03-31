<?php

declare(strict_types=1);

namespace App\Http\Resources\Exams;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PairResource extends JsonResource
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
            'valor' => $this->valor,
            'respuesta_c' => $this->respuesta_c,
        ];
    }
}
