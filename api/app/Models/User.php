<?php

namespace App\Models;

use App\Notifications\ResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as InterfaceCanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class User
 * @package App\Models
 */
class User extends Authenticatable implements InterfaceCanResetPassword
{
    use Notifiable;
    use CanResetPassword;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'lastname',
        'firstname',
        'phone',
        'status',
        'locale_id',
        'gender_id',
        'comments'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * @return HasMany
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getFavoriteAirports()
    {
        $bookings = $this->bookings;
        $airports_id = [];
        foreach ($bookings as $booking) {
            $segments = $booking->segments;
            $airports_id = array_merge($airports_id, $segments->pluck('from')->toArray());
            $airports_id = array_merge($airports_id, $segments->pluck('to')->toArray());
        }
        return Airport::whereIn('id', $airports_id)->take(50)->get();
    }

    /**
     * @return BelongsTo
     */
    public function locale()
    {
        return $this->belongsTo(Locale::class);
    }

    /**
     * @return BelongsTo
     */
    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }
}
