<?php

namespace App\Http\Requests;

use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class TeacherRequest extends FormRequest
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
            "picture" => ['required_without:foto_name', 'image', 'nullable', 'exclude'],
            "nombre" => ['sometimes', 'required', 'min:2', 'string'],
            "apellidos" => ['sometimes', 'required', 'min:2', 'string'],
            "ss" => ['nullable', 'string', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            "tel_res" => ['nullable'],
            "tel_emer" => ['nullable'],
            "cel" => ['sometimes', 'required'],
            "posicion" => ['sometimes', 'required'],
            "genero" => ['sometimes', 'required', 'string'],
            "fecha_nac" => ['sometimes', 'required', 'date'],
            "fecha_ini" => ['sometimes', 'required', 'date'],
            "fecha_daja" => ['nullable', 'date', 'after:fecha_ini'],
            "nivel" => ['sometimes', 'required'],
            "preparacion1" => ['nullable'],
            "preparacion2" => ['nullable'],
            "grado" => ['nullable'],
            "email1" => ['sometimes', 'required', 'email', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            "email2" => ['nullable', 'email', Rule::unique(Teacher::class)->ignore($this->user()->id)],
            "dir1" => ['nullable'],
            "dir2" => ['nullable'],
            "pueblo1" => ['nullable'],
            "esta1" => ['nullable'],
            "zip1" => ['numeric'],
            "dir3" => ['nullable'],
            "dir4" => ['nullable'],
            "pueblo2" => ['nullable'],
            "esta2" => ['nullable'],
            "zip2" => ['nullable', 'numeric'],
            "club1" => ['nullable'],
            "club2" => ['nullable'],
            "club3" => ['nullable'],
            "club4" => ['nullable'],
            "club5" => ['nullable'],
            "usuario" => ['sometimes', 'required', Rule::unique('profesor')->ignore($this->user()->id)],
            "clave" => ['required_with:clave_confirmation', 'confirmed', 'exclude_without:clave_confirmation'],
            "clave_confirmation" => ['exclude', 'required_with:clave'],
            "tipo" => ['nullable'],
            "foto" => ['nullable', 'string'],
            "grupo" => ['sometimes', 'required'],
            "activo" => ['sometimes', 'required', Rule::in(['Activo', 'Inactivo'])],
            "idioma" => ['sometimes', 'required', Rule::in(['es', 'en'])],
            "ufecha" => ['sometimes', 'required'],
            "re_e" => ['sometimes', 'required', Rule::in(['SI', 'NO'])],
            "year" => ['nullable'],
            "cel_com" => ['nullable'],
            "alias" => ['nullable'],
            "baja" => ['nullable'],
            "pre1" => ['nullable'],
            "pre2" => ['nullable'],
            "pre3" => ['nullable'],
            "pre4" => ['nullable'],
            "pre5" => ['nullable'],
            "vi1" => ['nullable'],
            "vi2" => ['nullable'],
            "vi3" => ['nullable'],
            "vi4" => ['nullable'],
            "vi5" => ['nullable'],
            "se1" => ['nullable'],
            "se2" => ['nullable'],
            "se3" => ['nullable'],
            "se4" => ['nullable'],
            "se5" => ['nullable'],
            "comp" => ['required_with:cel'],
            "lic1" => ['nullable'],
            "lic2" => ['nullable'],
            "lic3" => ['nullable'],
            "lic4" => ['nullable'],
            "lp1" => ['nullable'],
            "lp2" => ['nullable'],
            "lp3" => ['nullable'],
            "lp4" => ['nullable'],
            "fex1" => ['date'],
            "fex2" => ['date'],
            "fex3" => ['date'],
            "fex4" => ['date'],
            "pe1" => ['nullable'],
            "pe2" => ['nullable'],
            "pe3" => ['nullable'],
            "pe4" => ['nullable'],
            "pe5" => ['nullable'],
            "pe6" => ['nullable'],
            "pe7" => ['nullable'],
            "pe8" => ['nullable'],
            "dep" => ['numeric'],
            "dep_des" => ['nullable'],
            "docente" => ['sometimes', 'required'],
            "foto_name" => ['string', 'nullable'],
            "email_smtp" => ['nullable'],
            "clave_email" => ['nullable'],
            "host_smtp" => ['nullable'],
            "port" => ['numeric'],
            "host" => ['nullable', Rule::in(['L', 'H'])],
            "tipo_foro" => ['numeric'],
            "avatar" => ['string', 'nullable'],
            "fechas" => ['numeric'],
            "tri" => ['numeric'],
            "pe9" => ['nullable'],
            "pe10" => ['nullable'],
            "pe11" => ['nullable'],
            "pe12" => ['nullable'],
            "pe13" => ['nullable'],
            "pe14" => ['nullable'],
            "pe15" => ['nullable'],
            "pe16" => ['nullable'],
            "cbarra" => ['nullable', 'string'],
        ];
    }

}
