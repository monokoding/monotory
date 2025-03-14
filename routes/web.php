<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('categories', function () {
        return Inertia::render('categories');
    })->name('categories');

    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');

    Route::get('brands', function () {
        return Inertia::render('brands');
    })->name('brands');

    Route::get('suppliers', function () {
        return Inertia::render('suppliers');
    })->name('suppliers');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
