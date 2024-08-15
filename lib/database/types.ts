import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  shortcuts: ShortcutsTable;
  urls: UrlsTable;
}

export interface ShortcutsTable {
  id: Generated<number>;
  name: string;
  mode: "randomly" | "sequentially";
  url_count: number;
  url_seq: number | null;
  expires_at: ColumnType<Date, Date | string, Date | string>;
  created_at: ColumnType<Date, Date | string | undefined, never>;
}

export type Shortcut = Selectable<ShortcutsTable>;
export type NewShortcut = Insertable<ShortcutsTable>;
export type ShortcutUpdate = Updateable<ShortcutsTable>;

export interface UrlsTable {
  id: Generated<number>;
  url: string;
  shortcut_id: number;
  created_at: ColumnType<Date, Date | string | undefined, never>;
}
