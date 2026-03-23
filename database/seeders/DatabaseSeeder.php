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

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'jaringwan1@gmail.com',
            'password' => bcrypt('admin'),
            'email_verified_at' => now(),
        ])->assignRole('admin');
    }
}
