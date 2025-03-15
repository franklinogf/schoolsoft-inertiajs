<?php

use App\Console\Commands\DeleteTempUploadedFiles;

Schedule::command('telescope:prune --hours=48')->description('Delete entries from telescope tables daily')->daily();

Schedule::command(DeleteTempUploadedFiles::class)->hourly();

Schedule::command('queue:work --stop-when-empty --tries=3 --timeout=90')->everyMinute();
