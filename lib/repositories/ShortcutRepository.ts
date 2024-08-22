import { db } from "../database/database";
import { addDays } from "date-fns";
import { NewShortcut, Shortcut } from "../types/database/tables.types";
import { DatabaseError } from "pg";
import { PostgresErrorCode } from "../types/database/errors.types";
import { RepositoryError } from "../types/repositories/errors.types";

const DAYS_TO_EXPIRE = 15;

export type ShortcutCreate = Omit<NewShortcut, "expires_at" | "url_count">;

export const ShortcutRepository = {
  create: async (shortcut: ShortcutCreate, urls: string[]) => {
    await db.transaction().execute(async (tx) => {
      try {
        const newShortcut = await tx
          .insertInto("shortcuts")
          .values({
            ...shortcut,
            url_count: urls.length,
            expires_at: addDays(new Date(), DAYS_TO_EXPIRE),
            created_at: new Date(),
          })
          .returning("id")
          .executeTakeFirstOrThrow();

        await tx
          .insertInto("urls")
          .values(
            urls.map((url) => ({
              shortcut_id: newShortcut.id,
              url,
            }))
          )
          .execute();
      } catch (error) {
        if (
          error instanceof DatabaseError &&
          error.code === PostgresErrorCode.UniqueViolation
        ) {
          throw new RepositoryError(
            "Shortcut already exists",
            PostgresErrorCode.UniqueViolation
          );
        }

        throw error;
      }
    });
  },
  deleteAllUnused: async () => {
    const now = new Date();

    await db
      .deleteFrom("shortcuts")
      .where("expires_at", "<", now)
      .executeTakeFirst();
  },
  get: async (name: string) => {
    return await db.transaction().execute(async (tx) => {
      const shortcut = await tx
        .selectFrom("shortcuts")
        .where("name", "=", name)
        .selectAll()
        .executeTakeFirstOrThrow();

      return shortcut;
    });
  },
  getNextUrl: async (shortcut: Shortcut) => {
    let urlIndex = shortcut.url_seq ?? 0;

    if (shortcut.mode === "randomly") {
      urlIndex = Math.floor(Math.random() * shortcut.url_count);
    }

    if (shortcut.mode === "sequentially") {
      let nextUrlIndex = urlIndex + 1;

      if (nextUrlIndex >= shortcut.url_count) {
        nextUrlIndex = 0;
      }

      urlIndex = nextUrlIndex;
    }

    await db
      .updateTable("shortcuts")
      .set({
        url_seq: urlIndex,
        expires_at: addDays(new Date(), DAYS_TO_EXPIRE),
      })
      .where("id", "=", shortcut.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return await db
      .selectFrom("urls")
      .where("shortcut_id", "=", shortcut.id)
      .select(["url"])
      .offset(urlIndex)
      .limit(1)
      .executeTakeFirstOrThrow();
  },
};
