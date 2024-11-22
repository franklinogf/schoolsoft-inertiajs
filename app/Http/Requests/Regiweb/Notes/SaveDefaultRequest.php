<?php

namespace App\Http\Requests\Regiweb\Notes;

use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveDefaultRequest extends FormRequest
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
            'data.*.notas' => ['required', 'array'],
            'data.*.notas.*.value' => ['nullable', 'string'],
            'data.*.notas.*.column' => ['nullable', 'string'],
            'data.*.total' => ['nullable', 'string'],
            'data.*.tdia' => ['nullable', 'numeric'],
            'data.*.tlib' => ['nullable', 'numeric'],
            'data.*.pcor' => ['nullable', 'numeric'],
            'data.*.tpa' => ['nullable', 'numeric'],
            'data.*.tdp' => ['nullable', 'numeric'],
            'trimester' => ['required', Rule::enum(TrimesterEnum::class)],
            'page' => [
                'required',
                Rule::enum(PagesEnum::class)->only([
                    PagesEnum::GRADES,
                    PagesEnum::SUMMER_GRADES,
                    PagesEnum::SHORT_TESTS,
                    PagesEnum::DAILY_WORKS,
                    PagesEnum::NOTEBOOKS_WORKS,
                ]),
            ],
            'course' => ['required', Rule::in($this->user()->courses()->pluck('curso')->toArray())],
        ];
    }
}
