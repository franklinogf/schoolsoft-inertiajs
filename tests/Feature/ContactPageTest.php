<?php

use App\Mail\Root\Contact;

test('Can access Contact page', function () {
    $response = $this->get(route('contact.index'));

    $response->assertStatus(200);
});

test('Contact page can submit a form', function () {
    /** @var \Tests\TenantCase $this */
    Mail::fake();

    $emailData = [
        'name' => 'Franklin',
        'lastname' => 'Flores',
        'email' => 'test@test.com',
        'message' => 'Hello, this is a test message',
        'phone' => '+19293394306',
    ];

    $response = $this->post(route('contact.submit'), $emailData);

    $response->assertSessionHasNoErrors();

    Mail::assertSent(fn (Contact $mail): bool => $mail->name === $emailData['name']);

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
