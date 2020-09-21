<?php

namespace App\Models;

use App\Models\Flight\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Aircraft extends Model
{
    protected $table = 'aircrafts';

    /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
    protected $fillable = [
        'flight_category_id',
        'type',
        'year_of_make',
        'interior_refurbished',
        'exterior_refurbished',
        'amenities',
        'max_range_nm',
        'cruise_speed_knots',
        'max_pax',
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
        return $this->belongsToMany('App\Models\Asset', 'aircraft_assets', 'aircraft_id');
    }

    public function flightCategory()
    {
        return $this->belongsTo(Category::class, 'flight_category_id');
    }
}
