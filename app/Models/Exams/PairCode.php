<?php

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

class PairCode extends Model
{
    protected $table = 'T_examen_codigo_parea';

    public $timestamps = false;

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }
}
