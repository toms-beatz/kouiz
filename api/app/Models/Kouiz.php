<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kouiz extends Model
{
    use HasFactory;
    protected $table = "kouiz";

    protected $fillable = [
        "title",
        "description",
        "emoji"
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
