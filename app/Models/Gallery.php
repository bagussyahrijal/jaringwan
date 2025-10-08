<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    protected $appends = ['image_url'];

    public function galleryItems()
    {
        return $this->hasMany(GalleryItem::class);
    }

    protected function imageUrl(): Attribute // <-- Buat fungsi accessor ini
    {
        return Attribute::make(
            get: fn () => Storage::disk('public')->url($this->image),
        );
    }
}
