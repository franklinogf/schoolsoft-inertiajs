<?php

use App\Enums\FlashMessageKey;

test('renders regiweb login page', function () {
    /** @var \Tests\TenantCase $this */
    $response = $this
        ->get(route('regiweb.login.index'));

    $response->assertSuccessful();

    $this->assertGuest();

    $response->assertInertia(fn ($page) => $page->component('Regiweb/Login'));

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

test('not redirects when another user that is not a teacher is logged in', function () {
    /** @var \Tests\TenantCase $this */
    $user = $this->getPrimaryAdmin();
    $response = $this
        ->actingAs($user, 'admin')
        ->get(route('regiweb.login.index'));
    $this->assertAuthenticatedAs($user);
    $response->assertSuccessful();
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
