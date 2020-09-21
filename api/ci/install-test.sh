#!/usr/bin/env bash

cp .env.example .env
composer install

php artisan config:cache
php artisan key:generate
php artisan migrate

cd /home/docker
composer create-project thecodingmachine/washingmachine --stability=dev
cd -
