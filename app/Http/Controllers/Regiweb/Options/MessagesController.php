<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Http\Controllers\Controller;

class MessagesController extends Controller
{
    public function index()
    {
        return inertia('Regiweb/Options/Messages/Index');
    }
}
