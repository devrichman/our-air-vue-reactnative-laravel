<?php

use JeroenZwart\CsvSeeder\CsvSeeder;

/**
 * Class AirportSeeder
 */
class AirportSeeder extends CsvSeeder
{
    // JeroenZwart CsvSeeder is running
    public function __construct() {
        $this->tablename = 'airports';
        $this->file = '/database/csv/airports.csv';
        $this->delimiter = ',';
        $this->skipper = '%';
        $this->encode = false;
        $this->truncate = false;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::disableQueryLog();
	    parent::run();
    }

}
