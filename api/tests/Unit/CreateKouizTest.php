<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Kouiz;
use App\Models\Question;
use App\Models\Option;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateKouizTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_quiz()
    {
        $user = User::factory()->create([
            'username' => 'toms412',
            'email' => 't.mzeu@gmail.com',
        ]);
        echo "Utilisateur créé: " . $user->username . "\n";

        $this->actingAs($user);
        echo "Utilisateur authentifié: " . $user->username . "\n";

        $quizData = [
            'title' => 'Test de Connaissances Générales',
            'description' => 'Testez votre culture générale grâce à ce kouiz.',
            'emoji' => '🧠',
        ];
        echo "Données du quiz préparées\n";

        $questions = [
            [
                'text' => 'Quelle est la capitale de la France ?',
                'options' => [
                    ['text' => 'Paris', 'is_correct' => true],
                    ['text' => 'Londres', 'is_correct' => false],
                    ['text' => 'Berlin', 'is_correct' => false],
                ],
            ],
            [
                'text' => 'Quelle est la couleur du ciel par temps clair ?',
                'options' => [
                    ['text' => 'Bleu', 'is_correct' => true],
                    ['text' => 'Vert', 'is_correct' => false],
                    ['text' => 'Rouge', 'is_correct' => false],
                ],
            ],
        ];
        echo "Données des questions préparées\n";

        $response = $this->post('api/kouiz/create', array_merge($quizData, ['questions' => $questions]));
        echo "Réponse de création du quiz reçue\n";

        $response->assertStatus(201);
        echo "Assertion de création du quiz réussie\n";

        $this->assertDatabaseHas('kouiz', [
            'title' => $quizData['title'],
            'description' => $quizData['description'],
            'emoji' => $quizData['emoji'],
        ]);
        echo "Assertion de la présence du quiz dans la base de données réussie\n";

        foreach ($questions as $questionData) {
            $this->assertDatabaseHas('questions', ['text' => $questionData['text']]);
            echo "Assertion de la présence de la question dans la base de données réussie pour: " . $questionData['text'] . "\n";

            $question = Question::where('text', $questionData['text'])->first();
            foreach ($questionData['options'] as $optionData) {
                $this->assertDatabaseHas('options', [
                    'question_id' => $question->id,
                    'text' => $optionData['text'],
                    'is_correct' => $optionData['is_correct'],
                ]);
                echo "Assertion de la présence de l'option dans la base de données réussie pour: " . $optionData['text'] . " avec is_correct: " . ($optionData['is_correct'] ? 'true' : 'false') . "\n";
            }
        }
    }
}
