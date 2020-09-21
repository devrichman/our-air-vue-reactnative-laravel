<?php

namespace App\Models\Flight;

use App\Models\Aircraft;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Category
 * @package App\Models\Flight
 */
class Category extends Model
{
    protected $table = 'flight_categories';

     /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
    protected $fillable = [
        'name',
        'description',
        'min_pax',
        'max_pax',
        'average_price',
        'average_speed',
     ];

     /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
    protected $dates = [
         'created_at', 'deleted_at',
     ];

    /**
     * Get all image_url of aircraft in Aircraft Model
     *
     * @return BelongsToMany
     */
    public function assets()
    {
        return $this->belongsToMany('App\Models\Asset', 'flight_category_asset', 'flight_category_id');
    }

    /**
     * @return belongsToMany
     */
    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_flight_category', 'flight_category_id', 'booking_id');
    }

    /**
     * @return HasMany
     */
    public function aircrafts()
    {
        return $this->hasMany(Aircraft::class, 'flight_category_id', 'id');
    }
}
