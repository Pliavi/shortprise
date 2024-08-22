import { Kysely } from "kysely";
import { Database } from "../types/database/tables";
import { pgDialect } from "../config/pg.config";

export const db = new Kysely<Database>({
  dialect: pgDialect,
});
