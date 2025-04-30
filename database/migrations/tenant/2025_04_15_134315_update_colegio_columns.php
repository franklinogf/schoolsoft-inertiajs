<?php

declare(strict_types=1);

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
        'ufecha',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $emptyColumns = [];
        $indexes = Schema::getIndexes('colegio');
        foreach ($this->datesColumns as $column) {
            if (Schema::hasColumn('colegio', $column)) {
                $results = DB::table('colegio')->select([$column, 'usuario'])->get();
                foreach ($results as $result) {
                    if ($result->{$column} === '0000-00-00' || $result->{$column} === '') {
                        $emptyColumns[$result->usuario] = $column;
                        DB::table('colegio')->where('usuario', $result->usuario)->update([$column => now()->format('Y-m-d')]);
                    }
                }

            }
        }

        Schema::table('colegio', function (Blueprint $table) use ($indexes): void {

            foreach ($indexes as $index) {
                if ($index['primary'] === true) {
                    $table->integer($index['columns'][0])->change();
                    $table->dropPrimary($index['name']);

                    continue;
                }
                $table->dropIndex($index['name']);
            }
            $table->string('usuario')->unique()->change();
            $table->id()->primary()->change();
            foreach ($this->datesColumns as $column) {
                if (Schema::hasColumn('colegio', $column)) {
                    $table->date($column)->nullable()->change();
                } else {
                    $table->date($column)->nullable();
                }
            }
        });

        foreach ($emptyColumns as $user => $column) {
            DB::table('colegio')->where('usuario', $user)->update([$column => null]);
        }

    }
};
