<?php

namespace App\Http\Controllers\Root;

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
            'phone' => ['phone:US,INTERNATIONAL'],
        ]);

        // TODO: Send email
        Mail::to('franklinomarflores@gmail.com')->send(new \App\Mail\Root\Contact(
            $validated['name'],
            $validated['lastname'],
            $validated['email'],
            $validated['message'],
            $validated['phone'],
        ));

        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }
}
