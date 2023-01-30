# Demo Credit Wallet Service

## Requirements

* Docker
* docker-compose

## Getting started

### Environment variables

Create an `.env` file in the root directory where you should assign values for
environment variables containing sensitive data, such as passwords, tokens,
hashes or even custom preferences. These variables are not committed in VCS and
due to their nature should be manually set. Here is a list of variables that
need to be set in the `.env` file:

* `JWT_SECRET`
* `JWT_EXPIRATION`
* `NODE_ENV`
* `PORT`
* `BASE_URL`
* `DB_HOST`
* `DB_PORT`
* `DB_USER`
* `DB_PASSWORD`
* `DB_NAME`

## Starting the containers

To start the containers, you can execute the following command from the project
root directory:

```bash
$ docker-compose up -d
```

This will automatically read the `docker-compose.yml` file as a source. The `-d`
options will start the containers in the background. If you omit the `-d`
option, `docker-compose` will run in the foreground.

The api will be available on any port in your `.env`

## Stopping the containers

To stop the containers, you can use the command `docker-compose down` from the
same directory as the `docker-compose.yml`. Using this command, however, will
only stop the machine and will not destroy the volume that was created with it.
To clean the volume as well, use the `-v` parameter as `docker-compose down -v`.

## Useful commands

* When a service is not based on an image, but is built through a Dockerfile,
  the image is cached in `docker-compose` after first build. If changes are
  made, it can be rebuild using `docker-compose build <container> --no-cache`.
* To rebuild all containers on startup use the `--force-recreate` flag as such:
  `docker-compose up --force-recreate`.
* If a container persists still, use `docker-compose rm <container_id>` to
  remove it from the docker-compose cache and then recreate the containers.

  
