<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasUuids;

    protected $guarded = ['created at', 'updated at'];

    protected $fillable = [
        'title',
        'image',
        'video',
        'description',
    ];

    public function galleryItems()
    {
        return $this->hasMany(GalleryItem::class);
    }
}
