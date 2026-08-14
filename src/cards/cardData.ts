import type { Encounter, NameCard } from "../db/schema";
import { QR_TARGET_URL } from "../nameCard/constants";

export type CardData =
  | {
      variant: "personalized";
      nameCard: Omit<NameCard, "id">;
      qrTargetUrl: string;
      selfieUri: string;
      place: string;
      timestamp: Date;
    }
  | {
      variant: "generic";
      nameCard: Omit<NameCard, "id">;
      qrTargetUrl: string;
    };

// Pure derivation of what the Card should render, branching only on
// encounter.consent — the shared/tested seam for card generation.
export function deriveCardData(
  encounter: Encounter,
  nameCard: NameCard
): CardData {
  const { id: _id, ...nameCardFields } = nameCard;

  if (encounter.consent && encounter.selfieUri) {
    return {
      variant: "personalized",
      nameCard: nameCardFields,
      qrTargetUrl: QR_TARGET_URL,
      selfieUri: encounter.selfieUri,
      place: encounter.place,
      timestamp: encounter.timestamp,
    };
  }

  return {
    variant: "generic",
    nameCard: nameCardFields,
    qrTargetUrl: QR_TARGET_URL,
  };
}
