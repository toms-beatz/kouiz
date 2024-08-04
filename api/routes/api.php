<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\KouizController;
use App\Http\Controllers\API\UserAnswersController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/kouiz/all', [KouizController::class, 'auth_index']);
    Route::post('/kouiz/create', [KouizController::class, 'store']);
    Route::get('/kouiz/{kouiz}', [KouizController::class, 'show']);
    Route::put('/kouiz/edit/{kouiz}', [KouizController::class, 'update']);
    Route::delete('/kouiz/{kouiz}', [KouizController::class, 'delete']);
    Route::get('/kouiz/list/all', [KouizController::class, 'index']);



    
    Route::get('/kouiz/idList', [KouizController::class, 'idList']);
    Route::get('/dashboard', [UserController::class, 'userDashboard']);
    Route::get('/user/profile/{id}', [UserController::class, 'profile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::delete('/profile', [UserController::class, 'delete']);
    Route::get('/answers/all', [UserAnswersController::class, 'auth_index']);
    Route::post('/answers/create', [UserAnswersController::class, 'store']);
    Route::get('/answers/my-kouiz-answers', [UserAnswersController::class, 'answers_to_my_kouiz']);
    Route::get('/answers/{id}', [UserAnswersController::class, 'show']);

    // Route::middleware(['role:user|admin'])->group(function () {
    //     Route::prefix('/kouiz')->group(function () {
    //         Route::get('/all', [KouizController::class, 'index']);
    //         Route::get('/{kouiz}', [KouizController::class, 'show']);
    //         Route::post('/create', [KouizController::class, 'store']);
    //         Route::put('/edit/{kouiz}', [KouizController::class, 'update']);
    //         Route::delete('/delete/{kouiz}', [KouizController::class, 'delete']);
    //     });
    // });

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [UserController::class, 'dashboard']);
        Route::prefix('/admin/users')->group(function () {
            Route::get('/all', [UserController::class, 'index']);
            Route::get('/{id}', [UserController::class, 'show']);
            Route::put('/edit/{id}', [UserController::class, 'update']);
            Route::delete('/delete/{id}', [UserController::class, 'delete']);
        });
        Route::prefix('/admin/kouiz')->group(function () {
            Route::get('/all', [KouizController::class, 'index']);
            Route::get('/{kouiz}', [KouizController::class, 'show']);
            Route::post('/create', [KouizController::class, 'store']);
            Route::put('/edit/{kouiz}', [KouizController::class, 'update']);
            Route::delete('/delete/{kouiz}', [KouizController::class, 'delete']);
        });
        Route::prefix('/admin/roles')->group(function () {
            Route::get('/all', [UserController::class, 'roles']);
            Route::get('/{id}', [UserController::class, 'showRole']);
            Route::post('/assign/{id}', [UserController::class, 'assignRole']);
            Route::put('/edit/{id}', [UserController::class, 'updateRole']);
            Route::delete('/delete/{id}', [UserController::class, 'deleteRole']);
        });
        Route::prefix('/admin/permissions')->group(function () {
            Route::get('/all', [UserController::class, 'permissions']);
            Route::get('/{id}', [UserController::class, 'showPermission']);
            Route::post('/assign/{id}', [UserController::class, 'assignPermission']);
            Route::put('/edit/{id}', [UserController::class, 'updatePermission']);
            Route::delete('/delete/{id}', [UserController::class, 'deletePermission']);
        });
    });
});
