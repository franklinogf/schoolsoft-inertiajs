<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string $id
 * @property string $curso
 * @property string $year
 * @property string $desc1
 * @property string $desc2
 * @property float $credito
 * @property float $peso
 * @property string $entrada
 * @property string $salida
 * @property string $dias
 * @property string $maestro
 * @property float $matri
 * @property float $total
 * @property string $ava
 * @property float $valor
 * @property string $orden
 * @property string $verano
 * @property int $mt
 */ #[ScopedBy(SchoolYear::class)]
final class Course extends Model
{
    public $timestamps = false;

    protected $table = 'cursos';

    protected $primaryKey = 'mt';

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class, 'id', 'id');
    }

    protected function descripcion(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => app()->getLocale() === 'es'
            ? $attributes['desc1']
            : ($attributes['desc2'] === '' ? $attributes['desc1'] : $attributes['desc2']),
        );
    }
}
