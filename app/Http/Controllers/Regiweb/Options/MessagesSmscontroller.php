<?php

declare(strict_types=1);

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Http\Resources\CoursesResource;
use App\Mail\PersonalEmail;
use App\Models\Student;
use App\Models\StudentGrade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

final class MessagesSmscontroller extends Controller
{
    public function index()
    {
        $students = StudentGrade::studentsDataTable();
        $courses = CoursesResource::collection(auth()->user()->courses);

        $selected = request()->query('selected', 'students');

        return inertia('Regiweb/Options/Messages/Sms/Index',
            ['students' => $students, 'selected' => $selected, 'courses' => $courses]
        );
    }

    public function form(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'data' => ['present_if:phone,null', 'array'],
            'data.*' => ['required', 'string'],
            'phone' => ['required_without:data', 'phone'],
            'company' => ['required_with:phone', 'string'],
            'selected' => ['required', 'string', 'in:students,courses,individual'],
        ]);

        if ($validator->fails()) {

            $errors = $validator->errors()->all();

            return to_route('regiweb.options.messages.sms.index',
                ['selected' => $request->string('selected', 'students')]
            )
                ->with(count($errors) > 1 ? FlashMessageKey::ERROR_LIST->value : FlashMessageKey::ERROR->value, $errors);
        }

        $validated = $validator->validated();
        $data = $validated['data'] ?? null;
        $selected = $validated['selected'];

        $students = $selected === 'students' ? StudentGrade::studentsDataTable($data) : null;
        $courses = $selected === 'courses' ? CoursesResource::collection(auth()->user()->courses()->whereIn('curso', $data)->get()) : null;
        $phone = $selected === 'individual' ? $validated['phone'] : null;
        $company = $selected === 'individual' ? $validated['company'] : null;

        return inertia('Regiweb/Options/Messages/Sms/Form',
            ['students' => $students, 'selected' => $selected, 'data' => $data, 'courses' => $courses, 'phone' => $phone, 'company' => $company]
        );
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'to' => ['required', 'array'],
            'to.*' => ['string'],
            'subject' => ['required', 'string'],
            'message' => ['required', 'string'],
            'selected' => ['required', 'string', 'in:students,individual,courses'],
        ]);

        $to = $validated['to'];
        $subject = $validated['subject'];
        $message = $validated['message'];
        $selected = $validated['selected'];
        $tos = [];

        if ($selected === 'students') {
            // TODO
            $tos = Student::whereIn('ss', $to)->get()
                ->map(fn ($student): array => ['email' => create_phone_email($student->cel, $student->cel), 'name' => "{$student->nombre} {$student->apellidos}"]
                );
        } elseif ($selected === 'courses') {
            // TODO
            $tos = auth()->user()->courses()->whereIn('curso', $to)->get();
        } elseif ($selected === 'individual') {
            $tos = collect($to)->map(fn ($phoneEmail): array => ['email' => $phoneEmail]);
        }

        foreach ($tos as $to) {
            $personalEmail = (new PersonalEmail($message))->subject($subject);

            if ($to['email'] === null) {
                continue;
            }
            Mail::to($to['email'], $to['name'] ?? null)->queue($personalEmail);
        }

        return to_route('regiweb.options.messages.sms.index', ['selected' => $selected])->with(FlashMessageKey::SUCCESS->value, 'Correo enviado correctamente');
    }
}
