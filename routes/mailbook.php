<?php

declare(strict_types=1);

use App\Mail\PersonalEmail;
use App\Mail\Root\Contact;
use Xammie\Mailbook\Facades\Mailbook;

Mailbook::category('Primary page')->group(function () {
    Mailbook::add(fn () => new Contact(
        'Franklin Omar',
        'Gonzalez Flores',
        'franklinomarflores@gmail.com',
        'Hola mundo!',
        '+1 829-865-0000'
    ));
});

Mailbook::add(fn () => (new PersonalEmail(
    '<h1>Hello world!</h1>'
))->subject('Hello world!'));
