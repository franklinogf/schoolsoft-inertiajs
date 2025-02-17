<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\StudentGrade;

class MessagesEmailController extends Controller
{
    public function index()
    {
        $students = StudentGrade::studentsDataTable();
        $courses = auth()->user()->courses;
        $admins = Admin::all();

        return inertia('Regiweb/Options/Messages/Email/Index', [
            'students' => $students,
            'courses' => $courses,
            'admins' => $admins,
        ]);
    }
}
