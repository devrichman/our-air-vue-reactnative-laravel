<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Segment extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['from', 'to', 'date', 'booking_id'];

    /**
     * @return BelongsTo
     */
    public function fromAirport()
    {
        return $this->belongsTo(Airport::class, 'from');
    }

    /**
     * @return BelongsTo
     */
    public function toAirport()
    {
        return $this->belongsTo(Airport::class, 'to');
    }
}
