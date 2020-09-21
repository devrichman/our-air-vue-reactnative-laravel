<?php

namespace App\Models\Quote;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    /**
     * @var string
     */
    protected $table = 'quote_options';

    /**
     * @var array
     */
    protected $fillable = ['name', 'description'];
}
