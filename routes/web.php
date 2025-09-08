<?php

use App\Http\Controllers\Gallery\GalleryController;
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
Route::get('product', [ProductController::class, 'publicIndex'])->name('product');
Route::get('gallery', [GalleryController::class, 'publicIndex'])->name('gallery');
Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::middleware(['auth', 'verified'])->group(function () {});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function() {
    Route::redirect('/', '/admin/dashboard');
    Route::get('/dashboard', [ProductController::class, 'adminDashboard'])->name('admin.dashboard');

    //Admin Product Routes
    Route::get('/product', [ProductController::class, 'index'])->name('admin.product.index');
    Route::post('/product', [ProductController::class, 'store'])->name('admin.product.store');
    Route::post('/product/{id}', [ProductController::class, 'update'])->name('admin.product.update');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('admin.product.destroy');

    //Admin Category Routes
    Route::get('/category', [CategoryController::class, 'index'])->name('admin.category.index');
    Route::post('/category', [CategoryController::class, 'store'])->name('admin.category.store');
    Route::post('/category/{id}', [CategoryController::class, 'update'])->name('admin.category.update');
    Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('admin.category.destroy');

    //Admin Gallery Routes
    Route::get('/gallery', [GalleryController::class, 'show'])->name('admin.gallery.show');
    Route::post('/gallery', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::post('/gallery/{gallery}', [GalleryController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{gallery}', [GalleryController::class, 'destroy'])->name('admin.gallery.destroy');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
