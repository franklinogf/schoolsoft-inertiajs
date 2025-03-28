<?php

test('Can access Home page', function () {
    $response = $this->get(route('home'));

    $response->assertStatus(200);
});

test('Can access Modules page', function () {
    $response = $this->get(route('modules'));

    $response->assertStatus(200);
});

test('Can access Regiweb page', function () {
    $response = $this->get(route('regiweb'));

    $response->assertStatus(200);
});
