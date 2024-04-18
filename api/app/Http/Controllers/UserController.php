<?php

namespace App\Http\Controllers;

use Hash;
use App\Http\Requests\RegisterUser;
use App\Http\Requests\LoginUser;
use App\Models\User;
use Illuminate\Http\Request;

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


    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'success' => true,
                'status_code' => 200,
                'message' => 'Déconnexion réussie',
            ], 200, [], JSON_UNESCAPED_UNICODE);
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

    public function profile(Request $request)
    {
        try {
            return response()->json([
                'success' => true,
                'status_code' => 200,
                'data' => $request->user(),
            ], 200, [], JSON_UNESCAPED_UNICODE);
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

    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            $user->email = $request->email;
            $user->save();
            return response()->json([
                'success' => true,
                'status_code' => 200,
                'message' => 'Profil mis à jour',
                'data' => $user,
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'status_code' => 500,
                'error' => true,
                'message' => 'Une erreur est survenue lors de la mise à jour du profil',
                'error_message' => $e->getMessage(),
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }
    }

    public function delete($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'status_code' => 404,
                'message' => 'Utilisateur non trouvé',
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        $currentUser = auth()->user();

        if ($currentUser->id != $user->id && $currentUser->role != 'superadmin') {
            return response()->json([
                'success' => false,
                'status_code' => 403,
                'message' => 'Non autorisé',
            ], 403, [], JSON_UNESCAPED_UNICODE);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'status_code' => 200,
            'message' => 'Utilisateur supprimé',
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function index()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'status_code' => 200,
            'data' => $users,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }
}
