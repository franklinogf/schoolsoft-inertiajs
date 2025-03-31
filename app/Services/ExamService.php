<?php

namespace App\Services;

use App\Enums\YesNoEnum;
use App\Models\Exams\Exam;

class ExamService
{
    public function updateTotal(Exam $exam): int
    {
        $relations = ['truesOrFalses', 'questions', 'selects', 'pairs', 'blankLines'];
        $exam->load($relations);

        $sum = collect($relations)
            ->map(fn ($relation) => $exam->{$relation}->sum('valor'))
            ->sum();

        $exam->update([
            'valor' => $sum,
        ]);

        return $sum;
    }

    public function toggleVisibility(Exam $exam): Exam
    {
        $exam->update([
            'activo' => $exam->activo === YesNoEnum::YES->value ? YesNoEnum::NO->value : YesNoEnum::YES->value,
        ]);

        return $exam;
    }

    public function duplicate(Exam $exam, string $title, string $course): Exam
    {

        $newExam = $exam->replicate()->fill(
            [
                'titulo' => $title,
                'curso' => $course,
                'activo' => YesNoEnum::NO->value,
            ]);

        $newExam->save();

        $exam->questions->each(function ($question) use ($newExam): void {
            $newExam->questions()->save($question->replicate());
        });
        $exam->truesOrFalses->each(function ($question) use ($newExam): void {
            $newExam->truesOrFalses()->save($question->replicate());
        });
        $exam->selects->each(function ($question) use ($newExam): void {
            $newExam->selects()->save($question->replicate());
        });
        $exam->pairs->each(function ($question) use ($newExam): void {
            $newExam->pairs()->save($question->replicate());
        });
        $exam->pairsCodes->each(function ($question) use ($newExam): void {
            $newExam->pairsCodes()->save($question->replicate());
        });
        $exam->blankLines->each(function ($question) use ($newExam): void {
            $newExam->blankLines()->save($question->replicate());
        });

        return $newExam;
    }
}
