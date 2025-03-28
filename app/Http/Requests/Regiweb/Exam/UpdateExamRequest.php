<?php

namespace App\Http\Requests\Regiweb\Exam;

use App\Rules\TeacherCourse;
use App\Rules\YesNo;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => ['required', 'string', 'max:255'],
            'curso' => ['required', new TeacherCourse],
            'fecha' => ['required', 'date:Y-m-d'],
            'hora' => ['required', 'date_format:H:i:s'],
            'hora_final' => ['required', 'date_format:H:i:s'],
            'tiempo' => ['required', 'integer', 'min:1'],
            'ver_nota' => ['required', new YesNo],
            'activo' => ['required', new YesNo],
        ];
    }
}
