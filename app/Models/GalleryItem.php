<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }
}
