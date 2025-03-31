<?php

declare(strict_types=1);

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

final class PairCode extends Model
{
    public $timestamps = false;

    protected $table = 'T_examen_codigo_parea';

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }

    public function question()
    {
        return $this->belongsTo(Pair::class, 'id', 'respuesta_c');
    }
}
