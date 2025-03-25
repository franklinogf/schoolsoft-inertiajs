<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use Illuminate\Http\Request;

class ExamTopicController extends Controller
{
    public function storeTrueFalse(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta' => ['required', 'in:v,f'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->truesOrFalses()->create($validated);
        $this->updateExamTotal($exam);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Pregunta :action', ['action' => strtolower(__('Creada'))]));
    }

    public function updateTrueFalse(Request $request, Exam $exam, $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta' => ['required', 'in:v,f'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->truesOrFalses()->findOrFail($question)->update($validated);

        $this->updateExamTotal($exam);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Pregunta :action', ['action' => strtolower(__('Actualizada'))]));
    }

    public function destroyTrueFalse(Exam $exam, $question)
    {
        $exam->truesOrFalses()->findOrFail($question)->delete();

        $this->updateExamTotal($exam);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Pregunta :action', ['action' => strtolower(__('Eliminada'))]));
    }

    private function updateExamTotal(Exam $exam)
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
