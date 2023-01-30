# Demo Credit Wallet Service

## App data model

![UML](https://github.com/anabiz/demo-credit-wallet/blob/develop/demo-credit-er-diagram.png)

## Swagger documentation
https://anthony-iwuji-lendsqr-be-test.onrender.com/api-docs/

## Postman Documentation
https://documenter.getpostman.com/view/8809901/2s935hQS3b

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
There arec two services as defined in the docker-compose.yml file.
* `db service, which is the mysql database`
* `api-server, i.e the api server for demo credit wallet
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


## Runing test
Make sure the db service (database container) is runing before runing the test
#### Fellow the steps below:
* `Run "yarn"`
* `Run "yarn test"`

![UML](https://github.com/anabiz/demo-credit-wallet/blob/develop/demo-credit-test-result.png)


## API Endpoints

### User signup
POST ⇒ {{BASE_URL}}/api/v1/users/
**Sample payload:**
```js
{
    "firstName": "Mr T",
    "lastName": "Iwuji",
    "phoneNumber": "09078657787",
    "email": "example@gmail.com",
    "password":"pa$$word"
}
```
**Response body**
```js
{
    "message": "User successfully created",
    "data": {
        "user": {
            "userId": "572b9498-c26a-472e-8d0d-bb45a2f60ba8",
            "email": "example@gmail.com",
            "firstName": "Mr T",
            "lastName": "Iwuji",
            "walletID": "09078657787",
            "balance": "0.0000"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmI5NDk4LWMyNmEtNDcyZS04ZDBkLWJiNDVhMmY2MGJhOCIsImVtYWlsIjoiYW5hYml6ODdAZ21haWwuY29tIiwiaWF0IjoxNjc1MDgzMTc0LCJleHAiOjE2NzUwOTAzNzR9._UUbPskQV6k9csh1U7S5_tD2Xt3kg6_D4GiYEpOezSY"
    }
}
```

<br>


### User Login
POST ⇒ {{BASE_URL}}/api/v1/auth/login
**Sample payload:**
```js
{
    "email": "example@gmail.com",
    "password": "pa$$word"
}

```

**Response body**
```js
{
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1ZWIwNWY5LTk2ZmEtNDIwMi1hOWIxLTRiZWQ2ZTYwMDBkNiIsImVtYWlsIjoiYW5hYml6eVJAZ21haWwuY29tIiwiaWF0IjoxNjc1MDgzMzY5LCJleHAiOjE2NzUwOTA1Njl9.jtBFBMPrv4aGp8tFkx6puvMgn78C3Vz4EtfNUG0Zxa0"
    }
}
```
<br>

### Fund wallet
POST ⇒ {{BASE_URL}}/api/v1/users/fund-me
**Sample payload:**
```js
{
    "amount": "2000",
    "description":"fund my wallet"
}

```

**Response body**
```js
{
    "message": "Wallet successfully credited",
    "data": {}
}
```
<br>

### Fund Transfer
POST ⇒ {{BASE_URL}}/api/v1/users/fund-transfer
**Sample payload:**
```js
{
    "walletId": "324420539",
    "amount": 12,
    "description": "transfer"
}

```

**Response body**
```js
{
    "message": "Fund transfer successful",
    "data": {}
}
```
<br>

### Fund Transfer
POST ⇒ {{BASE_URL}}/api/v1/users/fund-withdrawal
**Sample payload:**
```js
{
    "amount": "100",
    "description": "fund withdrawal"
}

```

**Response body**
```js
{
    "message": "withdrawal successful",
    "data": {}
}
```
<br>
### Get wallet details
POST ⇒ {{BASE_URL}}/api/v1/users/wallet-info

**Response body**
```js
}
    "message": "wallet info successfully retrieved",
    "data": {
        "userId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
        "email": "example@gmail.com",
        "firstName": "Mr T",
        "lastName": "Iwuji",
        "walletID": "09078657787",
        "balance": "0.0000"
    }
}
```
<br>

### Get transaction history
POST ⇒ {{BASE_URL}}/api/v1/users/transactions
**Sample parameters:**
```js
{
    "currentPage": 1,
    "perPage": 4,
    "status": "approved",
    "tranType": "debit"
}

```

**Response body**
```js
{
    "message": "Transactions successfully retrieved",
    "data": {
        "total": 6,
        "perPage": 4,
        "offset": 0,
        "to": 4,
        "lastPage": 2,
        "currentPage": 1,
        "from": 0,
        "data": [
            
            {
                "id": "6de55d99-0734-49bf-a832-e0ea8bad079e",
                "tranType": "debit",
                "status": "approved",
                "reference": "f6d2980e-5cea-4dab-8c02-bcd2e8be9d27",
                "amount": "12.0000",
                "senderId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "receiverId": "572b9498-c26a-472e-8d0d-bb45a2f60ba8",
                "description": "transfer",
                "created_at": "2023-01-30T13:02:33.000Z",
                "updated_at": "2023-01-30T13:02:33.000Z"
            },
            {
                "id": "89a4b73c-402c-487e-bb34-3c1c3a8a9f4d",
                "tranType": "debit",
                "status": "approved",
                "reference": "66bfda88-c865-425a-8615-0278658e87b1",
                "amount": "2000.0000",
                "senderId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "receiverId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "description": "fund my wallet",
                "created_at": "2023-01-30T00:23:18.000Z",
                "updated_at": "2023-01-30T00:23:18.000Z"
            },
            {
                "id": "9d0e20a6-7b73-4352-99ff-899a58fe47c7",
                "tranType": "debit",
                "status": "approved",
                "reference": "9522e397-9d35-49d6-8413-e1e6779e2275",
                "amount": "-2000.0000",
                "senderId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "receiverId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "description": "fund my wallet",
                "created_at": "2023-01-30T00:10:33.000Z",
                "updated_at": "2023-01-30T00:10:33.000Z"
            },
            {
                "id": "ec9e2026-7c58-4cd7-bf7e-b0ae68d4f1a6",
                "tranType": "debit",
                "status": "approved",
                "reference": "bdb956b7-a932-4657-ba04-3d10158a9047",
                "amount": "2000.0000",
                "senderId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "receiverId": "95eb05f9-96fa-4202-a9b1-4bed6e6000d6",
                "description": "fund my wallet",
                "created_at": "2023-01-30T00:23:39.000Z",
                "updated_at": "2023-01-30T00:23:39.000Z"
            }
        ]
    }
}
```