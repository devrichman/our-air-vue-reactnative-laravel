#!/usr/bin/env bash

cp .env.example .env
composer install

php artisan config:cache
php artisan key:generate
