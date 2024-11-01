<?php

namespace App\Enums;

enum FlashMessageKey: string
{
    case SUCCESS = 'success';
    case ERROR = 'error';
    case ERROR_LIST = 'errorList';

}
