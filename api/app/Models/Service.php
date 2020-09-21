<?php

namespace App\Models;

use App\Models\Option;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Service
 * @package App\Models
 */
class Service extends Model
{
    protected $fillable = [
        'code',
        'order',
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * The options that belongs to the service
     *
     */
    public function options()
    {
        return $this->belongsToMany(Option::class);
    }
}
