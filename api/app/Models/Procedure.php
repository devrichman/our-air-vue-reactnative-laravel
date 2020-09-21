<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    protected $table = 'procedures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','procedure_id','description','created_date','updated_date','status','creator',
        'creator_firstname','creator_lastname','workspace','template','ordered',
        'parent','metadata','config','members','subscribers','related_files_enable',
        'archive','archive_metadata','fields','permissions','files','company'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'metadata' => 'json','config' => 'json',
        'members' => 'json','subscribers' => 'json',
        'archive_metadata'  => 'json',
        'fields'  => 'json','permissions'  => 'json','files'  => 'json',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $dates = [
        'created_at', 'deleted_at','finished_date','expires_date'
    ];

    /**
     * Get all projects of Procedure in Procedure model
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function projects()
    {
        return $this->belongsToMany('App\Models\Quote', 'quotes')->withTimestamps();
    }
}
