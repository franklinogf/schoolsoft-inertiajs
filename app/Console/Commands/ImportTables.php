<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;

final class ImportTables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev:import-tables {tables*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dev only: Import tables from the database';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $tables = $this->argument('tables');
        $tables = implode(', ', $tables);
        $result = $this->call('migrate:generate', [
            '--tables' => $tables,
            '--connection' => 'demo',
            '--path' => 'database/migrations/tenant',
        ]);

        if ($result !== 0) {
            $this->error('Failed to import tables.');

            return;
        }
        // Process the tables...

        $this->info('Tables imported successfully.');
    }
}
