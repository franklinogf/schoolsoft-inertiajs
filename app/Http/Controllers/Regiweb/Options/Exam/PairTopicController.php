<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Models\Exams\Pair;
use App\Models\Exams\PairCode;
use App\Services\ExamService;
use Illuminate\Http\Request;

final class PairTopicController extends Controller
{
    public function __construct(
        private readonly ExamService $examService
    ) {}

    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta_c' => ['required', 'exists:T_examen_codigo_parea,id'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->pairs()->create($validated);
        $this->examService->updateTotal($exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => mb_strtolower(__('Creada'))])
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
                __('Título :action', ['action' => mb_strtolower(__('Actualizado'))])
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

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => mb_strtolower(__('Actualizada'))])
            );
    }

    public function destroy(Pair $question)
    {
        $question->delete();

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => mb_strtolower(__('Eliminada'))])
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
                __('Respuesta :action', ['action' => mb_strtolower(__('Creada'))])
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
                __('Respuesta :action', ['action' => mb_strtolower(__('Actualizada'))])
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
                __('Respuesta :action', ['action' => mb_strtolower(__('Eliminada'))])
            );
    }
}
