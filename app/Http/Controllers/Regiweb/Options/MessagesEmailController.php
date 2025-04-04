<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Http\Resources\CoursesResource;
use App\Mail\PersonalEmail;
use App\Models\Admin;
use App\Models\Student;
use App\Models\StudentGrade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

final class MessagesEmailController extends Controller
{
    public function index()
    {
        $students = StudentGrade::studentsDataTable();
        $courses = CoursesResource::collection(auth()->user()->courses);
        $admins = Admin::all();

        $selected = request()->query('selected', 'students');

        return inertia('Regiweb/Options/Messages/Email/Index',
            ['students' => $students, 'selected' => $selected, 'courses' => $courses, 'admins' => $admins]
        );
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
        $courses = $selected === 'courses' ? CoursesResource::collection(auth()->user()->courses()->whereIn('curso', $data)->get()) : null;

        return inertia('Regiweb/Options/Messages/Email/Form',
            ['students' => $students, 'selected' => $selected, 'data' => $data, 'admins' => $admins, 'courses' => $courses]
        );
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
            $tos = Student::whereIn('ss', $to)->get()->map(fn ($student): array => ['email' => $student->email, 'name' => "{$student->nombre} {$student->apellidos}"]);
        } elseif ($selected === 'admin') {
            $tos = Admin::whereIn('usuario', $to)->get()->map(fn ($admin): array => ['email' => $admin->correo, 'name' => $admin->director]);
        } elseif ($selected === 'courses') {
            // TODO
            $tos = auth()->user()->courses()->whereIn('curso', $to)->get();
        }

        foreach ($tos as $to) {
            if ($to['email'] === null) {
                continue;
            }
            $personalEmail = new PersonalEmail($message, $validated['files'])->subject($subject);
            Mail::to($to['email'], $to['name'])->queue($personalEmail);
        }

        return to_route('regiweb.options.messages.email.index', ['selected' => $selected])->with(FlashMessageKey::SUCCESS->value, 'Correo enviado correctamente');
    }
}
