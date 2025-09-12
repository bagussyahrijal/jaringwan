<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ImageTab;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function publicIndex()
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::all();
        $aboutImage = ImageTab::where('category', 'Product and Gallery')->first();

        return Inertia::render('product', [
            'products' => $products,
            'categories' => $categories,
            'aboutImage' => $aboutImage,
        ]);
    }

    public function index() 
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::all();
    
        return Inertia::render('admin/product', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);

        return Inertia::render('admin/product-show', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $image = $request->file('image');
        $imagePath = $image->store('products', 'public');

        $data = $request->all();
        $data['image'] = $imagePath;
        
        Product::create($data);

        return redirect()->route('admin.product.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, string $id) 
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            Storage::disk ('public')->delete($product->image);

            $image = $request->file('image');
            $imagePath = $image->store('products', 'public');
            $product->update([
                'category_id' => $request->input('category_id'),
                'image' => $imagePath,
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'stock' => $request->input('stock'),
            ]);
        } else {
            $product->update([
                'category_id' => $request->input('category_id'),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'stock' => $request->input('stock'),
            ]);
        }

        return redirect()->route('admin.product.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        Storage::disk('public')->delete($product->image);
        $product->delete();

        return redirect()->route('admin.product.index')->with('success', 'Product deleted successfully.');
    }

    public function adminDashboard()
    {
        return Inertia::render('admin/dashboard');
    }
}
