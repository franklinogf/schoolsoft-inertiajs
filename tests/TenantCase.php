<?php

namespace Tests;

use App\Models\Admin;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

abstract class TenantCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $school = School::where('id', 'omar')->first();
        tenancy()->initialize($school);
        URL::defaults(['school' => $school->id]);

        DB::beginTransaction();
    }

    protected function tearDown(): void
    {
        DB::rollBack();
        DB::disconnect();
        tenancy()->end();
        parent::tearDown();
    }

    public function getPrimaryAdmin()
    {
        return Admin::getPrimaryAdmin()->first();
    }

    public function getRegiwebUser()
    {
        return Teacher::where('usuario', 'rvelez')->first();
    }
}
