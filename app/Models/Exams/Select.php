<?php

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

class Select extends Model
{
    protected $table = 'T_examen_selec';

    public $timestamps = false;

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }
}
