<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    public function entry(Request $request)
    {
        $request->validate([
            'date' => ['sometimes', 'date:Y-m-d'],
            'grade' => ['sometimes', 'string'],
            'subject' => ['sometimes', 'string'],
        ]);
        $year = app('year');

        $initialDate = $request->query('date', now()->format('Y-m-d'));
        $initialSubject = null;
        $initialGrade = null;
        $grades = null;
        $subjects = null;

        $attendanceOption = Admin::getPrimaryAdmin()->asist;

        if ($attendanceOption === '3') {
            $subjects = DB::table('cursos')->where('id', auth()->id())->orderBy('curso')->pluck('curso');

            $initialSubject = $request->query('subject', $subjects[0]);

            $students = Student::ofCourse($initialSubject)
                ->get();
        } elseif ($attendanceOption === '2') {

            $grades = DB::table('year')
                ->select('grado')
                ->distinct()
                ->where('year', $year)
                ->orderBy('grado')
                ->pluck('grado');

            $initialGrade = $request->query('grade', $grades[0]);

            $students = Student::ofGrade($initialGrade)
                ->get();

        } else {
            $students = Student::where([
                'grado' => auth()->user()->grado,
            ])->get();
        }

        $studentsAttendances = $students->map(function (Student $student) use ($initialDate, $initialSubject, $initialGrade) {
            $attendance = $student->attendances()
                ->whereDate('fecha', $initialDate)
                ->when($initialGrade !== null, function ($query) use ($initialGrade) {
                    return $query->where('grado', $initialGrade);
                })
                ->when($initialSubject !== null, function ($query) use ($initialSubject) {
                    return $query->where('curso', $initialSubject);
                })
                ->first();

            return [
                'id' => $attendance->id ?? null,
                'studentId' => $student->mt,
                'name' => "{$student->nombre} {$student->apellidos}",
                'attendance' => $attendance->codigo ?? '',
            ];
        });

        return inertia('Regiweb/Notes/AttendanceEntry',
            compact(
                'attendanceOption',
                'initialDate',
                'studentsAttendances',
                'grades',
                'subjects',
                'initialGrade',
                'initialSubject'
            )
        );
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => ['nullable', 'integer'],
            'studentId' => ['required', 'integer'],
            'attendance' => ['required', 'string'],
            'date' => ['required', 'date:Y-m-d'],
            'subject' => ['nullable', 'string'],

        ]);
        $student = Student::find($validated['studentId']);

        if ($validated['id'] === null) {
            $student->attendances()->create([
                'nombre' => $student->nombre,
                'apellidos' => $student->apellidos,
                'year' => app('year'),
                'grado' => $student->grado,
                'fecha' => $validated['date'],
                'codigo' => $validated['attendance'],
                'p1' => '',
                'p2' => '',
                'p3' => '',
                'p4' => '',
                'p5' => '',
                'p6' => '',
                'p7' => '',
                'p8' => '',
                'curso' => $validated['subject'] ?? '',
                'baja' => '',
            ]);
        } else {
            $student->attendances()->where('id', $validated['id'])->update([
                'codigo' => $validated['attendance'],
            ]);
        }

        return back();
    }
}
