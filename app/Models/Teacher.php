<?php

namespace App\Models;

use App\Casts\Date;
use App\Casts\Gender;
use App\Casts\NullToEmptyString;
use App\Casts\ProfilePicture;
use App\Casts\YesNo;
use App\Enums\MediaCollectionEnum;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $id
 * @property string $nombre
 * @property string $apellidos
 * @property string $ss
 * @property string $tel_res
 * @property string $tel_emer
 * @property string $cel
 * @property string $posicion
 * @property string $genero
 * @property \Illuminate\Support\Carbon $fecha_nac
 * @property \Illuminate\Support\Carbon $fecha_ini
 * @property \Illuminate\Support\Carbon $fecha_daja
 * @property string $nivel
 * @property string $preparacion1
 * @property string $preparacion2
 * @property string $grado
 * @property string $email1
 * @property string $email2
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
 * @property string $club1
 * @property string $club2
 * @property string $club3
 * @property string $club4
 * @property string $club5
 * @property string $usuario
 * @property string $clave
 * @property string $tipo
 * @property string $foto
 * @property string $grupo
 * @property string $activo
 * @property string $idioma
 * @property \Illuminate\Support\Carbon $ufecha
 * @property string $re_e
 * @property string $year
 * @property string $cel_com
 * @property string $alias
 * @property string $baja
 * @property string $pre1
 * @property string $pre2
 * @property string $pre3
 * @property string $pre4
 * @property string $pre5
 * @property string $vi1
 * @property string $vi2
 * @property string $vi3
 * @property string $vi4
 * @property string $vi5
 * @property string $se1
 * @property string $se2
 * @property string $se3
 * @property string $se4
 * @property string $se5
 * @property string $comp
 * @property string $lic1
 * @property string $lic2
 * @property string $lic3
 * @property string $lic4
 * @property string $lp1
 * @property string $lp2
 * @property string $lp3
 * @property string $lp4
 * @property \Illuminate\Support\Carbon $fex1
 * @property \Illuminate\Support\Carbon $fex2
 * @property \Illuminate\Support\Carbon $fex3
 * @property \Illuminate\Support\Carbon $fex4
 * @property string $pe1
 * @property string $pe2
 * @property string $pe3
 * @property string $pe4
 * @property string $pe5
 * @property string $pe6
 * @property string $pe7
 * @property string $pe8
 * @property int $dep
 * @property string $dep_des
 * @property string $docente
 * @property string $foto_name
 * @property string $email_smtp
 * @property string $clave_email
 * @property string $host_smtp
 * @property int $port
 * @property string $host
 * @property int $tipo_foro
 * @property string $avatar
 * @property bool $fechas
 * @property bool $tri
 * @property string $pe9
 * @property string $pe10
 * @property string $pe11
 * @property string $pe12
 * @property string $pe13
 * @property string $pe14
 * @property string $pe15
 * @property string $pe16
 * @property string $cbarra
 */
class Teacher extends Model implements HasMedia
{
    use InteractsWithMedia;

    public $timestamps = false;

    protected $table = 'profesor';

    protected $hidden = [
        'clave',
    ];

    protected $guarded = [];

    public function inboxes(): MorphMany
    {
        return $this->morphMany(Inbox::class, 'sender');
    }

    public function receivedMessages(): MorphToMany
    {
        return $this->morphToMany(Inbox::class, 'receiver', 'inboxebles')
            ->withPivot('is_read', 'is_deleted');
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'grado', 'grado');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'id', 'id');
    }

    protected function casts(): array
    {
        $nullToEmptyStringColumns = [
            'tel_res',
            'tel_emer',
            'email2',
            'preparacion1',
            'preparacion2',
            'pueblo2',
            'dir2',
            'dir3',
            'dir4',
            'esta2',
            'zip2',
            'alias',
            'pe1',
            'pe2',
            'pe3',
            'pe4',
            'pe5',
            'pe6',
            'pe7',
            'pe8',
            'pe9',
            'pe10',
            'pe11',
            'pe12',
            'pe13',
            'pe14',
            'pe15',
            'pe16',
        ];
        $datesColumns = [
            'fecha_daja',
            'fecha_nac',
            'fecha_ini',
            'fex1',
            'fex2',
            'fex3',
            'fex4',
        ];
        $array = [
            'genero' => Gender::class,
            'foto_name' => ProfilePicture::class,
            'lp1' => YesNo::class,
            'lp2' => YesNo::class,
            'lp3' => YesNo::class,
            'lp4' => YesNo::class,
        ];
        foreach ($datesColumns as $column) {
            $array[$column] = Date::class;
        }
        foreach ($nullToEmptyStringColumns as $column) {
            $array[$column] = NullToEmptyString::class;
        }

        return $array;
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(MediaCollectionEnum::PROFILE_PICTURE->value)
            ->useFallbackUrl(asset('assets/no-picture-teacher.png'))
            ->useFallbackPath(public_path('assets/no-picture-teacher.png'))
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
            ->singleFile();
    }
}
