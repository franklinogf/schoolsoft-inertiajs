<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Model;

/**
 * @property string $colegio
 * @property string $dir1
 * @property string $dir2
 * @property string $pueblo1
 * @property string $esta1
 * @property string $zip1
 * @property string $dir3
 * @property string $dir4
 * @property string $pueblo2
 * @property string $esta2
 * @property string $zip2
 * @property string $correo
 * @property string $telefono
 * @property string $fax
 * @property string $logo
 * @property string $foto
 * @property string $director
 * @property string $usuario
 * @property string $clave
 * @property string $principal
 * @property string $pagina
 * @property string $idioma
 * @property string $filename
 * @property string $filename2
 * @property string $filesize
 * @property string $filesize2
 * @property string $filetype
 * @property string $filetype2
 * @property string $description
 * @property \Illuminate\Support\Carbon $ft1
 * @property \Illuminate\Support\Carbon $ft2
 * @property \Illuminate\Support\Carbon $ft3
 * @property \Illuminate\Support\Carbon $ft4
 * @property \Illuminate\Support\Carbon $ft5
 * @property \Illuminate\Support\Carbon $ft6
 * @property \Illuminate\Support\Carbon $ft7
 * @property \Illuminate\Support\Carbon $ft8
 * @property string $men_ini
 * @property string $men_nota
 * @property string $grupo
 * @property string $activo
 * @property \Illuminate\Support\Carbon $ufecha
 * @property string $id
 * @property string $year
 * @property string $Colegio2
 * @property string $dir5
 * @property string $dir6
 * @property string $pueblo3
 * @property string $est3
 * @property string $zip3
 * @property string $tel3
 * @property string $tel4
 * @property string $pag_ini2
 * @property string $fax2
 * @property string $email3
 * @property string $email4
 * @property string $a
 * @property string $b
 * @property string $c
 * @property string $d
 * @property string $f
 * @property string $sutri
 * @property string $vala
 * @property string $valb
 * @property string $valc
 * @property string $vald
 * @property string $valf
 * @property string $sie
 * @property string $sieab
 * @property string $asist
 * @property string $asis
 * @property string $curso
 * @property string $por1
 * @property string $por2
 * @property string $por3
 * @property string $cv
 * @property string $np
 * @property string $teg
 * @property string $tr1
 * @property string $tr2
 * @property string $tr3
 * @property string $tr4
 * @property string $vt1
 * @property string $vt2
 * @property string $vt3
 * @property string $vt4
 * @property string $email5
 * @property string $cm
 * @property string $tpa
 * @property string $nin
 * @property string $tarjeta
 * @property string $forzar
 * @property string $clavepadre
 * @property string $nivel
 * @property \Illuminate\Support\Carbon $fechav1
 * @property \Illuminate\Support\Carbon $fechav2
 * @property string $nota
 * @property string $prom
 * @property string $cant
 * @property string $sem
 * @property string $nota2
 * @property string $prom2
 * @property string $cant2
 * @property string $sem2
 * @property string $nota3
 * @property string $prom3
 * @property string $cant3
 * @property string $sem3
 * @property string $bo1
 * @property string $bo2
 * @property string $bo3
 * @property string $bo4
 * @property string $mensa
 * @property string $tar
 * @property string $men_inac
 * @property string $inactivo
 * @property string $year2
 * @property string $vs1
 * @property string $vs2
 * @property string $vf
 * @property string $ns1
 * @property string $ns2
 * @property string $nf
 * @property string $bloqueo
 * @property string $codigo
 * @property string $bloqueoauto
 * @property string $des1
 * @property string $des2
 * @property string $des3
 * @property string $controlb
 * @property string $param1
 * @property string $param2
 * @property string $param3
 * @property string $param4
 * @property string $param5
 * @property string $param6
 * @property float $esn
 * @property string $esncodigo
 * @property string $esnmes
 * @property string $act_paypal
 * @property string $email_paypal
 * @property float $costo
 * @property int $caja
 * @property string $rec
 * @property \Illuminate\Support\Carbon $asis1
 * @property \Illuminate\Support\Carbon $asis2
 * @property \Illuminate\Support\Carbon $asis3
 * @property \Illuminate\Support\Carbon $asis4
 * @property \Illuminate\Support\Carbon $asis5
 * @property \Illuminate\Support\Carbon $asis6
 * @property \Illuminate\Support\Carbon $asis7
 * @property \Illuminate\Support\Carbon $asis8
 * @property string $clave_email
 * @property string $host_smtp
 * @property int $port
 * @property string $email_smtp
 * @property string $host
 * @property int $tri
 * @property \Illuminate\Support\Carbon $fec_t
 * @property string $se1
 * @property string $se2
 * @property string $fin
 * @property string $paypalcodigo
 * @property string $enf
 * @property string $nmf
 * @property int $dia_vence
 * @property string $etd
 * @property string $npn
 * @property string $cppd
 * @property string $codc1
 * @property float $codc2
 * @property string $suantri
 * @property string $nel
 * @property string $chk
 * @property string $not1
 * @property string $not2
 * @property int $fra
 * @property string $vnf
 * @property string $hdp
 * @property int $hdt
 * @property string $token_whatsapp
 * @property string $cel_whatsapp
 * @property string $rema_msg
 * @property float $can_min
 * @property string $ip7
 * @property string $fecha7
 * @property string $hora7
 * @property string $environments
 * @property string $constants
 * @property string $esac
 * @property string $camisas
 * @property string $cena
 * @property string $actinf
 * @property string $actmat
 * @property string $actmen
 * @property string $actfotos
 * @property int $es1
 * @property int $es2
 * @property int $es3
 * @property int $es4
 * @property int $es5
 * @property int $es6
 * @property int $es7
 * @property int $es8
 * @property int $es9
 * @property string $cta_camisa
 * @property string $es_ac
 */
final class Admin extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $table = 'colegio';

    protected $hidden = [
        'clave',
    ];

    protected $guarded = [];

    public function sentMessages(): MorphMany
    {
        return $this->morphMany(Inbox::class, 'sender');
    }

    public function receivedMessages(): MorphToMany
    {
        return $this->morphToMany(Inbox::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }

    public function scopeGetPrimaryAdmin(Builder $query)
    {
        return $query->where('usuario', 'administrador');
    }
}
