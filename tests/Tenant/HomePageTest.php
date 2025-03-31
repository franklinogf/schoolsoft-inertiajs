<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('renders school home page', function () {
    /** @var Tests\TenantCase $this */
    $school = $this->getPrimaryAdmin();

    $this->get(route('home.index'))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('Home/Index')
                ->has('school')
                ->where('school.colegio', $school->colegio)
        );

});
