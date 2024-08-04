<?php

namespace Database\Seeders;

use App\Models\Kouiz;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\OptionFactory;
use Illuminate\Database\Seeder;
use Database\Factories\KouizFactory;
use Database\Factories\QuestionFactory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        KouizFactory::new()->count(100)->create();
        QuestionFactory::new()->count(1024)->create();
        OptionFactory::new()->count(1024)->create();
    }
}