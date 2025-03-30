<?php

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Models\Exams\Pair;
use App\Models\Exams\PairCode;
use App\Services\ExamService;
use Illuminate\Http\Request;

class PairTopicController extends Controller
{
    public function __construct(
        protected ExamService $examService
    ) {}

    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta_c' => ['required', 'exists:T_examen_codigo_parea,id'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->pairs()->create($validated);
        $this->examService->updateExamTotal($exam);

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
            'desc3' => YesNoEnum::YES->value,
            'desc3_1' => $validated['titulo'],
        ]);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Título :action', ['action' => strtolower(__('Actualizado'))])
            );
    }

    public function update(Request $request, Pair $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta_c' => ['required', 'exists:T_examen_codigo_parea,id'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $question->update($validated);

        $this->examService->updateExamTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Actualizada'))])
            );
    }

    public function destroy(Pair $question)
    {
        $question->delete();

        $this->examService->updateExamTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => strtolower(__('Eliminada'))])
            );
    }

    public function storeCode(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'respuesta' => ['required', 'string', 'max:255'],
        ]);

        $exam->pairsCodes()->create($validated);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Respuesta :action', ['action' => strtolower(__('Creada'))])
            );
    }

    public function updateCode(Request $request, PairCode $answer)
    {
        $validated = $request->validate([
            'respuesta' => ['required', 'string', 'max:255'],
        ]);

        $answer->update($validated);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Respuesta :action', ['action' => strtolower(__('Actualizada'))])
            );
    }

    public function destroyCode(PairCode $answer)
    {
        $pairs = $answer->question()->count();

        if ($pairs > 0) {
            return back()
                ->with(
                    FlashMessageKey::ERROR->value,
                    __('No se puede eliminar la respuesta porque está siendo utilizada en una pregunta')
                );
        }
        $answer->delete();

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Respuesta :action', ['action' => strtolower(__('Eliminada'))])
            );
    }
}
