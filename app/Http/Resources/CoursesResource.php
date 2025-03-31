<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class CoursesResource extends JsonResource
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
            'curso' => $this->curso,
            'year' => $this->year,
            'descripcion' => $this->descripcion,
            'credito' => $this->credito,
            'peso' => $this->peso,
            'entrada' => $this->entrada,
            'salida' => $this->salida,
            'dias' => $this->dias,
            'maestro' => $this->maestro,
            'matri' => $this->matri,
            'total' => $this->total,
            'ava' => $this->ava,
            'valor' => $this->valor,
            'orden' => $this->orden,
            'verano' => $this->verano,
            'mt' => $this->mt,
        ];
    }
}
