<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
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

    public function updateTrueFalseTitle(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
        ]);

        $exam->update([
            'desc1' => YesNoEnum::YES->value,
            'desc1_1' => $validated['titulo'],
        ]);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Título :action', ['action' => strtolower(__('Actualizado'))]));
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

    public function storeSelect(Request $request, Exam $exam)
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

        $this->updateExamTotal($exam);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Pregunta :action', ['action' => strtolower(__('Creada'))]));
    }

    public function updateSelectTitle(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
        ]);

        $exam->update([
            'desc2' => YesNoEnum::YES->value,
            'desc2_1' => $validated['titulo'],
        ]);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Título :action', ['action' => strtolower(__('Actualizado'))]));
    }

    public function updateSelect(Request $request, Exam $exam, $question)
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

        $this->updateExamTotal($exam);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Pregunta :action', ['action' => strtolower(__('Actualizada'))]));
    }

    public function destroySelect(Exam $exam, $question)
    {
        $exam->selects()->findOrFail($question)->delete();

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
