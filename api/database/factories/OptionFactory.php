<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Option>
 */
class OptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $questions = Question::all()->pluck('id')->toArray();
        return [
            'text' => $this->faker->sentence(),
            'is_correct' => $this->faker->boolean(),
            'question_id' => $this->faker->randomElement($questions),
        ];
    }
}
