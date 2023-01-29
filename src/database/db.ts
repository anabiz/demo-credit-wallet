import Knex from "knex";
import config from "./knexfile";

const setup = config[process.env.NODE_ENV || "development"]

const db = Knex(setup);

export default db;
