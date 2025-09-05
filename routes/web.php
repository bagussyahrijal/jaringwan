<?php

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
