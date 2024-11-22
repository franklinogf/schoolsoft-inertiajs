<?php

namespace App\Http\Controllers\Regiweb\Notes;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Student;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function entry(Request $request)
    {
        $request->validate([
            'date' => ['sometimes', 'date:Y-m-d'],
        ]);

        $initialDate = $request->query('date', now()->format('Y-m-d'));

        $attendanceOption = Admin::getPrimaryAdmin()->asist;
        if ($attendanceOption === '3') {
            $students = [];
        } else {
            $students = Student::where([
                'grado' => auth()->user()->grado,
            ])->orderBy('apellidos')->orderBy('nombre')->get();
        }
        $studentsAttendances = $students->map(function ($student) use ($initialDate) {
            $attendance = $student->attendances()->whereDate('fecha', $initialDate)->first();

            return [
                'id' => $attendance->id ?? null,
                'studentId' => $student->mt,
                'name' => "$student->nombre $student->apellidos",
                'attendance' => $attendance->codigo ?? '',
            ];
        });

        return inertia('Regiweb/Notes/Attendance/Entry',
            compact(
                'attendanceOption',
                'initialDate',
                'studentsAttendances'
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
                'curso' => '',
                'baja' => '',
            ]);
        } else {
            $student->attendances()->where('id', $validated['id'])->update([
                'codigo' => $validated['attendance'],
            ]);
        }

        return to_route('regiweb.notes.attendance.entry', ['date' => $validated['date']]);
    }
}
