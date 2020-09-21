<?php

namespace App\Models;

use App\Enum\QuoteStatus;
use App\Models\Quote\Option as QuoteOption;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Quote
 * @package App\Models
 */
class Quote extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['amount', 'currency', 'status'];

    protected $attributes = [
        'currency'      => 'EUR',
        'amount'        => 0,
        'status'        => 'draft',
    ];

    /**
     * @return BelongsTo
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * @return BelongsToMany
     */
    public function segments()
    {
        return $this->belongsToMany(Segment::class, 'quote_segment');
    }

    /**
     * @return HasMany
     */
    public function options()
    {
        return $this->hasMany(QuoteOption::class);
    }

    /**
     * @return BelongsToMany
     */
    public function aircrafts()
    {
        return $this->belongsToMany(Aircraft::class, 'quote_aircraft');
    }

    /**
     * @return BelongsToMany
     */
    public function assets()
    {
        return $this->belongsToMany('App\Models\Asset', 'quote_assets', 'quote_id');
    }
}
