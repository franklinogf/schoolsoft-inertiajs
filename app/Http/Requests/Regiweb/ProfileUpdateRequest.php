<?php

declare(strict_types=1);

namespace App\Http\Requests\Regiweb;

use App\Enums\GenderEnum;
use App\Enums\YesNoEnum;
use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ProfileUpdateRequest extends FormRequest
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
            'picture' => [Rule::requiredIf(fn (): bool => $this->user()->foto_name === null), 'nullable', 'string'],
            'nombre' => ['required', 'min:2', 'string'],
            'apellidos' => ['required', 'min:2', 'string'],
            'tel_res' => ['nullable', 'phone:US,PR'],
            'tel_emer' => ['nullable', 'phone:US,PR'],
            'cel' => ['required', 'phone:US,PR'],
            'cel_com' => ['required'],
            'alias' => ['nullable', 'string'],
            'posicion' => ['required', 'string'],
            'genero' => ['required', Rule::enum(GenderEnum::class)],
            'fecha_nac' => ['required', 'date'],
            'fecha_ini' => ['required', 'date'],
            'fecha_daja' => ['nullable', 'date', 'after:fecha_ini'],
            'nivel' => ['required', 'string'],
            'preparacion1' => ['nullable', 'string'],
            'preparacion2' => ['nullable', 'string'],
            'email1' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            'email2' => ['nullable', 'string', 'lowercase', 'email', 'max:255', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            're_e' => ['required', Rule::enum(YesNoEnum::class)],
            'dir1' => ['required', 'string'],
            'dir2' => ['nullable', 'string'],
            'pueblo1' => ['required', 'string'],
            'esta1' => ['required', 'string'],
            'zip1' => ['required', 'numeric'],
            'dir3' => ['nullable', 'string'],
            'dir4' => ['nullable', 'string'],
            'pueblo2' => ['nullable', 'string'],
            'esta2' => ['nullable', 'string'],
            'zip2' => ['nullable', 'numeric'],
            'club1' => ['nullable', 'string'],
            'club2' => ['nullable', 'string'],
            'club3' => ['nullable', 'string'],
            'club4' => ['nullable', 'string'],
            'club5' => ['nullable', 'string'],
            'pre1' => ['nullable', 'string'],
            'pre2' => ['nullable', 'string'],
            'pre3' => ['nullable', 'string'],
            'pre4' => ['nullable', 'string'],
            'pre5' => ['nullable', 'string'],
            'vi1' => ['nullable', 'string'],
            'vi2' => ['nullable', 'string'],
            'vi3' => ['nullable', 'string'],
            'vi4' => ['nullable', 'string'],
            'vi5' => ['nullable', 'string'],
            'se1' => ['nullable', 'string'],
            'se2' => ['nullable', 'string'],
            'se3' => ['nullable', 'string'],
            'se4' => ['nullable', 'string'],
            'se5' => ['nullable', 'string'],
            'lic1' => ['nullable', 'string'],
            'lic2' => ['nullable', 'string'],
            'lic3' => ['nullable', 'string'],
            'lic4' => ['nullable', 'string'],
            'lp1' => ['nullable', Rule::enum(YesNoEnum::class)],
            'lp2' => ['nullable', Rule::enum(YesNoEnum::class)],
            'lp3' => ['nullable', Rule::enum(YesNoEnum::class)],
            'lp4' => ['nullable', Rule::enum(YesNoEnum::class)],
            'fex1' => ['nullable', Rule::requiredIf(fn (): bool => $this->request->get('lp1') === YesNoEnum::YES->value), 'date'],
            'fex2' => ['nullable', Rule::requiredIf(fn (): bool => $this->request->get('lp2') === YesNoEnum::YES->value), 'date'],
            'fex3' => ['nullable', Rule::requiredIf(fn (): bool => $this->request->get('lp3') === YesNoEnum::YES->value), 'date'],
            'fex4' => ['nullable', Rule::requiredIf(fn (): bool => $this->request->get('lp4') === YesNoEnum::YES->value), 'date'],

        ];
    }
}
