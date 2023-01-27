import Knex from "knex";
import { configs } from "./knexfile";

const config = configs[process.env.NODE_ENV || "development"]

const db = Knex(config);

export default db;
