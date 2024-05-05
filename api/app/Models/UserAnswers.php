<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswers extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kouiz_id',
        'question_id',
        'option_id',
    ];
}
