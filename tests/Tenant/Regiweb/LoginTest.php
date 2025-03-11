<?php

use App\Enums\FlashMessageKey;

test('renders regiweb login page', function () {
    /** @var \Tests\TenantCase $this */
    $response = $this->get(route('regiweb.login.index'));
    $this->assertGuest();
    $response->assertStatus(200);
});

it('redirects to index page if user is already logged in', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this
        ->actingAs($user)
        ->get(route('regiweb.login.index'));
    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(route('regiweb.index'));
});

it('can login with valid credentials', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this->post(route('regiweb.login'), [
        'usuario' => $user->usuario,
        'clave' => $user->clave,
    ]);
    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(route('regiweb.index'));
});

it('cannot login with invalid credentials', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this->post(route('regiweb.login'), [
        'usuario' => $user->usuario,
        'clave' => 'invalid',
    ]);
    $this->assertGuest();
    $response->assertSessionHas(FlashMessageKey::ERROR->value, __('Credenciales inválidas'));
});

it('can logout', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getRegiwebUser();
    $response = $this
        ->actingAs($user)
        ->delete(route('regiweb.logout'));
    $this->assertGuest();
    $response->assertRedirect(route('regiweb.login.index'));
});
