import request from 'supertest';
import app from '../../src/app';
import Knex from 'knex';


const user1 ={
  "email":"sender@gmail.com",
  "firstName":"Test",
  "lastName":"sender",
  "phoneNumber":"09056778323",
  "password":"password123"
}

const user2 ={
  "email":"receiver@gmail.com",
  "firstName":"Test",
  "lastName":"receiver",
  "phoneNumber":"09045786342",
  "password":"password123"
}

let conn: any =  {
    host: 'host.docker.internal',
    port: 3305,
    password: 'password',
    user: 'root'
}

let db = Knex({
  client: 'mysql2',
  connection: conn
})

let userOneToken = '';
let userTwoToken = '';
let userOneWalletId = '';
let userTwoWalletId = '';

beforeAll( async() => {
  await db.raw('DROP DATABASE IF EXISTS walletDb')
  await db.raw('CREATE DATABASE walletDb');

  conn.database = 'walletDb';

  db =  Knex({
    client: 'mysql2',
    connection: conn,
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations'
    },
  })

  await db.migrate.latest();
});

it("Ping App", (done) => {
  request(app)
      .get('/')
      .set("Accept", "application/json")
      .expect("Content-Type",'text/html; charset=utf-8')
      .expect(response=>{
        expect(response.status).toEqual(200)
      })
      .expect('api is running...' , done);
})

it("register a user", async() => {
  const res = await request(app)
    .post('/api/v1/users/')
    .set("Accept", "application/json")
    .send(user1);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data'); 
    expect(res.body.data.user.email).toEqual('sender@gmail.com');
    expect(res.body.data.user.balance).toEqual("0.0000");
    expect(res.body).toHaveProperty('message', 'User successfully created');
});

it("user cannot login with wrong credential", async() => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .set("Accept", "application/json")
    .send({
      "email":"sender@gmail.com",
      "password":"password"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('Message', 'Wrong email or password');
});

it("user can login", async() => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .set("Accept", "application/json")
    .send({
      "email":"sender@gmail.com",
      "password":"password123"
    });
    userOneToken = res.body.data.token
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data'); 
    expect(res.body).toHaveProperty('message', 'Login successful');
});

it("user can fund wallet", async() => {
  const res = await request(app)
    .post('/api/v1/users/fund-me')
    .set("Authorization", `Bearer ${userOneToken}`) 
    .set("Accept", "application/json")
    .send({
      "amount": 2000,
      "description":"fund my wallet"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data'); 
    expect(res.body).toHaveProperty('message','Wallet successfully credited');
});

it("user cannot fund wallet with negative figure", async() => {
  const res = await request(app)
    .post('/api/v1/users/fund-me')
    .set("Authorization", `Bearer ${userOneToken}`) 
    .set("Accept", "application/json")
    .send({
      "amount": -500,
      "description":"fund my wallet"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message','Invalid amount');
});

it("Unauthorized user cannot fund wallet", async() => {
  const res = await request(app)
    .post('/api/v1/users/fund-me')
    .set("Accept", "application/json")
    .send({
      "amount": "2000",
      "description":"fund my wallet"
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message','Not authorized, you have no access token');
});

it("user can wathdraw from wallet", async() => {
  const res = await request(app)
    .post('/api/v1/users/fund-withdrawal')
    .set("Authorization", `Bearer ${userOneToken}`) 
    .set("Accept", "application/json")
    .send({
      "amount": "1100",
      "description":"fund withdrawal"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message','withdrawal successful');
});

it("user can retrieve wallet details", async() => {
  const res = await request(app)
    .get('/api/v1/users/wallet-info')
    .set("Authorization", `Bearer ${userOneToken}`) 
    .set("Accept", "application/json")
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('walletID');
    expect(res.body.data.balance).toEqual("900.0000");
    expect(res.body).toHaveProperty('message','wallet info successfully retrieved');
    userOneWalletId = res.body.data.walletID;
});

it("register second user", async() => {
  const res = await request(app)
    .post('/api/v1/users/')
    .set("Accept", "application/json")
    .send(user2);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data'); 
    expect(res.body.data.user.email).toEqual('receiver@gmail.com');
    expect(res.body.data.user.balance).toEqual("0.0000");
    expect(res.body).toHaveProperty('message', 'User successfully created');
});

it("user two login", async() => {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .set("Accept", "application/json")
    .send({
      "email":"receiver@gmail.com",
      "password":"password123"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data'); 
    expect(res.body).toHaveProperty('message', 'Login successful');
    userTwoToken = res.body.data.token
});

it("retrieve use two wallet details", async() => {
  const res = await request(app)
    .get('/api/v1/users/wallet-info')
    .set("Authorization", `Bearer ${userTwoToken}`) 
    .set("Accept", "application/json")
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('walletID');
    expect(res.body.data.balance).toEqual("0.0000");
    expect(res.body).toHaveProperty('message','wallet info successfully retrieved');
    userTwoWalletId = res.body.data.walletID;
});

it("Fund transfer from user one to user two", async() => {
  const res = await request(app)
    .post('/api/v1/users/fund-transfer')
    .set("Authorization", `Bearer ${userOneToken}`) 
    .set("Accept", "application/json")
    .send({
        "walletId": userTwoWalletId,
        "amount": 12,
        "description": "fund transfer from user one to two"
    })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message','Fund transfer successful');
});

it("retrieve user two wallet details", async() => {
  const res = await request(app)
    .get('/api/v1/users/wallet-info')
    .set("Authorization", `Bearer ${userTwoToken}`) 
    .set("Accept", "application/json")

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('walletID');
    expect(res.body.data.balance).toEqual("12.0000");
    expect(res.body).toHaveProperty('message','wallet info successfully retrieved');
});


