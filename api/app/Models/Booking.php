<?php

namespace App\Models;

use App\Enum\BookingStatus;
use App\Models\Flight\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Booking
 * @package App\Models
 */
class Booking extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'service_id', 'status', 'user_id'
    ];

    /**
     * User who ordered the booking
     *
     * @return BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withTrashed();
    }

    /**
     * Chat messages on the booking
     *
     * @return HasMany
     */
    public function messages()
    {
        return $this->HasMany(Message::class);
    }

    /**
     * King of service booked
     *
     * @return BelongsTo
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * @param BookingStatus $status
     */
    public function setStatus(BookingStatus $status) : void
    {
        $this->status = $status;
    }

    /**
     * @return BelongsToMany
     */
    public function segments()
    {
        return $this->belongsToMany(Segment::class, 'booking_segment');
    }

    /**
     * @return BelongsToMany
     */
    public function options()
    {
        return $this->belongsToMany(Option::class, 'booking_option');
    }

    /**
     * @return BelongsToMany
     */
    public function flightCategories()
    {
        return $this->belongsToMany(Category::class, 'booking_flight_category', 'booking_id', 'flight_category_id');
    }

    /**
     * @return HasMany
     */
    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }
}
