<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\ImageTab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function publicIndex()
    {
        $galleries = Gallery::with('galleryItems')->latest()->get();
        $aboutImage = ImageTab::where('category', 'Product and Gallery')->first();

        return Inertia::render('gallery', [
            'galleries' => $galleries,
            'aboutImage' => $aboutImage,
        ]);
    }

    public function show()
    {
        $galleries = Gallery::with('galleryItems')->latest()->get();

        return Inertia::render('admin/gallery', [
            'galleries' => $galleries,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov|max:10240',
            'description' => 'required|string|max:1000',
            'gallery_items' => 'present|array',
            'gallery_items.*.tag' => 'required|string|max:255',
        ]);

        // Ensure at least one file (image or video) is provided
        if (!$request->hasFile('image') && !$request->hasFile('video')) {
            return back()->withErrors(['file' => 'Anda harus mengupload setidaknya satu file (gambar atau video).']);
        }

        DB::transaction(function () use ($request, $validated, &$gallery) {
            $imagePath = null;
            $videoPath = null;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('galleries/images', 'public');
            }

            if ($request->hasFile('video')) {
                $videoPath = $request->file('video')->store('galleries/videos', 'public');
            }

            $gallery = Gallery::create([
                'title' => $validated['title'],
                'image' => $imagePath,
                'video' => $videoPath,
                'description' => $validated['description'],
            ]);

            if (!empty($validated['gallery_items'])) {
                foreach ($validated['gallery_items'] as $item) {
                    $gallery->galleryItems()->create([
                        'tag' => $item['tag'],
                    ]);
                }
            }
        });

        return redirect()->route('admin.gallery.show')->with('success', 'Galeri berhasil dibuat.');
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'video' => 'nullable|file|mimes:mp4,mov|max:10240',
            'description' => 'required|string|max:1000',
            'gallery_items' => 'present|array',
            'gallery_items.*.tag' => 'required|string|max:255',
            'gallery_items.*.id' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $validated, $gallery) {
            // Handle file uploads - if new file is uploaded, delete old one and clear the other type
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                    Storage::disk('public')->delete($gallery->image);
                }
                // Delete old video if exists (switching from video to image)
                if ($gallery->video && Storage::disk('public')->exists($gallery->video)) {
                    Storage::disk('public')->delete($gallery->video);
                }

                $imagePath = $request->file('image')->store('galleries/images', 'public');
                $gallery->image = $imagePath;
                $gallery->video = null; // Clear video when image is uploaded
            }

            if ($request->hasFile('video')) {
                // Delete old video if exists
                if ($gallery->video && Storage::disk('public')->exists($gallery->video)) {
                    Storage::disk('public')->delete($gallery->video);
                }
                // Delete old image if exists (switching from image to video)
                if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                    Storage::disk('public')->delete($gallery->image);
                }

                $videoPath = $request->file('video')->store('galleries/videos', 'public');
                $gallery->video = $videoPath;
                $gallery->image = null; // Clear image when video is uploaded
            }

            $gallery->title = $validated['title'];
            $gallery->description = $validated['description'];
            $gallery->save();

            // Handle gallery items
            if (!empty($validated['gallery_items'])) {
                // Get current item IDs from the request
                $submittedItemIds = collect($validated['gallery_items'])
                    ->pluck('id')
                    ->filter()
                    ->toArray();

                // Delete items that are not in the submitted list
                $gallery->galleryItems()
                    ->whereNotIn('id', $submittedItemIds)
                    ->delete();

                // Update or create items
                foreach ($validated['gallery_items'] as $item) {
                    if (isset($item['id']) && !empty($item['id'])) {
                        // Update existing item
                        $gallery->galleryItems()->updateOrCreate(
                            ['id' => $item['id']],
                            ['tag' => $item['tag']]
                        );
                    } else {
                        // Create new item
                        $gallery->galleryItems()->create([
                            'tag' => $item['tag'],
                        ]);
                    }
                }
            } else {
                // If no items submitted, delete all existing items
                $gallery->galleryItems()->delete();
            }
        });

        return redirect()->route('admin.gallery.show')->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(Gallery $gallery)
    {
        DB::transaction(function () use ($gallery) {
            if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                Storage::disk('public')->delete($gallery->image);
            }

            if ($gallery->video && Storage::disk('public')->exists($gallery->video)) {
                Storage::disk('public')->delete($gallery->video);
            }

            $gallery->delete();
        });

        return redirect()->route('admin.gallery.show')->with('success', 'Procedure tab and items deleted successfully.');
    }
}
