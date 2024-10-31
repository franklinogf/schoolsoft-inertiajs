<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RegiwebNotesController extends Controller
{
    public function index()
    {

        $disctinctGrades = DB::table('cursos')
            ->select(['curso', 'desc1 as descripcion'])
            ->where([['id', auth()->id()], ['year', Admin::primary()->year2]])
            ->distinct()
            ->get();
        $grades = $disctinctGrades->map(function ($grade) {
            return ['key' => $grade->curso, 'value' => "$grade->curso - $grade->descripcion"];
        });

        return Inertia::render('Regiweb/Notes/Index', ['teacherGrades' => $grades]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'grade' => [
                'required',
                'string',
            ],
            'page' => [
                'required',
                'string',
                Rule::enum(PagesEnum::class),
            ],
            'trimester' => [
                'required',
                'string',
                Rule::enum(TrimesterEnum::class),

            ],
        ]);

        return to_route('regiweb.notes.show', $validated);
    }

    public function show(Request $request)
    {
        $validated = $request->validate([
            'grade' => [
                'required',
                'string',
            ],
            'page' => [
                'required',
                'string',
                Rule::enum(PagesEnum::class),
            ],
            'trimester' => [
                'required',
                'string',
                Rule::enum(TrimesterEnum::class),

            ],
        ]);

        return Inertia::render('Regiweb/Notes/Show', $validated);
    }
}
