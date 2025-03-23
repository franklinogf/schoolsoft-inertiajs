<?php

namespace App\Enums;

enum YesNoEnum: string
{
    use EnumToArray;
    case YES = 'SI';

    case NO = 'NO';

}
