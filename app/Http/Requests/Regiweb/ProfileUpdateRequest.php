<?php

namespace App\Http\Requests\Regiweb;

use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    private function checkDate(?string $date)
    {
        return $date === '0000-00-00' ? null : $date;
    }
    protected function prepareForValidation(): void
    {
        $this->merge([
            'fecha_daja' => $this->checkDate($this->fecha_daja),
            'fecha_nac' => $this->checkDate($this->fecha_nac),
            'fecha_ini' => $this->checkDate($this->fecha_ini),
            'fex1' => $this->checkDate($this->fex1),
            'fex2' => $this->checkDate($this->fex2),
            'fex3' => $this->checkDate($this->fex3),
            'fex4' => $this->checkDate($this->fex4),
            'genero' => $this->genero === 'Masculino' ? 'm' : ($this->genero === 'Femenino' ? 'f' : $this->genero),
            'lp1' => !$this->lp1 ? 'NO' : $this->lp1,
            'lp2' => !$this->lp2 ? 'NO' : $this->lp2,
            'lp3' => !$this->lp3 ? 'NO' : $this->lp3,
            'lp4' => !$this->lp4 ? 'NO' : $this->lp4,
        ]);
    }

    protected function passedValidation()
    {
        $this->merge([
            'email2' => $this->email2 ?? '',
            'pueblo2' => $this->pueblo2 ?? '',
            'esta2' => $this->esta2 ?? '',
            'zip2' => $this->zip2 ?? '',
            'alias' => $this->alias ?? '',
            'fecha_daja' => $this->fecha_daja ?? '0000-00-00',
            'fecha_nac' => $this->fecha_nac ?? '0000-00-00',
            'fecha_ini' => $this->fecha_ini ?? '0000-00-00',
            'fex1' => $this->fex1 ?? '0000-00-00',
            'fex2' => $this->fex2 ?? '0000-00-00',
            'fex3' => $this->fex3 ?? '0000-00-00',
            'fex4' => $this->fex4 ?? '0000-00-00',
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "picture" => ['exclude', Rule::requiredIf(fn() => $this->user()->foto_name === null), 'nullable', 'image'],
            "nombre" => ['required', 'min:2', 'string'],
            "apellidos" => ['required', 'min:2', 'string'],
            "tel_res" => ['nullable'],
            "tel_emer" => ['nullable'],
            "cel" => ['required'],
            "cel_com" => ['required'],
            "alias" => ['nullable', 'string'],
            "posicion" => ['required', 'string'],
            "genero" => ['required', Rule::in(['m', 'f'])],
            "fecha_nac" => ['required', 'date'],
            "fecha_ini" => ['required', 'date'],
            "fecha_daja" => ['nullable', 'date', 'after:fecha_ini'],
            "nivel" => ['required', 'string'],
            "preparacion1" => ['nullable', 'string'],
            "preparacion2" => ['nullable', 'string'],
            "email1" => ['required', 'string', 'email', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            "email2" => ['nullable', 'string', 'email', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            "re_e" => ['required', Rule::in(['SI', 'NO'])],
            "dir1" => ['nullable', 'string'],
            "dir2" => ['nullable', 'string'],
            "pueblo1" => ['nullable', 'string'],
            "esta1" => ['nullable', 'string'],
            "zip1" => ['nullable', 'numeric'],
            "dir3" => ['nullable', 'string'],
            "dir4" => ['nullable', 'string'],
            "pueblo2" => ['nullable', 'string'],
            "esta2" => ['nullable', 'string'],
            "zip2" => ['nullable', 'numeric'],
            "club1" => ['nullable', 'string'],
            "club2" => ['nullable', 'string'],
            "club3" => ['nullable', 'string'],
            "club4" => ['nullable', 'string'],
            "club5" => ['nullable', 'string'],
            "pre1" => ['nullable', 'string'],
            "pre2" => ['nullable', 'string'],
            "pre3" => ['nullable', 'string'],
            "pre4" => ['nullable', 'string'],
            "pre5" => ['nullable', 'string'],
            "vi1" => ['nullable', 'string'],
            "vi2" => ['nullable', 'string'],
            "vi3" => ['nullable', 'string'],
            "vi4" => ['nullable', 'string'],
            "vi5" => ['nullable', 'string'],
            "se1" => ['nullable', 'string'],
            "se2" => ['nullable', 'string'],
            "se3" => ['nullable', 'string'],
            "se4" => ['nullable', 'string'],
            "se5" => ['nullable', 'string'],
            "lic1" => ['nullable', 'string'],
            "lic2" => ['nullable', 'string'],
            "lic3" => ['nullable', 'string'],
            "lic4" => ['nullable', 'string'],
            "lp1" => ['nullable', Rule::in(['SI', 'NO'])],
            "lp2" => ['nullable', Rule::in(['SI', 'NO'])],
            "lp3" => ['nullable', Rule::in(['SI', 'NO'])],
            "lp4" => ['nullable', Rule::in(['SI', 'NO'])],
            "fex1" => ['nullable', 'date'],
            "fex2" => ['nullable', 'date'],
            "fex3" => ['nullable', 'date'],
            "fex4" => ['nullable', 'date'],

        ];
    }
}
