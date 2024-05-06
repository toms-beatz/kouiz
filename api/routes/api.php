<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\KouizController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Routes publiques

Route::post('/register', [UserController::class, 'register']); // Route pour enregistrer un nouvel utilisateur.
Route::post('/login', [UserController::class, 'login']); // Route pour connecter un utilisateur existant.

// Routes protégées

Route::middleware('auth:sanctum')->group(function () {

    // Routes accessibles par le rôle 'user' et 'admin'

    Route::middleware(['role:user|role:admin'])->group(function () {
        // Route::prefix(`/user/`)->group(function () {
        //     Route::get('profile/{id}', [UserController::class, 'profile']); // Route pour afficher le profil d'un utilisateur.
        //     Route::put('profile/{id}', [UserController::class, 'updateProfile']); // Route pour mettre à jour le profil d'un utilisateur.
        //     Route::delete('profile/{id}', [UserController::class, 'delete']); // Route pour supprimer un utilisateur.
        //     Route::delete('profile/logout/{id}', [UserController::class, 'logout']); // Route pour déconnecter un utilisateur.
        //     Route::get('profile/{id}/kouiz', [KouizController::class, 'user__kouiz_index']); // Route pour afficher les kouiz d'un utilisateur.
        //     Route::get('/kouiz', [KouizController::class, 'auth_index']); // Route pour afficher les kouiz de l'utilisateur connecté.
        // });


        Route::prefix(`/kouiz`)->group(function () {
            Route::get('all', [KouizController::class, 'index']); // Route pour afficher tous les kouiz.
            Route::get('{kouiz}', [KouizController::class, 'show']); // Route pour afficher un kouiz spécifique.
            Route::post('/create', [KouizController::class, 'store']); // Route pour créer un nouveau kouiz.
            Route::put('edit/{kouiz}', [KouizController::class, 'update']); // Route pour mettre à jour un kouiz existant.
            Route::delete('delete/{kouiz}', [KouizController::class, 'delete']); // Route pour supprimer un kouiz.
        });
    });



    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [UserController::class, 'dashboard']); // Route pour afficher le tableau de bord de l'administrateur.
        Route::prefix('/admin/users')->group(function () {
            Route::get('all', [UserController::class, 'index']); // Route pour afficher tous les utilisateurs.
            Route::get('{id}', [UserController::class, 'show']); // Route pour afficher un utilisateur spécifique.
            Route::put('edit/{id}', [UserController::class, 'update']); // Route pour mettre à jour les informations d'un utilisateur.
            Route::delete('delete/{id}', [UserController::class, 'delete']); // Route pour supprimer un utilisateur.
        });
        Route::prefix('/admin/kouiz')->group(function () {
            Route::get('all', [KouizController::class, 'index']); // Route pour afficher tous les kouiz (pour les administrateurs).
            Route::get('{kouiz}', [KouizController::class, 'show']); // Route pour afficher un kouiz spécifique (pour les administrateurs).
            Route::post('create', [KouizController::class, 'store']); // Route pour créer un nouveau kouiz (pour les administrateurs).
            Route::put('edit/{kouiz}', [KouizController::class, 'update']); // Route pour mettre à jour un kouiz existant (pour les administrateurs).
            Route::delete('delete/{kouiz}', [KouizController::class, 'delete']); // Route pour supprimer un kouiz (pour les administrateurs).
        });
        Route::prefix('/admin/roles/')->group(function () {
            Route::get('all', [UserController::class, 'roles']); // Route pour afficher tous les rôles d'utilisateur.
            Route::get('{id}', [UserController::class, 'showRole']); // Route pour afficher un rôle spécifique.
            Route::post('assign/{id}', [UserController::class, 'assignRole']); // Route pour assigner un rôle à un utilisateur.
            Route::put('edit/{id}', [UserController::class, 'updateRole']); // Route pour mettre à jour un rôle d'utilisateur.
            Route::delete('delete/{id}', [UserController::class, 'deleteRole']); // Route pour supprimer un rôle d'utilisateur.
        });
        Route::prefix('/admin/permissions/')->group(function () {
            Route::get('all', [UserController::class, 'permissions']); // Route pour afficher toutes les permissions.
            Route::get('{id}', [UserController::class, 'showPermission']); // Route pour afficher une permission spécifique.
            Route::post('assign/{id}', [UserController::class, 'assignPermission']); // Route pour assigner une permission à un rôle.
            Route::put('edit/{id}', [UserController::class, 'updatePermission']); // Route pour mettre à jour une permission.
            Route::delete('delete/{id}', [UserController::class, 'deletePermission']); // Route pour supprimer une permission.
        });
    });
});




