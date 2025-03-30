<?php

namespace App\Http\Controllers\Regiweb\Options\Exam;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Regiweb\Exam\StoreExamRequest;
use App\Http\Requests\Regiweb\Exam\UpdateExamRequest;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\Exams\ExamResource;
use App\Models\Exams\Exam;
use App\Models\Teacher;
use App\Rules\TeacherCourse;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(#[CurrentUser] Teacher $user)
    {
        $exams = $user->exams()
            ->with([
                'teacher',
                'questions',
                'truesOrFalses',
                'selects',
                'pairs',
                'pairsCodes',
                'blankLines',
            ])->orderByDesc('id')->get();

        return inertia('Regiweb/Options/Exams/Index', [
            'exams' => ExamResource::collection($exams),
            'courses' => CoursesResource::collection($user->courses),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request, #[CurrentUser] Teacher $user)
    {
        $exam = $user->exams()->create($request->validated());

        return to_route('regiweb.options.exams.edit', [
            'exam' => $exam,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam, #[CurrentUser] Teacher $user)
    {
        $exam->load([
            'questions',
            'truesOrFalses',
            'selects',
            'pairs',
            'pairsCodes',
            'blankLines',
        ]);

        return inertia('Regiweb/Options/Exams/Edit', [
            'exam' => ExamResource::make($exam),
            'courses' => CoursesResource::collection($user->courses),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $exam->update($request->validated());

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', ['action' => strtolower(__('Actualizado'))]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', ['action' => strtolower(__('Eliminado'))]));
    }

    public function toggle(Exam $exam)
    {
        $exam->update([
            'activo' => $exam->activo === YesNoEnum::YES->value ? YesNoEnum::NO->value : YesNoEnum::YES->value,
        ]);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', [
                'action' => $exam->activo === YesNoEnum::YES->value ? strtolower(__('Activado')) : strtolower(__('Desactivado')),
            ]));
    }

    public function duplicate(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'curso' => new TeacherCourse,
        ]);

        $newExam = $exam->replicate()->fill(
            [
                'titulo' => $validated['titulo'],
                'curso' => $validated['curso'],
                'activo' => YesNoEnum::NO->value,
            ]);
        $newExam->save();

        $exam->questions->each(function ($question) use ($newExam) {
            $newExam->questions()->save($question->replicate());
        });
        $exam->truesOrFalses->each(function ($question) use ($newExam) {
            $newExam->truesOrFalses()->save($question->replicate());
        });
        $exam->selects->each(function ($question) use ($newExam) {
            $newExam->selects()->save($question->replicate());
        });
        $exam->pairs->each(function ($question) use ($newExam) {
            $newExam->pairs()->save($question->replicate());
        });
        $exam->pairsCodes->each(function ($question) use ($newExam) {
            $newExam->pairsCodes()->save($question->replicate());
        });
        $exam->blankLines->each(function ($question) use ($newExam) {
            $newExam->blankLines()->save($question->replicate());
        });

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', ['action' => strtolower(__('Duplicado'))]));
    }
}
