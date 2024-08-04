<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswers extends Model
{
    use HasFactory;
    protected $table = 'user_answers';

    public function details()
    {
        return $this->hasMany(UserAnswerDetail::class, 'user_answer_id');
    }
}
