<?php

namespace App\Rules;

use App\Enums\YesNoEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class YesNo implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! in_array($value, YesNoEnum::values())) {
            $fail('El :attribute esta incorrecto.');
        }
    }
}
