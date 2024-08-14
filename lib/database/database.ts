import { Kysely } from "kysely";
import { Database } from "./types";
import { pgDialect } from "../config/pg.config";

export const db = new Kysely<Database>({
  dialect: pgDialect,
});
