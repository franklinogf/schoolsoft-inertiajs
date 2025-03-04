<?php

namespace App\Enums;

enum StoragePathEnum: string
{
    case TEACHERS_PROFILE_PICTURES = 'profile_pictures/teacher';
    case STUDENTS_PROFILE_PICTURES = 'profile_pictures/student';

}
