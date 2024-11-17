<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SchoolDocumentController extends Controller
{
    public function index()
    {
        $school = Admin::getPrimaryAdmin();
        $date = now()->format('Y-m-d');
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

        return to_route('home.documents')->with('message', __('El archivo no exite o ha sido borrado'));
    }
}
