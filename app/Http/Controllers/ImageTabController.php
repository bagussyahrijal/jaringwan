<?php

namespace App\Http\Controllers;

use App\Models\ImageTab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class ImageTabController extends Controller
{

    public function index()
    {
        $imageTabs = ImageTab::all();
        return Inertia::render('admin/image-tab', [
            'imageTabs' => $imageTabs,
        ]);
    }

    public function show($id)
    {
        $imageTab = ImageTab::findOrFail($id);
        return response()->json($imageTab);
    }

    public function homeIndex()
    {
        $homeImage = ImageTab::where('category', 'Home and About')->first();
        return Inertia::render('welcome', [
            'homeImage' => $homeImage,
        ]);
    }

    public function dashboardIndex()
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::all();
        $aboutImage = ImageTab::where('category', 'Product and Gallery')->first();

        return Inertia::render('dashboard', [
            'products' => $products,
            'categories' => $categories,
            'aboutImage' => $aboutImage,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Check if category already exists
        $existingImageTab = ImageTab::where('category', $validated['category'])->first();
        if ($existingImageTab) {
            return redirect()->route('admin.image-tab.index')->with('error', 'Kategori ' . $validated['category'] . ' sudah ada. Hanya boleh ada satu data untuk setiap kategori.');
        }

        $categoryFolder = strtolower(str_replace(' ', '_', $validated['category']));
        $uploadedImage = $request->file('image');
        $path = $request->file('image')->store("image-tab/{$categoryFolder}", 'public');

        $imageTab = ImageTab::Create([
            'category' => $validated['category'],
            'image' => $path,
        ]);

        return redirect()->route('admin.image-tab.index')->with('success', 'Banner ' . $validated['category'] . ' berhasil ditambahkan.');
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imageTab = ImageTab::findOrFail($id);
        $newImagePath = $imageTab->image;

        if ($request->hasFile('image')) {
            // Hapus file lama jika ada
            if ($imageTab->image && Storage::disk('public')->exists($imageTab->image)) {
                Storage::disk('public')->delete($imageTab->image);
            }
            $categoryFolder = strtolower(str_replace(' ', '_', $validated['category']));
            $uploadedImage = $request->file('image');
            $newImagePath = $uploadedImage->store("image-tab/{$categoryFolder}", 'public');
        }

        $imageTab->update([
            'category' => $validated['category'],
            'image' => $newImagePath,
        ]);

        return redirect()->route('admin.image-tab.index')->with('success', 'Banner ' . $validated['category'] . ' berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $imageTab = ImageTab::findOrFail($id);

        if ($imageTab->image) {
            Storage::disk('public')->delete($imageTab->image);
        }

        $imageTab->delete();

        return redirect()->route('admin.image-tab.index')->with('success', 'Banner ' . $imageTab->category . ' berhasil dihapus.');
    }
}
