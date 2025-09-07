<?php

use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');
Route::get('about', function () {
    return Inertia::render('about');
})->name('about');
Route::get('product', function () {
    return Inertia::render('product');
})->name('product');
Route::get('gallery', function () {
    return Inertia::render('gallery');
})->name('gallery');
Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::middleware(['auth', 'verified'])->group(function () {});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function() {
    Route::redirect('/', '/admin/dashboard');
    Route::get('/dashboard', [ProductController::class, 'adminDashboard'])->name('admin.dashboard');

    //Admin Product Routes
    Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store');
    Route::put('/product/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

    //Admin Category Routes
    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::put('/category/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
