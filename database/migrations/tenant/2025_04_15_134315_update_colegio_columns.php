<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $datesColumns = [
        'ft1',
        'ft2',
        'ft3',
        'ft4',
        'ft5',
        'ft6',
        'ft7',
        'ft8',
        'asis1',
        'asis2',
        'asis3',
        'asis4',
        'asis5',
        'asis6',
        'asis7',
        'asis8',
        'fechav1',
        'fechav2',
        'fec_t',
        'fecha7',
    ];
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('colegio')->update(collect($this->datesColumns)->mapWithKeys(
            fn($column) => [$column => now()->format('Y-m-d')]
        )->toArray());

        Schema::table('colegio', function (Blueprint $table) {
            $table->dropIndex('id');
            $table->id()->primary()->change();


            foreach ($this->datesColumns as $column) {
                if (Schema::hasColumn('colegio', $column)) {
                    $table->date($column)->nullable()->change();
                }
            }
        });

        DB::table('colegio')->update(collect($this->datesColumns)->mapWithKeys(
            fn($column) => [$column => null]
        )->toArray());
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('colegio', function (Blueprint $table) {
            $table->char('id',7)->unique()->change();

            foreach ($this->datesColumns as $column) {
                if (Schema::hasColumn('colegio', $column)) {
                    $table->date($column)->change();
                }
            }

        });
    }
};
