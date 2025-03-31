<?php

declare(strict_types=1);

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

final class Question extends Model
{
    public $timestamps = false;

    protected $table = 'T_examen_pregunta';

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }
}
