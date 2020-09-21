<?php

namespace App\Models;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Class Asset
 * @package App\Models
 */
class Asset extends Model
{
    const EXTERNAL_DISK = 'external';

    const FLIGHT_CATEGORIES_FOLDER = 'flight_categories';
    const AIRCRAFTS_FOLDER = 'aircrafts';
    const QUOTE_CONTRACT_FOLDER = 'quote_contracts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path',
        'disk',
        'filename'
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
     * @return string
     */
    public function getFullPathAttribute()
    {
        if ($this->disk === self::EXTERNAL_DISK) {
            return $this->path;
        }

        return Storage::disk($this->disk)->url($this->path);
    }

    /**
     * @return string
     * @throws FileNotFoundException
     */
    public function getContent()
    {
        if ($this->disk === self::EXTERNAL_DISK) {
            return $this->path;
        }

        return Storage::disk($this->disk)->get($this->path);
    }
}
