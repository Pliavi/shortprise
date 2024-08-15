import { db } from "../database/database";
import { addDays } from "date-fns";
import { NewShortcut, Shortcut } from "../database/types";

const DAYS_TO_EXPIRE = 15;

export const ShortcutRepository = {
  create: async (
    shortcut: Omit<NewShortcut, "expires_at" | "url_seq">,
    urls: string[]
  ) => {
    await db.transaction().execute(async (tx) => {
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
    });
  },
  update: () => {},
  delete: () => {},
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

      await db
        .updateTable("shortcuts")
        .set({ url_seq: nextUrlIndex })
        .where("id", "=", shortcut.id)
        .execute();
    }

    return await db
      .selectFrom("urls")
      .where("shortcut_id", "=", shortcut.id)
      .select(["url"])
      .offset(urlIndex)
      .limit(1)
      .executeTakeFirstOrThrow();
  },
};
