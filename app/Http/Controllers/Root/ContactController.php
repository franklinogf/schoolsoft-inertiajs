<?php

namespace App\Http\Controllers\Root;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        return inertia('Root/Contact');
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'lastname' => ['required'],
            'email' => ['required', 'email'],
            'message' => ['required'],
            'phone' => ['phone:INTERNATIONAL'],
        ]);

        Mail::send(new \App\Mail\Root\Contact(
            $validated['name'],
            $validated['lastname'],
            $validated['email'],
            $validated['message'],
            $validated['phone'],
        ));

        return to_route('contact.index')->with(FlashMessageKey::SUCCESS->value, __('Mensaje enviado con éxito'));
    }
}
