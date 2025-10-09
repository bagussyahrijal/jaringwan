<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    protected $appends = ['image_url', 'thumbnail_url', 'video_url'];

    public function galleryItems()
    {
        return $this->hasMany(GalleryItem::class);
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->image) {
                    return null;
                }
                return Storage::disk('public')->url($this->image);
            },
        );
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->thumbnail) {
                    return null;
                }
                return Storage::disk('public')->url($this->thumbnail);
            },
        );
    }

    protected function videoUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->video) {
                    return null;
                }
                return Storage::disk('public')->url($this->video);
            },
        );
    }
}
