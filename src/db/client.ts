import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";
import { CREATE_TABLES_SQL } from "./createTables";

const sqliteDb = openDatabaseSync("namecard.db");
sqliteDb.execSync(CREATE_TABLES_SQL);

export const db = drizzle(sqliteDb, { schema });

// The NameCard row is a singleton; seed it once so repository reads never hit an empty table.
export function ensureNameCardSeeded() {
  const existing = sqliteDb.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM name_card"
  );
  if (!existing || existing.count === 0) {
    sqliteDb.runSync("INSERT INTO name_card DEFAULT VALUES");
  }
}

ensureNameCardSeeded();
