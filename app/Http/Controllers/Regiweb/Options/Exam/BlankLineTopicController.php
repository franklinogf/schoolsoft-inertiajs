<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Models\Exams\BlankLine;
use App\Models\Exams\Exam;
use App\Services\ExamService;
use Illuminate\Http\Request;

final class BlankLineTopicController extends Controller
{
    public function __construct(
        protected ExamService $examService
    ) {}

    public function store(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuestas' => ['required', 'array', 'min:5', 'max:5'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer): mixed => $answer ?? '')
            ->toArray();

        $exam->blankLines()->create([
            'pregunta' => $validated['pregunta'],
            'valor' => $validated['valor'],
            ...$answers,
        ]);

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
            'desc4' => YesNoEnum::YES->value,
            'desc4_1' => $validated['titulo'],
        ]);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Título :action', ['action' => mb_strtolower(__('Actualizado'))])
            );
    }

    public function update(Request $request, BlankLine $question)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuestas' => ['required', 'array', 'min:5', 'max:5'],
            'respuestas.*' => ['nullable', 'string', 'max:255'],
            'valor' => ['required', 'numeric', 'min:1'],
        ]);

        $answers = collect($validated['respuestas'])
            ->map(fn ($answer): mixed => $answer ?? '')
            ->toArray();

        $question->update([
            'pregunta' => $validated['pregunta'],
            'valor' => $validated['valor'],
            ...$answers,
        ]);

        $this->examService->updateTotal($question->exam);

        return back()
            ->with(
                FlashMessageKey::SUCCESS->value,
                __('Pregunta :action', ['action' => mb_strtolower(__('Actualizada'))])
            );
    }

    public function destroy(BlankLine $question)
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
