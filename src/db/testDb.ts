import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { CREATE_TABLES_SQL } from "./createTables";

// In-memory database for tests, using the same schema and table SQL as the app's
// expo-sqlite connection (see src/db/client.ts). Keeps repository.ts testable
// without a native module.
export function createTestDb() {
  const sqlite = new Database(":memory:");
  sqlite.exec(CREATE_TABLES_SQL);
  sqlite.exec("INSERT INTO name_card DEFAULT VALUES");
  return drizzle(sqlite, { schema });
}
