<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use App\Models\Scopes\Student\Active;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Model;

#[ScopedBy([Active::class, SchoolYear::class])]
class Student extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $table = 'year';

    protected $hidden = [
        'clave',
    ];

    protected $primaryKey = 'mt';

    protected $guarded = [];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        // //Siempre utilizar el year del colegio
        // static::addGlobalScope('year', function (Builder $builder) {
        //     $builder->where("year.year", Admin::admin()->year);
        // });
        //Siempre buscar los que estan activos
        // static::addGlobalScope('active', function (Builder $builder) {
        //     $builder->where('year.fecha_baja', '0000-00-00');
        // });
        // //Siempre ordernar por apellidos
        // static::addGlobalScope('surnameDesc', function (Builder $builder) {
        //     $builder->orderBy('year.apellidos');
        // });
    }

    // public function scopeOfGrade(Builder $query, string $grade): void
    // {
    //     $query->where('grado', $grade);
    // }

    public function scopeOfCourse(Builder $query, string $class, string $table = 'padres', $summer = false): void
    {
        $where = [
            ["$table.curso", $class],
            ["$table.baja", ''],
        ];
        if ($summer) {
            $where[] = ["$table.verano", '2'];
        }
        $query->addSelect("{$this->table}.*")->join($table, "{$this->table}.ss", '=', "$table.ss")->where($where);
    }

    public function grade(): BelongsTo
    {
        return $this->belongsTo(StudentGrade::class, 'ss', 'ss');
    }

    public function grades(): HasMany
    {
        return $this->hasMany(StudentGrade::class, 'ss', 'ss');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'grado', 'grado');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(StudentAttendance::class, 'ss', 'ss');
    }
}
