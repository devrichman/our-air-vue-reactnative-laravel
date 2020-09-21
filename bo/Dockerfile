FROM node:11.12-alpine AS builder

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /usr/app

COPY . .

RUN yarn

ENV NODE_ENV=production \
    VUE_APP_API_URL=#API_URL# \
    VUE_APP_ECHO_URL=#ECHO_URL#

RUN yarn build

FROM thecodingmachine/nodejs:10-apache

COPY --from=builder --chown=docker:docker /usr/app/dist /var/www/html/
COPY --chown=docker:docker ./.htaccess /var/www/html/.htaccess
