<?php

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Services\ExamService;
use Illuminate\Http\Request;

class BlankLineTopicController extends Controller
{
    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuestas' => ['required', 'array', 'min:5', 'max:5'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer) => $answer ?? '')
            ->toArray();

        $exam->blankLines()->create([
            'pregunta' => $validated['pregunta'],
            'valor' => $validated['valor'],
            ...$answers,
        ]);

        ExamService::updateExamTotal($exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Creada'))])
            );
    }

    public function updateTitle(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
        ]);

        $exam->update([
            'desc4' => YesNoEnum::YES->value,
            'desc4_1' => $validated['titulo'],
        ]);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Título :action', ['action' => strtolower(__('Actualizado'))])
            );
    }

    public function update(Request $request, Exam $exam, $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuestas' => ['required', 'array', 'min:5', 'max:5'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer) => $answer ?? '')
            ->toArray();

        $exam->blankLines()->findOrFail($question)->update([
            'pregunta' => $validated['pregunta'],
            'valor' => $validated['valor'],
            ...$answers,
        ]);

        ExamService::updateExamTotal($exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Actualizada'))])
            );
    }

    public function destroy(Exam $exam, $question)
    {
        $exam->blankLines()->findOrFail($question)->delete();

        ExamService::updateExamTotal($exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Eliminada'))])
            );
    }
}
