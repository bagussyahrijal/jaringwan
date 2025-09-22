<?php

use App\Http\Controllers\About\InformationController;
use App\Http\Controllers\About\OnlineShopController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Gallery\GalleryController;
use App\Http\Controllers\ImageTabController;
use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ImageTabController::class, 'homeIndex'])->name('home');

Route::get('dashboard', [ImageTabController::class, 'dashboardIndex'])->name('dashboard');

Route::get('about', [OnlineShopController::class, 'publicIndex'])->name('about');

Route::get('product', [ProductController::class, 'publicIndex'])->name('product');

Route::get('gallery', [GalleryController::class, 'publicIndex'])->name('gallery');

Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::middleware(['auth', 'verified'])->group(function () {});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function() {
    Route::redirect('/', '/admin/dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

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

    //Admin Online Shop Routes
    Route::get('/online-shop', [OnlineShopController::class, 'index'])->name('admin.online-shop.index');
    Route::post('/online-shop', [OnlineShopController::class, 'store'])->name('admin.online-shop.store');
    Route::post('/online-shop/{id}', [OnlineShopController::class, 'update'])->name('admin.online-shop.update');
    Route::delete('/online-shop/{id}', [OnlineShopController::class, 'destroy'])->name('admin.online-shop.destroy');

    //Admin Information Routes
    Route::get('/information', [InformationController::class, 'index'])->name('admin.information.index');
    Route::post('/information', [InformationController::class, 'store'])->name('admin.information.store');
    Route::post('/information/{id}', [InformationController::class, 'update'])->name('admin.information.update');
    Route::delete('/information/{id}', [InformationController::class, 'destroy'])->name('admin.information.destroy');

    //Admin Image Tab Routes
    Route::get('/image-tab', [ImageTabController::class, 'index'])->name('admin.image-tab.index');
    Route::get('/image-tab/{id}', [ImageTabController::class, 'homeShow'])->name('admin.image-tab.show');
    Route::post('/image-tab', [ImageTabController::class, 'store'])->name('admin.image-tab.store');
    Route::post('/image-tab/{id}', [ImageTabController::class, 'update'])->name('admin.image-tab.update');
    Route::delete('/image-tab/{id}', [ImageTabController::class, 'destroy'])->name('admin.image-tab.destroy');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
