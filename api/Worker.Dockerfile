FROM thecodingmachine/php:7.3-v2-apache

COPY --chown=docker:docker . .

RUN composer install
CMD ["php", "artisan", "queue:listen"]
