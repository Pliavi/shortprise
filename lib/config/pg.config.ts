import "./env.config";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

export const pgDialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  }),
});
