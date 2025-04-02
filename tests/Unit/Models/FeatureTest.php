<?php

declare(strict_types=1);

use App\Models\Feature;

test('to array', function () {
    $enviroment = Feature::factory()->create()->fresh();
    expect(array_keys($enviroment->toArray()))->toBe(['name']);
});
