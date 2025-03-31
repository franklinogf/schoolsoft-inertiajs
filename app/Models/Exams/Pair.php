<?php

declare(strict_types=1);

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

final class Pair extends Model
{
    public $timestamps = false;

    protected $table = 'T_examen_parea';

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }

    public function answer()
    {
        return $this->hasOne(PairCode::class, 'id', 'respuesta_c');
    }
}
