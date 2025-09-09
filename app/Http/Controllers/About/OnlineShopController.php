<?php

namespace App\Http\Controllers\About;

use App\Http\Controllers\Controller;
use App\Models\Information;
use App\Models\OnlineShop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OnlineShopController extends Controller
{

    public function publicIndex()
    {
        $shops = OnlineShop::latest()->get();
        $information = Information::latest()->get();

        return Inertia::render('about', [
            'shops' => $shops,
            'information' => $information,
    ]);
    }

    public function index()
    {
        $shops = OnlineShop::latest()->get();

        return Inertia::render('admin/online-shop', [
            'shops' => $shops,
        ]);
    }

    public function show(string $id)
    {
        $shop = OnlineShop::findOrFail($id);

        return Inertia::render('admin/online-shop-show', [
            'shop' => $shop,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'required|string',
            'url' => 'required|url|max:255',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('online_shops', 'public');
        }

        OnlineShop::create([
            'name' => $request->input('name'),
            'image' => $imagePath,
            'description' => $request->input('description'),
            'url' => $request->input('url'),
        ]);

        return redirect()->route('admin.online-shop.index')->with('success', 'Toko online berhasil dibuat.');
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'required|string',
            'url' => 'required|url|max:255',
        ]);

        $shop = OnlineShop::findOrFail($id);

        if ($request->hasFile('image')) {
            // delete old image
            if ($shop->image && Storage::disk('public')->exists($shop->image)) {
                Storage::disk('public')->delete($shop->image);
            }

            $imagePath = $request->file('image')->store('online_shops', 'public');
            $shop->image = $imagePath;
        }

        $shop->name = $request->input('name');
        $shop->description = $request->input('description');
        $shop->url = $request->input('url');
        $shop->save();

        return redirect()->route('admin.online-shop.index')->with('success', 'Toko online berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $shop = OnlineShop::findOrFail($id);

        if ($shop->image && Storage::disk('public')->exists($shop->image)) {
            Storage::disk('public')->delete($shop->image);
        }

        $shop->delete();

        return redirect()->route('admin.online-shop.index')->with('success', 'Toko online berhasil dihapus.');
    }
}
