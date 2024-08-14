<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddClient extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'category_id', 
        'business_name',
        'business_type',
        'phone',
        'location',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function followUps()
    {
        return $this->hasMany(FollowUpList::class, 'client_id');
    }
}
