<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>



<p align="center">
    <a href="https://php.net/" title="PHP"><img src="https://github.com/get-icon/geticon/raw/master/icons/php.svg" alt="PHP" width="21px" height="21px"></a>
    <a href="https://laravel.com/" title="Laravel"><img src="https://github.com/get-icon/geticon/raw/master/icons/laravel.svg" alt="Laravel" width="21px" height="21px"></a>
    <a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="21px" height="21px"></a>
    <a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="21px" height="21px"></a>
    <a href="https://vitejs.dev/" title="Vite"><img src="https://github.com/get-icon/geticon/raw/master/icons/vite.svg" alt="Vite" width="21px" height="21px"></a>
    <a href="https://www.docker.com/" title="docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="docker" width="21px" height="21px"></a>
</p>

## Getting started
To set up and run project locally, make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your system.

### Installing Composer Dependencies
You may install the application's dependencies by navigating to the application's directory and executing the following command.
```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

## Run locally using Laravel Sail

#### Create a `.env` file by copying `.env.example` and update the required fields

#### Configuring A Shell Alias
By default, Sail commands are invoked using the vendor/bin/sail script that is included with all new Laravel applications:
```bash
./vendor/bin/sail up
```

####
1. Create a `.env` by copying `.env.example` and update the required fields.
2. Run `sail up`
3. Run `sail composer install`
4. Run `sail artisan key:gen` -> generates `APP_KEY` value
5. Run `sail artisan migrate` -> creates needed tables
6. Run `sail artisan db:seed` -> seeds some fake user
7. Run `sail yarn`
8. Run `sail yarn dev`

### Laravel Sail

[Laravel Sail](https://laravel.com/docs/sail) is a light-weight command-line interface for interacting with Laravel's default Docker development environment.

#### Configuring A Shell Alias

By default, Sail commands are invoked using the vendor/bin/sail script that is included with all new Laravel applications:

```bash
./vendor/bin/sail up
```

However, instead of repeatedly typing vendor/bin/sail to execute Sail commands, you may wish to configure a shell alias that allows you to execute Sail's commands more easily:

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

#### Executing Artisan Commands

Laravel Artisan commands may be executed using the artisan command:

```bash
sail artisan queue:work
```

#### Executing Node / NPM Commands

Node commands may be executed using the node command while NPM commands may be executed using the npm command:

```bash
sail node --version
sail npm run dev
```

#### Starting and Stopping Sail

```bash
sail up
```

To start all of the Docker containers in the background, you may start Sail in "detached" mode:

```bash
sail up -d
```

Once the application's containers have been started, you may access the project in your web browser at: http://localhost.

To stop all of the containers, you may simply press Control + C to stop the container's execution. Or, if the containers are running in the background, you may use the stop command:

```bash
sail stop
```




## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
