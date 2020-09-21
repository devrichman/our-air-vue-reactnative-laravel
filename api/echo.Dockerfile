FROM node:10

WORKDIR /app
COPY . .

RUN npm i -g laravel-echo-server

ENTRYPOINT ["laravel-echo-server"]
CMD ["start"]
