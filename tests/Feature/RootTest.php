<?php

use App\Mail\Root\Contact;
use Illuminate\Support\Facades\Mail;

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

test('Can access Contact page', function () {
    $response = $this->get(route('contact.index'));

    $response->assertStatus(200);
});

test('Contact page can submit a form', function () {
    Mail::fake();
    $emailData = [
        'name' => 'Franklin',
        'lastname' => 'Flores',
        'email' => 'test@test.com',
        'message' => 'Hello, this is a test message',
        'phone' => '9293394306',
    ];
    $response = $this->post(route('contact.submit'), $emailData);
    Mail::assertSent(function (Contact $mail) use ($emailData) {
        return $mail->hasTo('franklinomarflores@gmail.com') && $mail->name === $emailData['name'];
    });
    $response->assertRedirect(route('contact.index'));
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
