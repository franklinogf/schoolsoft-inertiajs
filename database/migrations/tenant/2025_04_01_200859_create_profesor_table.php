<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profesor', function (Blueprint $table): void {
            $table->integer('id')->unique('id');
            $table->char('nombre', 20)->index('nombre');
            $table->char('apellidos', 35);
            $table->char('ss', 11);
            $table->char('tel_res', 13);
            $table->char('tel_emer', 13);
            $table->char('cel', 13);
            $table->char('posicion', 42);
            $table->char('genero', 9);
            $table->date('fecha_nac');
            $table->date('fecha_ini');
            $table->date('fecha_daja');
            $table->char('nivel', 20)->nullable();
            $table->char('preparacion1', 45);
            $table->char('preparacion2', 45);
            $table->char('grado', 5)->nullable();
            $table->char('email1', 40);
            $table->char('email2', 40);
            $table->char('dir1', 45);
            $table->char('dir2', 45);
            $table->char('pueblo1', 20);
            $table->char('esta1', 4);
            $table->char('zip1', 10);
            $table->char('dir3', 45);
            $table->char('dir4', 45);
            $table->char('pueblo2', 20);
            $table->char('esta2', 4);
            $table->char('zip2', 10);
            $table->char('club1', 35)->nullable();
            $table->char('club2', 35)->nullable();
            $table->char('club3', 35)->nullable();
            $table->char('club4', 35)->nullable();
            $table->char('club5', 35)->nullable();
            $table->char('usuario', 20)->unique('usuario');
            $table->char('clave', 20);
            $table->string('tipo', 1);
            $table->binary('foto');
            $table->char('grupo', 15);
            $table->char('activo', 10);
            $table->char('idioma', 8);
            $table->date('ufecha');
            $table->char('re_e', 2);
            $table->char('year', 5);
            $table->char('cel_com', 15);
            $table->string('alias', 40);
            $table->char('baja', 1);
            $table->string('pre1', 30)->nullable();
            $table->string('pre2', 30)->nullable();
            $table->string('pre3', 30)->nullable();
            $table->string('pre4', 30)->nullable();
            $table->string('pre5', 30)->nullable();
            $table->string('vi1', 30)->nullable();
            $table->string('vi2', 30)->nullable();
            $table->string('vi3', 30)->nullable();
            $table->string('vi4', 30)->nullable();
            $table->string('vi5', 30)->nullable();
            $table->string('se1', 30)->nullable();
            $table->string('se2', 30)->nullable();
            $table->string('se3', 30)->nullable();
            $table->string('se4', 30)->nullable();
            $table->string('se5', 30)->nullable();
            $table->char('comp', 7);
            $table->string('lic1', 55)->nullable();
            $table->string('lic2', 55)->nullable();
            $table->string('lic3', 55)->nullable();
            $table->string('lic4', 55)->nullable();
            $table->string('lp1', 2)->nullable();
            $table->string('lp2', 2)->nullable();
            $table->string('lp3', 2)->nullable();
            $table->string('lp4', 2)->nullable();
            $table->date('fex1')->nullable();
            $table->date('fex2')->nullable();
            $table->date('fex3')->nullable();
            $table->date('fex4')->nullable();
            $table->string('pe1', 8);
            $table->string('pe2', 8);
            $table->string('pe3', 8);
            $table->string('pe4', 8);
            $table->string('pe5', 8);
            $table->string('pe6', 8);
            $table->string('pe7', 8);
            $table->string('pe8', 8);
            $table->integer('dep');
            $table->string('dep_des', 50);
            $table->string('docente', 15);
            $table->string('foto_name', 250);
            $table->string('email_smtp', 50);
            $table->string('clave_email', 30);
            $table->string('host_smtp', 50);
            $table->integer('port');
            $table->string('host', 2);
            $table->integer('tipo_foro')->nullable()->default(0);
            $table->string('avatar', 20);
            $table->boolean('fechas')->default(false);
            $table->boolean('tri')->nullable();
            $table->string('pe9', 10);
            $table->string('pe10', 10);
            $table->string('pe11', 10);
            $table->string('pe12', 10);
            $table->string('pe13', 10);
            $table->string('pe14', 10);
            $table->string('pe15', 10);
            $table->string('pe16', 10);
            $table->string('cbarra', 150)->nullable();
        });
    }
};
