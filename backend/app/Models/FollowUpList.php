<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUpList extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'event_title',
        'remarks',
        'start_date',
        'end_date',
        'status',
        'calendar_id',
        'creator',
        'location',
    ];

    public function client()
    {
        return $this->belongsTo(AddClient::class);
    }
}
