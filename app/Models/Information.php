<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasUuids;

    protected $guarded = ['created_at', 'updated_at'];

    protected $fillable = [
        'title',
        'header',
        'subheader',
        'content',
    ];
}
