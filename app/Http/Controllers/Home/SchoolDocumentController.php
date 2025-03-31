<?php

declare(strict_types=1);

namespace App\Http\Controllers\Home;

use App\Enums\FlashMessageKey;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

final class SchoolDocumentController extends Controller
{
    public function index()
    {
        $school = Admin::getPrimaryAdmin()->first();
        $documents = DB::table('T_ing')->get();

        // $documents = DB::table('T_ing')
        //     ->whereRaw("fecha_desde <= '$date' and fecha_hasta >= '$date' and categoria='E' or fecha_desde <= '$date' and fecha_hasta >= '$date' and categoria='T'")->get();
        return Inertia::render('Home/Documents', [
            'school' => $school,
            'documents' => $documents,
        ]);
    }

    public function download(string $id)
    {

        $document = DB::table('T_ing')->where('id', $id)->first();

        if (Storage::fileExists($document->archivo)) {
            return Storage::download($document->archivo);
        }

        return back()->with(FlashMessageKey::ERROR->value, __('Este archivo no existe.'));
    }
}
