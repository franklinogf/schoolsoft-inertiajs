<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Enums\YesNoEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamRequest;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\Exams\ExamResource;
use App\Models\Exams\Exam;
use Illuminate\Http\Request;

class ExamGeneratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $teacher = auth()->user()->load(['courses', 'exams']);
        $exams = $teacher->exams()
            ->with([
                'teacher',
                'questions',
                'truesOrFalses',
                'selects',
                'pairs',
                'pairsCodes',
                'blankLines',
            ])->orderByDesc('id')->get();
        $courses = $teacher->courses()->get();

        return inertia('Regiweb/Options/Exams/Index', [
            'exams' => ExamResource::collection($exams),
            'courses' => CoursesResource::collection($courses),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        /**
         * @var \App\Models\Teacher $teacher
         */
        $teacher = auth()->user();
        $exam = $teacher->exams()->create($request->validated());

        return to_route('regiweb.options.exams.edit', [
            'exam' => $exam,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        $exam->load([
            'teacher',
            'questions',
            'truesOrFalses',
            'selects',
            'pairs',
            'pairsCodes',
            'blankLines',
        ]);

        return inertia('Regiweb/Options/Exams/Edit', [
            'exam' => new ExamResource($exam),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', ['action' => __('eliminado')]));
    }

    public function toggle(Exam $exam)
    {
        $exam->update([
            'activo' => $exam->activo === YesNoEnum::YES->value ? YesNoEnum::NO->value : YesNoEnum::YES->value,
        ]);

        return back()
            ->with(FlashMessageKey::SUCCESS->value, __('Examen :action', [
                'action' => $exam->activo === YesNoEnum::YES->value ? __('activado') : __('desactivado'),
            ]));
    }
}
