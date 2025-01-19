<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailAccount extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'email',
        'password',
        'imap_host',
        'imap_port',
        'encryption',
    ];

    /**
     * Get the user that owns the email account.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
