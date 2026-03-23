<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\ImageTab;
use App\Models\Information;
use App\Models\OnlineShop;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::withCount('products')->latest()->get();
        $galleries = Gallery::latest()->get();
        $onlineShops = OnlineShop::latest()->get();
        $information = Information::latest()->get();
        $imageTabs = ImageTab::all();

        return Inertia::render('admin/dashboard', [
            'products' => $products,
            'categories' => $categories,
            'galleries' => $galleries,
            'onlineShops' => $onlineShops,
            'information' => $information,
            'imageTabs' => $imageTabs,
        ]);
    }
}
