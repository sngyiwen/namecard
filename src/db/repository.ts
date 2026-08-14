import { eq, desc } from "drizzle-orm";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema";
import type { NameCard, Encounter } from "./schema";

// Accepts any Drizzle SQLite database bound to `schema` — expo-sqlite in the app,
// better-sqlite3 in tests — so this layer is testable without a native binding.
type Database = BaseSQLiteDatabase<"sync" | "async", unknown, typeof schema>;

export type NameCardFields = Omit<NameCard, "id">;
export type NewEncounterInput = Omit<Encounter, "id" | "createdAt">;
export type EncounterEdits = Partial<
  Pick<Encounter, "personName" | "place" | "timestamp">
>;

export async function getNameCard(db: Database): Promise<NameCard> {
  const [row] = await db.select().from(schema.nameCard).limit(1);
  if (!row) {
    throw new Error(
      "name_card row is missing — it should be seeded on database init"
    );
  }
  return row;
}

export async function saveNameCard(
  db: Database,
  fields: NameCardFields
): Promise<NameCard> {
  const existing = await getNameCard(db);
  await db
    .update(schema.nameCard)
    .set(fields)
    .where(eq(schema.nameCard.id, existing.id));
  return getNameCard(db);
}

export async function listEncounters(db: Database): Promise<Encounter[]> {
  return db
    .select()
    .from(schema.encounters)
    .orderBy(desc(schema.encounters.timestamp));
}

export async function getEncounter(
  db: Database,
  id: number
): Promise<Encounter | undefined> {
  const [row] = await db
    .select()
    .from(schema.encounters)
    .where(eq(schema.encounters.id, id))
    .limit(1);
  return row;
}

export async function createEncounter(
  db: Database,
  input: NewEncounterInput
): Promise<Encounter> {
  const [row] = await db
    .insert(schema.encounters)
    .values({ ...input, createdAt: new Date() })
    .returning();
  return row;
}

export async function updateEncounter(
  db: Database,
  id: number,
  edits: EncounterEdits
): Promise<Encounter> {
  await db
    .update(schema.encounters)
    .set(edits)
    .where(eq(schema.encounters.id, id));
  const row = await getEncounter(db, id);
  if (!row) {
    throw new Error(`Encounter ${id} not found after update`);
  }
  return row;
}

export async function deleteEncounter(db: Database, id: number): Promise<void> {
  await db.delete(schema.encounters).where(eq(schema.encounters.id, id));
}
