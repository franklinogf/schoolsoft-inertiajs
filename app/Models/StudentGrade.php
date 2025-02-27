<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([SchoolYear::class])]
class StudentGrade extends Model
{
    public $timestamps = false;

    protected $table = 'padres';

    protected $hidden = [
        'clave',
    ];

    protected $primaryKey = 'id2';

    protected $guarded = [];

    public function scopeFromTable(Builder $builder, string $tableName): void
    {
        $builder->from($tableName);
        $this->table = $tableName;
    }

    public function scopeOfTeacher(Builder $builder, string $teacherId): void
    {
        $builder->where('id', $teacherId);
    }

    public static function studentsDataTable(array|string|null $ss = null)
    {
        return self::ofTeacher(auth()->id())
            ->select('ss', 'nombre', 'apellidos')
            ->groupBy('ss', 'nombre', 'apellidos')
            ->when($ss !== null, function ($query) use ($ss) {
                if (is_string($ss)) {
                    $ss = [$ss];
                }

                return $query->whereIn('ss', $ss);
            })
            ->orderBy('apellidos')
            ->get();
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'ss', 'ss');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'id', 'id');
    }
}
