<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditUserRequest;
use App\Models\Kouiz;
use Hash;
use App\Http\Requests\RegisterUser;
use App\Http\Requests\LoginUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;



class UserController extends Controller
{
    public function register(RegisterUser $request)
    {
        try {
            $user = new User();
            $user->username = $request->username;
            $user->birthdate = $request->birthdate;
            $user->email = $request->email;
            $user->password = Hash::make($request->password, [
                'rounds' => 12
            ]);
            $user->assignRole('user');
            $user->save();
            return response()->json([
                'success' => true,
                'status_code' => 201,
                'message' => 'Utilisateur créé avec succès',
                'data' => $user,
            ], 201, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error_message' => $e->getMessage(),
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function login(LoginUser $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new \Exception('Mot de passe incorrect');
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'success' => true,
                'status_code' => 200,
                'message' => 'Connexion réussie',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                    'role' => $user->getRoleNames()->first() ?? 'user',
                ],
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 401,
                'error' => true,
                'message' => 'Mot de passe incorrect',
            ], 401, [], JSON_UNESCAPED_UNICODE);
        }
    }


    public function logout(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if ($request->user()->id == $user->id) {
                $request->user()->tokens()->delete();
                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'message' => 'Déconnexion réussie',
                ], 200, [], JSON_UNESCAPED_UNICODE);
            }
            else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Vous n\'êtes pas autorisé à vous déconnecter de ce profil',
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Une erreur est survenue lors de la déconnexion',
                'error_message' => $e->getMessage(),
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function profile(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if ($request->user()->id == $user->id) {
                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'data' => $user,
                ], 200, [], JSON_UNESCAPED_UNICODE);
            }
            else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Vous n\'êtes pas autorisé à voir ce profil',
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Une erreur est survenue lors de la récupération du profil',
                'error_message' => $e->getMessage(),
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function updateProfile(EditUserRequest $request, $id)
{
    try {
        // Récupérer l'utilisateur à mettre à jour
        $user = User::findOrFail($id);
        
        // Vérifier si l'utilisateur authentifié peut mettre à jour ce profil
        if ($request->user()->id != $user->id) {
            return response()->json([
                'success' => false,
                'status_code' => 401,
                'error' => true,
                'message' => 'Vous n\'êtes pas autorisé à modifier ce profil',
            ], 401, [], JSON_UNESCAPED_UNICODE);
        }

        // Mettre à jour les champs du profil si les données sont fournies dans la requête
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password, [
                'rounds' => 12
            ]);
        }

        // Enregistrer les modifications dans la base de données
        $user->save();

        // Retourner une réponse JSON indiquant que le profil a été mis à jour avec succès
        return response()->json([
            'success' => true,
            'status_code' => 200,
            'message' => 'Profil mis à jour',
            'data' => $user,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    } catch (\Exception $e) {
        // Gérer les erreurs et retourner une réponse JSON avec un message d'erreur
        return response()->json([
            'success' => false,
            'status_code' => 500,
            'error' => true,
            'message' => 'Une erreur est survenue lors de la mise à jour du profil',
            'error_message' => $e->getMessage(),
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }
}


    public function delete(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if ($request->user()->id == $user->id) {
                $user->delete();
                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'message' => 'Profil supprimé',
                ], 200, [], JSON_UNESCAPED_UNICODE);
            }
            else {
                return response()->json([
                    'success' => false,
                    'status_code' => 401,
                    'error' => true,
                    'message' => 'Vous n\'êtes pas autorisé à supprimer ce profil',
                ], 401, [], JSON_UNESCAPED_UNICODE);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Une erreur est survenue lors de la suppression du profil',
                'error_message' => $e->getMessage(),
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function index()
    {
        $query = User::query();
        $perPage = 9;
        $users = $query->paginate($perPage);

        $users->each(function ($user) {
            $user->role = $user->getRoleNames()->first() ?? 'user';
        });

        return response()->json([
            'success' => true,
            'status_code' => 200,
            'data' => $users,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }


    public function dashboard() {
        $kouiz_count = Kouiz::count();
        $user_count = User::count();
        $username = Auth::user()->username;
        return response()->json([
            'success' => true,
            'status_code' => 200,
            'data' => [
                'kouiz_count' => $kouiz_count,
                'user_count' => $user_count,
                'username' => $username,
            ],
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }
}
