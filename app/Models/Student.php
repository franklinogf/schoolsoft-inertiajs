<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use App\Models\Scopes\Student\Active;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Model;

/**
 * @property string $ss
 * @property string $year
 * @property string $grado
 * @property string $nombre
 * @property string $apellidos
 * @property string $id
 * @property string $genero
 * @property string $rema
 * @property \Illuminate\Support\Carbon $fecha
 * @property string $cta
 * @property string $alias
 * @property string $verano
 * @property string $clase_verano
 * @property string $fechagra
 * @property string $vivecon
 * @property string $activo
 * @property string $beca
 * @property string $desc_men
 * @property string $desc_mat
 * @property string $desc_otro1
 * @property string $desc_otro2
 * @property \Illuminate\Support\Carbon $fecha_baja
 * @property string $mat_retenida
 * @property float $tr1
 * @property float $tr2
 * @property float $se1
 * @property float $tr3
 * @property float $tr4
 * @property float $se2
 * @property float $fin
 * @property string $crs
 * @property string $cn1
 * @property string $cn2
 * @property string $cns1
 * @property string $cn3
 * @property string $cn4
 * @property string $cns2
 * @property string $cnf
 * @property string $cursos
 * @property string $cel
 * @property string $comp
 * @property string $nuref
 * @property string $lugar_nac
 * @property string $imp1
 * @property string $imp2
 * @property string $imp3
 * @property string $imp4
 * @property string $enf1
 * @property string $enf2
 * @property string $enf3
 * @property string $enf4
 * @property string $med1
 * @property string $med2
 * @property string $med3
 * @property string $med4
 * @property string $rec1
 * @property string $rec2
 * @property string $rec3
 * @property string $rec4
 * @property string $medico
 * @property string $tel1
 * @property string $tel2
 * @property string $religion
 * @property string $iglesia
 * @property string $bau
 * @property string $com
 * @property string $con
 * @property \Illuminate\Support\Carbon $fbau
 * @property \Illuminate\Support\Carbon $fcom
 * @property \Illuminate\Support\Carbon $fcon
 * @property string $desc1
 * @property string $desc2
 * @property string $desc3
 * @property string $desc4
 * @property string $nuevo
 * @property \Illuminate\Support\Carbon $fecha_matri
 * @property int $codigobaja
 * @property int $edad
 * @property string $gra2
 * @property string $imagen
 * @property string $tipo
 * @property string $act2
 * @property string $usuario
 * @property string $clave
 * @property int $tipo_foro
 * @property int $mt
 * @property string $email
 * @property string $avatar
 * @property string $padre
 * @property string $nombre_padre
 * @property string $dir1
 * @property string $dir2
 * @property string $pueblo
 * @property string $estado
 * @property string $zip
 * @property string $colpro
 * @property string $cdb1
 * @property string $cdb2
 * @property string $cdb3
 * @property string $pop
 * @property string $celp
 * @property string $emailp
 * @property string $telp
 * @property string $id3
 * @property int $raza
 * @property int $rel
 * @property float $cantidad
 * @property float $cantidad_alerta
 * @property \Illuminate\Support\Carbon $f_deposito
 * @property string $cbarra
 * @property string $avisar
 * @property int $transporte
 * @property string $municipio
 * @property string $acomodo
 * @property string $trajo
 * @property string $emaile
 * @property string $zona
 * @property string $ent
 * @property string $ip
 * @property \Illuminate\Support\Carbon $datem
 * @property string $horam
 * @property float $tmat
 * @property string $matri
 * @property string $her
 * @property string $pago
 * @property string $feg2
 * @property string $feg
 * @property float $cuota
 * @property string $major
 * @property string $e_s
 * @property string $pago_e_s
 * @property string $hora_pago_e_s
 * @property float $pago_mensual
 * @property string $ip2
 * @property string $firma1
 * @property string $firma2
 * @property string $firma3
 * @property string $fecha_pago_e_s
 * @property string $id_ref
 * @property string $ent2
 * @property string $mes
 * @property string $hora1
 * @property string $hora2
 * @property string $hora3
 * @property \Illuminate\Support\Carbon $fecha_e_s
 * @property string $matri2
 * @property string $pago_p_c
 * @property string $ent3
 * @property string $p_c
 * @property int $p_c_trxID
 * @property \Illuminate\Support\Carbon $p_c_fecha
 * @property \Illuminate\Support\Carbon $p_c_hora
 * @property string $re_ma
 * @property string $vera
 * @property string $mv1
 * @property string $mv2
 * @property string $formInternet
 * @property float $pm1
 * @property float $pm2
 * @property float $pm3
 * @property string $pm1_pago
 * @property string $pm2_pago
 * @property string $pm3_pago
 * @property \Illuminate\Support\Carbon $pm1_fecha
 * @property \Illuminate\Support\Carbon $pm2_fecha
 * @property \Illuminate\Support\Carbon $pm3_fecha
 * @property string $pm1_trxID
 * @property string $pm2_trxID
 * @property string $pm3_trxID
 * @property string $pm1_hora
 * @property string $pm2_hora
 * @property string $pm3_hora
 */
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

    protected static function booted(): void
    {
        // //Siempre utilizar el year del colegio
        // static::addGlobalScope('year', function (Builder $builder) {
        //     $builder->where("year.year", Admin::admin()->year);
        // });
        // Siempre buscar los que estan activos
        // static::addGlobalScope('active', function (Builder $builder) {
        //     $builder->where('year.fecha_baja', '0000-00-00');
        // });
        // Siempre ordernar por apellidos
        static::addGlobalScope('orderByLastname', function (Builder $builder) {
            $builder->orderBy('year.apellidos')->orderBy('year.nombre');
        });
    }

    public function scopeOfCourse(Builder $query, string $class, string $table = 'padres', $summer = false): void
    {
        $where = [
            ["{$table}.curso", $class],
            ["{$table}.baja", ''],
            ["{$table}.year", app('year')],
            ["{$this->table}.year", app('year')],
        ];

        if ($summer) {
            $where[] = ["{$table}.verano", '2'];
        }
        $query->addSelect("{$this->table}.*")
            ->join($table, "{$this->table}.ss", '=', "{$table}.ss")
            ->where($where);
    }

    public function scopeOfGrade(Builder $query, string $grade): void
    {
        $query->where('grado', $grade);
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

    public function sentMessages(): MorphMany
    {
        return $this->morphMany(Inbox::class, 'sender');
    }

    public function receivedMessages(): MorphToMany
    {
        return $this->morphToMany(Inbox::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }
}
