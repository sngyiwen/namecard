import { createTestDb } from "./testDb";
import {
  getNameCard,
  saveNameCard,
  listEncounters,
  getEncounter,
  createEncounter,
  updateEncounter,
  deleteEncounter,
} from "./repository";

describe("name_card repository", () => {
  it("reads the seeded singleton row", async () => {
    const db = createTestDb();
    const card = await getNameCard(db);
    expect(card.name).toBe("");
  });

  it("persists edits and reloads them", async () => {
    const db = createTestDb();
    await saveNameCard(db, {
      name: "Jane Doe",
      role: "Student",
      company: "42 Singapore, SUTD",
      tagline: "Nice to meet you!",
      email: "jane_doe@example.com",
      phone: "+65 8123 4567",
      telegramHandle: "@janedoe",
      xHandle: "@janedoe",
      qrUrl: "https://example.com",
    });

    const reloaded = await getNameCard(db);
    expect(reloaded.name).toBe("Jane Doe");
    expect(reloaded.telegramHandle).toBe("@janedoe");
  });
});

describe("encounters repository", () => {
  it("creates, lists, updates, and deletes an encounter", async () => {
    const db = createTestDb();

    const created = await createEncounter(db, {
      personName: "Alex",
      place: "SUTD, Singapore",
      timestamp: new Date("2026-08-14T10:00:00Z"),
      consent: false,
      selfieUri: null,
    });
    expect(created.id).toBeDefined();
    expect(created.selfieUri).toBeNull();

    const listed = await listEncounters(db);
    expect(listed).toHaveLength(1);
    expect(listed[0].personName).toBe("Alex");

    const fetched = await getEncounter(db, created.id);
    expect(fetched?.personName).toBe("Alex");

    const updated = await updateEncounter(db, created.id, {
      place: "Corrected place",
    });
    expect(updated.place).toBe("Corrected place");

    await deleteEncounter(db, created.id);
    expect(await listEncounters(db)).toHaveLength(0);
  });

  it("stores a selfie uri only when consent is true", async () => {
    const db = createTestDb();

    const consented = await createEncounter(db, {
      personName: "Priya",
      place: "42 Singapore",
      timestamp: new Date(),
      consent: true,
      selfieUri: "file:///selfie.jpg",
    });
    expect(consented.selfieUri).toBe("file:///selfie.jpg");

    const declined = await createEncounter(db, {
      personName: "Ravi",
      place: "42 Singapore",
      timestamp: new Date(),
      consent: false,
      selfieUri: null,
    });
    expect(declined.selfieUri).toBeNull();
  });
});
