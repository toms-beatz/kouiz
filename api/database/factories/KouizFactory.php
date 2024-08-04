<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kouiz>
 */
class KouizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::all()->pluck('id')->toArray();
        return [
            'emoji' => fake()->emoji(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'creator_id'=> $this->faker->randomElement($user)
        ];
    }
}
