<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy(SchoolYear::class)]
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
