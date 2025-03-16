<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $ss
 * @property string $grado
 * @property string $year
 * @property \Illuminate\Support\Carbon $fecha
 * @property string $p1
 * @property string $p2
 * @property string $p3
 * @property string $p4
 * @property string $p5
 * @property string $p6
 * @property string $codigo
 * @property string $nombre
 * @property string $apellidos
 * @property string $baja
 * @property string $p7
 * @property string $p8
 * @property string $curso
 */ #[ScopedBy(SchoolYear::class)]
class StudentAttendance extends Model
{
    protected $table = 'asispp';

    public $timestamps = false;

    public function scopeWhereDatesBetween(Builder $query, $date1, $date2)
    {
        return $query->whereDate('fecha', '>=', $date1)->whereDate('fecha', '<=', $date2);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'mt', 'mt');
    }
}
