<?php

declare(strict_types=1);

namespace App\Http\Requests\Regiweb;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

final class PasswordUpdateRequest extends FormRequest
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
            'clave' => ['required', Password::defaults(), 'confirmed'],
            'clave_confirmation' => ['required', 'exclude'],
        ];
    }
}
