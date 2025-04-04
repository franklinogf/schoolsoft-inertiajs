<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\Exam;
use App\Models\Exams\Question;
use App\Services\ExamService;
use Illuminate\Http\Request;

final class QuestionTopicController extends Controller
{
    public function __construct(
        private readonly ExamService $examService
    ) {}

    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'lineas' => ['required', 'numeric', 'min:1'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $exam->questions()->create($validated);
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
            'desc5' => YesNoEnum::YES->value,
            'desc5_1' => $validated['titulo'],
        ]);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Título :action', ['action' => mb_strtolower(__('Actualizado'))])
            );
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'lineas' => ['required', 'numeric', 'min:1'],
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

    public function destroy(Question $question)
    {
        $question->delete();

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => mb_strtolower(__('Eliminada'))])
            );
    }
}
