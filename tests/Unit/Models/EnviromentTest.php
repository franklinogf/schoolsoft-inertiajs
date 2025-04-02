<?php

declare(strict_types=1);
use App\Models\Enviroment;

test('to array', function () {
    $enviroment = Enviroment::factory()->create()->fresh();
    expect(array_keys($enviroment->toArray()))->toBe(['name']);
});
