<?php

namespace App\Http\Requests\Regiweb\Notes;

use App\Enums\PagesEnum;
use App\Enums\TrimesterEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShowRequest extends FormRequest
{
    protected $redirectRoute = 'regiweb.notes.index';

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
            'course' => [
                'required',
                'string',
                Rule::in($this->user()->courses()->pluck('curso')->toArray()),
            ],
            'page' => [
                'required',
                Rule::enum(PagesEnum::class),
            ],
            'trimester' => [
                'required',
                Rule::enum(TrimesterEnum::class)->when(
                    fn () => $this->input('page') === PagesEnum::FINAL_EXAM->value,
                    fn ($rule) => $rule->only([TrimesterEnum::SECOND_TRIMESTER, TrimesterEnum::FOURTH_TRIMESTER])
                ),
            ],

        ];
    }
}
