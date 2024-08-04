<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAnswerDetail extends Model
{
    protected $table = 'user_answer_details';
    public $timestamps = false;

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function option()
    {
        return $this->belongsTo(Option::class, 'option_id');
    }
}
