<?php

namespace Database\Factories;

use App\Models\Kouiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kouiz = Kouiz::all()->pluck('id')->toArray();
        return [
            'text' => $this->faker->sentence(),
            'kouiz_id' => $this->faker->randomElement($kouiz),
        ];
    }
}
