<?php

namespace App\Http\Controllers\Root;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return inertia('Root/Contact');
    }

    public function submit(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'message' => ['required'],
            'phone' => ['phone:US,INTERNATIONAL'],
        ]);

        // TODO: Send email
        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }
}
