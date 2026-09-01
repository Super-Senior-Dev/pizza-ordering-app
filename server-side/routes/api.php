<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PizzaController as AdminPizzaController;
use App\Http\Controllers\PizzaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');


Route::patch('/orders/{order}/cancel',[OrderController::class,'cancel'])->middleware('auth:sanctum');

Route::apiResource('orders',OrderController::class)->only(['index', 'store', 'show'])->middleware('auth:sanctum');

Route::apiResource('pizzas',PizzaController::class)->only(['index','show']);


//admin routes

Route::middleware(['auth:sanctum','admin'])->prefix('admin')->group(function (){
    Route::get('/orders',[AdminOrderController::class,'index']);
    Route::get('/orders/{order}',[AdminOrderController::class,'show']);
    Route::patch('/orders/{order}',[AdminOrderController::class,'update']);

    Route::get('/dashboard',[AdminDashboardController::class,'index']);

    Route::apiResource('pizzas',AdminPizzaController::class);
});
