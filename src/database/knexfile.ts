import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const {DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} = process.env;

// Update with your config settings.

export const configs: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD
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

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  }

};
