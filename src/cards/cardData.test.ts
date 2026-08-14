import { deriveCardData } from "./cardData";
import type { Encounter, NameCard } from "../db/schema";

const nameCard: NameCard = {
  id: 1,
  name: "Jack Sng",
  role: "Student, 42 Singapore SUTD",
  tagline: "Nice to meet you!",
  email: "jack_sng@sutd.edu.sg",
  phone: "+65 9645 9651",
  telegramHandle: "@jacksng",
  xHandle: "@jacksng",
};

const baseEncounter: Encounter = {
  id: 1,
  personName: "Priya",
  place: "SUTD, Singapore",
  timestamp: new Date("2026-08-14T10:00:00Z"),
  consent: true,
  selfieUri: "file:///selfie.jpg",
  createdAt: new Date("2026-08-14T10:00:00Z"),
};

describe("deriveCardData", () => {
  it("derives a personalized card when consent is true and a selfie exists", () => {
    const card = deriveCardData(baseEncounter, nameCard);

    expect(card.variant).toBe("personalized");
    if (card.variant !== "personalized") throw new Error("unreachable");
    expect(card.selfieUri).toBe("file:///selfie.jpg");
    expect(card.place).toBe("SUTD, Singapore");
    expect(card.timestamp).toEqual(baseEncounter.timestamp);
    expect(card.nameCard.name).toBe("Jack Sng");
    expect(card.qrTargetUrl).toBe("https://www.jacksng.com");
  });

  it("derives a generic card when consent is false", () => {
    const card = deriveCardData(
      { ...baseEncounter, consent: false, selfieUri: null },
      nameCard
    );

    expect(card.variant).toBe("generic");
    expect("selfieUri" in card).toBe(false);
    expect(card.nameCard.name).toBe("Jack Sng");
    expect(card.qrTargetUrl).toBe("https://www.jacksng.com");
  });

  it("derives a generic card if consent is true but no selfie was stored", () => {
    const card = deriveCardData(
      { ...baseEncounter, consent: true, selfieUri: null },
      nameCard
    );

    expect(card.variant).toBe("generic");
  });
});
