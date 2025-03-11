<?php

namespace Tests;

use App\Models\School;
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
}
