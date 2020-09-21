FROM thecodingmachine/php:7.3-v2-apache

COPY --chown=docker:docker . .

RUN composer install
RUN sudo chown -R docker:docker /etc/timezone
RUN sudo echo "Europe/Paris" > /etc/timezone
