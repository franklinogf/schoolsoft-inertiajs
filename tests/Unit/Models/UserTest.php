<?php

declare(strict_types=1);

use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->fresh();
    expect(array_keys($user->toArray()))->toBe([
        'id',
        'name',
        'email',
        'email_verified_at',
        'created_at',
        'updated_at',
    ]);
});

it('can access filament panel', function () {
    $user = User::factory()->create();
    $panel = app('filament')->getPanel();

    expect($user->canAccessPanel($panel))->toBeTrue();
});
