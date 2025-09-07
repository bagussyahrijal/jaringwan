<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'auditor']);
        Role::create(['name' => 'teacher']);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ])->assignRole('admin');

        User::factory()->create([
            'name' => 'Auditor',
            'email' => 'auditor@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ])->assignRole('auditor');

        User::factory()->create([
            'name' => 'Teacher',
            'email' => 'teacher@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ])->assignRole('teacher');
    }
}
