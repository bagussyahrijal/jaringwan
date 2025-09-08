<?php

namespace App\Http\Controllers\About;

use App\Http\Controllers\Controller;
use App\Models\Information;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
    public function index()
    {
        $information = Information::latest()->get();
        return Inertia::render('admin/information', [
            'information' => $information,
        ]);
    }

    public function store(Request $request)
    {
        if (Information::count() >= 1) {
        return redirect()->back()->with('error', 'Hanya boleh ada satu data informasi.');
    }
        $request->validate([
            'title' => 'required|string|max:255',
            'header' => 'required|string|max:255',
            'subheader' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Information::create($request->only(['title', 'header', 'subheader', 'content']));

        return redirect()->route('admin.information.index')->with('success', 'Informasi berhasil ditambahkan.');
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'header' => 'required|string|max:255',
            'subheader' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $information = Information::findOrFail($id);
        $information->update($request->only(['title', 'header', 'subheader', 'content']));

        return redirect()->route('admin.information.index')->with('success', 'Informasi berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $information = Information::findOrFail($id);
        $information->delete();
        return redirect()->route('admin.information.index')->with('success', 'Informasi berhasil dihapus.');
    }
}
