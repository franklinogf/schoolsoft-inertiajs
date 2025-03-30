<?php

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Models\Exams\TrueOrFalse;
use App\Services\ExamService;
use Illuminate\Http\Request;

class TrueFalseTopicController extends Controller
{
    public function __construct(
        protected ExamService $examService
    ) {}

    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta' => ['required', 'in:v,f'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->truesOrFalses()->create($validated);
        $this->examService->updateTotal($exam);

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
            'desc1' => YesNoEnum::YES->value,
            'desc1_1' => $validated['titulo'],
        ]);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Título :action', ['action' => strtolower(__('Actualizado'))])
            );
    }

    public function update(Request $request, TrueOrFalse $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta' => ['required', 'in:v,f'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $question->update($validated);

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Actualizada'))])
            );
    }

    public function destroy(TrueOrFalse $question)
    {
        $question->delete();

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Eliminada'))])
            );
    }
}
