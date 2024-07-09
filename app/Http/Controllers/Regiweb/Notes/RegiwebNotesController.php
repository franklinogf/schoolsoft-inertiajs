<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegiwebNotesController extends Controller
{
    public function index()
    {

        $disctinctGrades = DB::table('padres')
            ->select(['curso', 'descripcion'])
            ->where([['id', auth()->id()], ['year', Admin::primary()->year]])
            ->distinct()
            ->get();
        $grades = $disctinctGrades->map(function ($grade) {
            return ['key' => $grade->curso, 'value' => "$grade->curso - $grade->descripcion"];
        });



        return Inertia::render('Regiweb/Notes/Index', ['teacherGrades' => $grades]);
    }
}
