<?php

it('renders regiweb home page', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this->actingAs($user)->get(route('regiweb.home'));
    $this->assertAuthenticated();
    $response->assertStatus(200);

});
