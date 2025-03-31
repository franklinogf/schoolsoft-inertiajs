<?php

declare(strict_types=1);

namespace App\Models\Exams;

use Illuminate\Database\Eloquent\Model;

final class Select extends Model
{
    public $timestamps = false;

    protected $table = 'T_examen_selec';

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'id_examen');
    }
}
