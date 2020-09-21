<!-- PROJECT SHIELDS -->
<!-- [![Build Status][build-shield]]() -->
<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/richhaho/club-airways">
    <img src="logo.png" alt="Logo" width="200" height="130">
  </a>

  <h3 align="center">Club Airways</h3>

  <p align="center">
    Application de réservation de Jets privés et de services de luxe
    <br />
    API, Application Mobile et Back-Office
  </p>
</div>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [Laravel 5.8](https://laravel.com)
* [React Native 0.59](https://facebook.github.io/react-native/)
* [VueJS 2.6.10](https://github.com/vuejs/vue)

### Deployment

Deployment is managed with `kubernetes` for all branches except `master` and `develop`  
A specific configuration is made for the `staging` branch : database and storage files will not be deleted for each deployments.


<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

You need the following tools to start this project :
* docker (engine > 18 and compose > 1.23) 
* yarn 

If you are using Mac OSX, please run
```sh
$ cp docker-compose.override.yml.osx docker-compose.override.yml
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/richhaho/club-airways
cd club-airways
```

#### API & BO

1. Copy and fill .env files
```sh
cp api/.env.example api/.env
cp .env.example .env
```

2. Start containers
```sh
docker-compose up -d
```

:warning:
To install a new package inside the `back-office`, you **MUST** run `yarn` **inside** the bo container

```sh
docker-compose exec bo sh
# Then inside the container, navigate to /usr/app
cd /usr/app/
yarn add my-package
```

:warning:
To install a new package inside the `api`, you **MUST** run `composer` **inside** the api container

```sh
docker-compose exec api bash
# To listen echo client
php artisan queue:listen

# Then inside the container
composer require my-package
```
  
* API is running by default at http://api.club-airways.localhost
* BO is running by default at http://bo.club-airways.localhost

#### APP

1. Install dependencies
```sh
cd /app
yarn
```

2. Install pods (iOS only) - You need [Cocoapods](https://cocoapods.org/)
```sh
cd /app/ios
pod install
```
Do not run `pod update` which will upgrade all dependencies

3. Copy and fill .env files
```sh
cp App/Config/index.dev.js App/Config/index.js
```

4. Download and install `react-native-debugger`  
https://github.com/jhen0409/react-native-debugger/releases

5. Launch application
```sh
react-native [run-android|run-ios]
```

#### PRODUCTION

##### Yousign
Create signature_ui on yousign web interface.
Set success redirect url with app production url and /webhook/you-sign-webhook endpoint.
Use copy button on the id to setup env variable.

 


<!-- MARKDOWN LINKS & IMAGES -->
[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/screenshot.png
