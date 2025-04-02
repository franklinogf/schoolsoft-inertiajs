<?php

declare(strict_types=1);

use function Pest\Laravel\actingAs;

test('teacher can view profile page', function () {
    actingAs($this->getRegiwebUser())
        ->get(route('regiweb.profile.show'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page->component('Regiweb/Profile'));
});
