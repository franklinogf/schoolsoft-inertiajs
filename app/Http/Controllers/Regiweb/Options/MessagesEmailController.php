<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Mail\PersonalEmail;
use App\Models\Admin;
use App\Models\Student;
use App\Models\StudentGrade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

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

    public function form(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'data' => ['required', 'array'],
            'data.*' => ['string'],
            'selected' => ['required', 'string', 'in:students,admin,courses'],
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors()->all();

            return to_route('regiweb.options.messages.email.index')->with(count($errors) > 1 ? FlashMessageKey::ERROR_LIST->value : FlashMessageKey::ERROR->value, $errors);
        }

        $validated = $validator->validated();
        $data = $validated['data'];
        $selected = $validated['selected'];
        $students = $selected === 'students' ? StudentGrade::studentsDataTable($data) : null;
        $admins = $selected === 'admin' ? Admin::whereIn('usuario', $data)->get() : null;
        $courses = $selected === 'courses' ? auth()->user()->courses()->whereIn('curso', $data)->get() : null;

        return inertia('Regiweb/Options/Messages/Email/Form', compact('students', 'selected', 'data', 'admins', 'courses'));
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'to' => ['required', 'array'],
            'to.*' => ['string'],
            'subject' => ['required', 'string'],
            'message' => ['required', 'string'],
            'selected' => ['required', 'string', 'in:students,admin,courses'],
            'files' => ['array'],
            'files.*' => ['string'],
        ]);

        $to = $validated['to'];
        $subject = $validated['subject'];
        $message = $validated['message'];
        $selected = $validated['selected'];
        $tos = [];
        if ($selected === 'students') {
            // TODO
            $tos = Student::whereIn('ss', $to)->get()->map(function ($student) {
                return ['email' => $student->email, 'name' => "$student->nombre $student->apellidos"];
            });
        } elseif ($selected === 'admin') {
            $tos = Admin::whereIn('usuario', $to)->get()->map(function ($admin) {
                return ['email' => $admin->correo, 'name' => $admin->director];
            });
        } elseif ($selected === 'courses') {
            // TODO
            $tos = auth()->user()->courses()->whereIn('curso', $to)->get();
        }

        foreach ($tos as $to) {
            $personalEmail = (new PersonalEmail($message, $validated['files']))->subject($subject);
            Mail::to($to['email'], $to['name'])->queue($personalEmail);
        }

        return to_route('regiweb.options.messages.email.index', ['selected' => $selected])->with(FlashMessageKey::SUCCESS->value, 'Correo enviado correctamente');
    }
}
