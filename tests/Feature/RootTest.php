<?php

test('Home page returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertStatus(200);
});

test('Modules page returns a successful response', function () {
    $response = $this->get(route('modules'));

    $response->assertStatus(200);
});

test('Regiweb page returns a successful response', function () {
    $response = $this->get(route('regiweb'));

    $response->assertStatus(200);
});

test('Contact page returns a successful response', function () {
    $response = $this->get(route('contact.index'));

    $response->assertStatus(200);
});

test('Contact page can submit a form', function () {
    $response = $this->post(route('contact.submit'), [
        'name' => 'Franklin',
        'lastname' => 'Flores',
        'email' => 'test@test.com',
        'message' => 'Hello, this is a test message',
        'phone' => '9293394306',
    ]);
    $response->assertRedirect();
});

test('Contact page cannot submit a form with invalid email', function () {
    $response = $this->post(route('contact.submit'), [
        'name' => 'Franklin',
        'lastname' => 'Flores',
        'email' => 'test',
        'message' => 'Hello, this is a test message',
        'phone' => '9293394306',
    ]);
    $response->assertSessionHasErrors('email');
});

test('Contact page cannot submit a form with invalid phone', function () {
    $response = $this->post(route('contact.submit'), [
        'name' => 'Franklin',
        'lastname' => 'Flores',
        'email' => 'test@test.com',
        'message' => 'Hello, this is a test message',
        'phone' => '12345678',
    ]);
    $response->assertSessionHasErrors('phone');
});
