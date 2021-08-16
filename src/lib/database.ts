import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB(`${Deno.cwd()}/database/sqlite3.db`);

export function query(query) {
  return db.queryEntries(query.sql, query.values);
}
