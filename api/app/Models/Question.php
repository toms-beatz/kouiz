<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    public function kouiz()
    {
        return $this->belongsTo(Kouiz::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
    public function usersAnswers()
    {
        return $this->hasMany(UserAnswers::class, 'question_id');
    }
}
