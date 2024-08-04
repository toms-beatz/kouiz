<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateKouizRequest;
use App\Models\Kouiz;
use App\Models\UserAnswers;
use App\Models\UserAnswerDetail;
use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Option;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class UserAnswersController extends Controller
{

    //voir les réponses d'un user
    public function auth_index()
    {
        try {
            // Récupérer l'utilisateur connecté
            $user = Auth::user();

            if ($user) {
                // Récupérer les réponses de l'utilisateur connecté
                $userAnswers = UserAnswers::where('user_id', $user->id)->get();
                $userAnswers->load('details.question', 'details.option');

                if ($userAnswers->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'status_code' => 404,
                        'error' => true,
                        'message' => 'Aucune réponse trouvée. Vous n\'avez pas encore répondu à un kouiz.'
                    ], 404, [], JSON_UNESCAPED_UNICODE);
                } else {
                    $totalCorrectAnswers = 0;

                    foreach ($userAnswers as $userAnswer) {
                        $correctAnswersCount = 0;
                        foreach ($userAnswer->details as $detail) {
                            if ($detail->option && $detail->option->is_correct == 1) {
                                $correctAnswersCount++;
                            }
                        }
                        $userAnswer->nombre_bonnes_reponses = $correctAnswersCount;
                        $userAnswer->nombre_mauvaises_reponses = $userAnswer->details->count() - $correctAnswersCount;
                        $totalCorrectAnswers += $correctAnswersCount;
                        $userAnswer->kouiz = Kouiz::find($userAnswer->kouiz_id);
                        $userAnswer->nombre_question_total = $userAnswer->kouiz->questions->count();
                        $userAnswer->score = $totalCorrectAnswers . " / " . $userAnswer->nombre_question_total;

                        foreach ($userAnswer->kouiz->questions as $question) {
                            $question->options = Option::where('question_id', $question->id)->get();
                        }
                    }

                    return response()->json([
                        'success' => true,
                        'status_code' => 200,
                        'message' => 'Réponses récupérées avec succès',
                        'data' => $userAnswers
                    ], 200, [], JSON_UNESCAPED_UNICODE);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Utilisateur non authentifié'
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la récupération des réponses',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    //repondre à un kouiz
    public function store(Request $request)
    {
        try {
            // Récupérer l'utilisateur connecté
            $user = Auth::user();

            if ($user) {
                // Récupérer les données de la requête
                $data = $request->all();

                // Créer un nouvel enregistrement de réponses utilisateur
                $userAnswers = new UserAnswers();
                $userAnswers->user_id = $user->id;
                $userAnswers->kouiz_id = $data['kouiz_id'];
                $userAnswers->save();

                // Créer un nouvel enregistrement de détails de réponses utilisateur
                foreach ($data['answers'] as $answer) {
                    $userAnswerDetail = new UserAnswerDetail();
                    $userAnswerDetail->user_answer_id = $userAnswers->id;
                    $userAnswerDetail->question_id = $answer['question_id'];
                    $userAnswerDetail->option_id = $answer['option_id'];
                    $userAnswerDetail->save();
                }

                return response()->json([
                    'success' => true,
                    'status_code' => 201,
                    "réponse" => $userAnswers,
                    "détails" => $userAnswers->details,
                    'message' => 'Réponses enregistrées avec succès'
                ], 201, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Utilisateur non authentifié'
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de l\'enregistrement des réponses',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    //vor les reponses à ses kouiz
    public function answers_to_my_kouiz()
    {
        try {
            $user = Auth::user();

            // Récupérer tous les kouiz créés par l'utilisateur
            $userKouizzes = Kouiz::where('creator_id', $user->id)->get();

            // Initialiser un tableau pour stocker les réponses aux kouiz
            $answers = [];
            function paginateCollection($items, $perPage = 15, $page = null, $options = [])
            {
                $page = $page ?: (LengthAwarePaginator::resolveCurrentPage() ?: 1);
                $items = $items instanceof Collection ? $items : Collection::make($items);
                return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
            }

            // Parcourir tous les kouiz de l'utilisateur
            foreach ($userKouizzes as $kouiz) {
                // Récupérer les réponses aux questions pour chaque kouiz
                $userAnswers = UserAnswers::where('kouiz_id', $kouiz->id)->get();
                $totalCorrectAnswers = 0;

                foreach ($userAnswers as $userAnswer) {
                    $correctAnswersCount = 0;
                    foreach ($userAnswer->details as $detail) {
                        if ($detail->option && $detail->option->is_correct == 1) {
                            $correctAnswersCount++;
                        }
                    }
                    $userAnswer->nombre_bonnes_reponses = $correctAnswersCount;
                    $userAnswer->nombre_mauvaises_reponses = $userAnswer->details->count() - $correctAnswersCount;
                    $totalCorrectAnswers += $correctAnswersCount;
                    $userAnswer->kouiz = Kouiz::find($userAnswer->kouiz_id);
                    $userAnswer->nombre_question_total = $userAnswer->kouiz->questions->count();
                    $userAnswer->score = $totalCorrectAnswers . " / " . $userAnswer->nombre_question_total;

                    foreach ($userAnswer->kouiz->questions as $question) {
                        $question->options = Option::where('question_id', $question->id)->get();
                    }
                }

                // Ajouter les réponses au tableau $answers
                $answers[$kouiz->id] = $userAnswers;
                if ($answers[$kouiz->id]->isEmpty()) {
                    unset($answers[array_search($answers[$kouiz->id], $answers)]);
                }
                
            }
            $answers = paginateCollection(collect($answers), 9);

            // return response()->json(['answers' => $answers], 200);
            return response()->json([
                'success' => true,
                'status_code' => 200,
                'message' => 'Réponses récupérées avec succès',
                'data' => $answers
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la récupération des réponses',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }
}
