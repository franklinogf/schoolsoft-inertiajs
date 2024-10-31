<?php

use App\Mail\MailbookMail;
use App\Mail\Root\Contact;
use Xammie\Mailbook\Facades\Mailbook;

Mailbook::add(fn() => new Contact(
    'Franklin Omar',
    'Gonzalez Flores',
    'franklinomarflores@gmail.com',
    'Hola mundo!',
    '+1 829-865-0000'
));
