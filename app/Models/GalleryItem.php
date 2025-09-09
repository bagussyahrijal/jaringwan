<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    use HasUuids;

    protected $guarded = ['created at', 'updated at'];

    protected $fillable = [
        'tag',
        'gallery_id',
    ];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }
}
