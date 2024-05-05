<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateKouizRequest;
use App\Models\Kouiz;
use App\Models\UserAnswers;
use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Option;
use Illuminate\Support\Facades\DB;


class KouizController extends Controller
{
    public function index()
    {
        try {

            $query = Kouiz::query();
            $perPage = 9;
            $kouiz = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'status_code' => 200,
                'message' => 'Liste des Kouiz',
                'data' => $kouiz
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la récupération des Kouiz',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }


    public function auth_index()
    {
        try {
            // Récupérer l'utilisateur connecté
            $user = Auth::user();

            // Vérifier si l'utilisateur est authentifié
            if ($user) {
                // Récupérer les Kouiz de l'utilisateur connecté
                $kouiz = $user->kouiz()->paginate(9);

                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'message' => 'Liste des Kouiz de ' . $user->username,
                    'data' => $kouiz
                ], 200, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Utilisateur non authentifié',
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la récupération des Kouiz de l\'utilisateur connecté',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function store(CreateKouizRequest $request)
    {
        try {
            // Récupérer l'utilisateur connecté
            $user = Auth::user();

            // Créer le kouiz
            $kouiz = new Kouiz();
            $kouiz->title = $request->title;
            $kouiz->description = $request->description;
            $kouiz->emoji = $request->emoji;
            $kouiz->creator_id = $user->id;
            $kouiz->save();

            // Créer les questions et les options
            foreach ($request->questions as $questionData) {
                $question = new Question();
                $question->text = $questionData['text'];
                $question->kouiz_id = $kouiz->id;
                $question->save();

                foreach ($questionData['options'] as $optionData) {
                    $option = new Option();
                    $option->text = $optionData['text'];
                    $option->question_id = $question->id;
                    $option->save();
                }
            }

            return response()->json([
                'success' => true,
                'status_code' => 201,
                'message' => 'Kouiz créé avec succès',
                'data' => $kouiz
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la création du Kouiz',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }



    public function update(CreateKouizRequest $request, Kouiz $kouiz)
    {
        try {
            if ($kouiz) {
                $kouiz->title = $request->title;
                $kouiz->description = $request->description;
                $kouiz->emoji = $request->emoji;
                if ($kouiz->creator_id == Auth::id()) {
                    $kouiz->save();
                    return response()->json([
                        'success' => true,
                        'status_code' => 200,
                        'message' => 'Kouiz modifié avec succès',
                        'data' => $kouiz
                    ], 200, [], JSON_UNESCAPED_UNICODE);
                } else {
                    return response()->json([
                        'success' => false,
                        'status_code' => 401,
                        'error' => true,
                        'message' => 'Vous n\'êtes pas autorisé à modifier ce Kouiz',
                    ], 401, [], JSON_UNESCAPED_UNICODE);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 404,
                    'error' => true,
                    'message' => 'Kouiz non trouvé',
                ], 404, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la modification du Kouiz',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function delete(Kouiz $kouiz)
    {
        try {
            if ($kouiz) {
                if ($kouiz->creator_id == Auth::id()) {
                    $kouiz->delete();
                    return response()->json([
                        'success' => true,
                        'status_code' => 200,
                        'message' => 'Kouiz supprimé avec succès',
                    ], 200, [], JSON_UNESCAPED_UNICODE);
                } else {
                    return response()->json([
                        'success' => false,
                        'status_code' => 401,
                        'error' => true,
                        'message' => 'Vous n\'êtes pas autorisé à supprimer ce Kouiz',
                    ], 401, [], JSON_UNESCAPED_UNICODE);
                }

            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 404,
                    'error' => true,
                    'message' => 'Kouiz non trouvé',
                ], 404, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la suppression du Kouiz',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function show(Kouiz $kouiz)
    {
        try {
            if ($kouiz) {
                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'message' => 'Détails du Kouiz',
                    'data' => $kouiz
                ], 200, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json([
                    'success' => false,
                    'status_code' => 404,
                    'error' => true,
                    'message' => 'Kouiz non trouvé',
                ], 404, [], JSON_UNESCAPED_UNICODE);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Erreur lors de la récupération du Kouiz',
                'error_message' => $e->getMessage()
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }
}