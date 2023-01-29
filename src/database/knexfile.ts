import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config({path: '../../.env'});

const {
  DB_NAME, 
  DB_PASSWORD, 
  DB_USER, 
  DB_PORT, 
  DB_HOST
} = process.env;

const config: {[key: string]: Knex.Config} = {
  development: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DB_NAME,
      password: DB_PASSWORD,
      user: DB_USER,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations'
    },
    debug: true,
    useNullAsDefault: true
  },

  production: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DB_NAME,
      password: DB_PASSWORD,
      user: DB_USER,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations'
    },
    debug: true,
    useNullAsDefault: true
  }

};

export default config;