<?php

declare(strict_types=1);
use App\Models\School;

test('to array', function () {
    $school = School::factory()->create()->fresh();

    expect(array_keys($school->toArray()))->toBe([
        'id',
        'name',
        'enviroments',
        'features',
        'created_at',
        'updated_at',
        'data',
        'theme',
        'tenancy_db_username',
        'tenancy_db_password',
    ]);
});
