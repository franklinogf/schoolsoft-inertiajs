<?php

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'T_examen_pregunta';

    public $timestamps = false;

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }
}
