<?php

declare(strict_types=1);

namespace App\Http\Requests\Regiweb\Notes;

use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class SaveAttendanceRequest extends FormRequest
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
            'data' => ['required', 'array'],
            'data.*.id' => ['required', 'integer'],
            'data.*.conduct.value' => ['nullable', 'string'],
            'data.*.conduct.column' => ['required', 'string'],
            'data.*.absence.value' => ['nullable', 'string'],
            'data.*.absence.column' => ['required', 'string'],
            'data.*.tardy.value' => ['nullable', 'string'],
            'data.*.tardy.column' => ['required', 'string'],
            'data.*.demerits.value' => ['nullable', 'string'],
            'data.*.demerits.column' => ['required', 'string'],
            'trimester' => ['required', Rule::enum(TrimesterEnum::class)],
            'page' => ['required', Rule::enum(PagesEnum::class)->only(PagesEnum::CONDUCT_ATTENDANCE)],
            'course' => ['required', Rule::in($this->user()->courses()->pluck('curso')->toArray())],
        ];
    }
}
