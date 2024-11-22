<?php

namespace App\Models;

use App\Models\Scopes\SchoolYear;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;

#[ScopedBy(SchoolYear::class)]
class StudentAttendance extends Model
{
    protected $table = 'asispp';

    public $timestamps = false;
}
