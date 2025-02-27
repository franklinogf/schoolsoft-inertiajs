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

        $selected = request()->query('selected', 'students');

        return inertia('Regiweb/Options/Messages/Email/Index', [
            'students' => $students,
            'courses' => $courses,
            'admins' => $admins,
            'selected' => $selected,
        ]);
    }

    public function form()
    {
        $validated = request()->validate([
            'data' => ['required', 'array'],
            'data.*' => ['string'],
            'selected' => ['required', 'string'],
        ]);

        $data = $validated['data'];
        $selected = $validated['selected'];
        $students = $selected === 'students' ? StudentGrade::studentsDataTable($data) : null;
        $admins = $selected === 'admin' ? Admin::whereIn('usuario', $data)->get() : null;
        $courses = $selected === 'courses' ? auth()->user()->courses()->whereIn('curso', $data)->get() : null;

        return inertia('Regiweb/Options/Messages/Email/Form', compact('students', 'selected', 'data', 'admins', 'courses'));
    }

    public function send()
    {
        $validated = request()->validate([
            'to' => ['required', 'array'],
            'to.*' => ['string'],
            'subject' => ['required', 'string'],
            'message' => ['required', 'string'],
        ]);

        $to = $validated['to'];
        $subject = $validated['subject'];
        $message = $validated['message'];

        return to_route('regiweb.options.messages.email.index');
    }
}
