import { db } from "../database/database";
import { addDays } from "date-fns";
import { NewShortcut } from "../database/types";

const DAYS_TO_EXPIRE = 15;

export const ShortcutRepository = {
  create: async (
    shortcut: Omit<NewShortcut, "expires_at" | "url_seq">,
    urls: string[]
  ) => {
    await db.transaction().execute(async (tx) => {
      console.log("shortcut", shortcut);
      const newShortcut = await tx
        .insertInto("shortcuts")
        .values({
          ...shortcut,
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
};
