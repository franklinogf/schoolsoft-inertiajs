<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $school = School::create([
            'name' => 'Test School',
            'email' => 'test@test.com',
        ]);

        $school->run(function (): void {
            User::factory()->create([
                'name' => 'Test School Admin',
                'email' => 'test@test.com',
            ]);
        });
    }
}
