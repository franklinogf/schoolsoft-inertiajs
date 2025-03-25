<?php

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Services\ExamService;
use Illuminate\Http\Request;

class SelectTopicController extends Controller
{
    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'correcta' => ['required', 'integer'],
            'valor' => ['required', 'numeric', 'min:1'],
            'respuestas' => ['required', 'array', 'min:8', 'max:8'],
            'respuestas.respuesta1' => ['required', 'max:255'],
            'respuestas.respuesta2' => ['required', 'max:255'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer) => $answer)
            ->toArray();

        $exam->selects()->create([
            'pregunta' => $validated['pregunta'],
            'correcta' => $validated['correcta'],
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
            'desc2' => YesNoEnum::YES->value,
            'desc2_1' => $validated['titulo'],
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
            'correcta' => ['required', 'integer'],
            'valor' => ['required', 'numeric', 'min:1'],
            'respuestas' => ['required', 'array', 'min:8', 'max:8'],
            'respuestas.respuesta1' => ['required', 'max:255'],
            'respuestas.respuesta2' => ['required', 'max:255'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer) => $answer)
            ->toArray();

        $exam->selects()->findOrFail($question)->update([
            'pregunta' => $validated['pregunta'],
            'correcta' => $validated['correcta'],
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
        $exam->selects()->findOrFail($question)->delete();

        ExamService::updateExamTotal($exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Eliminada'))])
            );
    }
}
