<?php

namespace App\Services;

use App\Models\Exams\Exam;

class ExamService
{
    public static function updateExamTotal(Exam $exam)
    {
        $relations = ['truesOrFalses', 'questions', 'selects', 'pairs', 'blankLines'];
        $exam->load($relations);

        $sum = collect($relations)
            ->map(fn ($relation) => $exam->$relation->sum('valor'))
            ->sum();

        $exam->update([
            'valor' => $sum,
        ]);
    }
}
