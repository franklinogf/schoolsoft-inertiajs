<?php

it('renders regiweb home page', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this->actingAs($user)->get(route('regiweb.home'));
    $this->assertAuthenticated();
    $response->assertStatus(200);

});

it('redirects to login if not authenticated as a teacher', function () {
    /** @var \Tests\TenantCase $this */
    $response = $this->get(route('regiweb.home'));
    $response->assertRedirect(route('home.index'));
    $this->assertGuest('teacher');
});
