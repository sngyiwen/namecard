import { View, Text, Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import type { CardData } from "./cardData";

export function CardView({ card }: { card: CardData }) {
  return (
    <View style={styles.card}>
      {card.variant === "personalized" && (
        <Image source={{ uri: card.selfieUri }} style={styles.selfie} />
      )}

      <View style={styles.headerText}>
        <Text style={styles.name}>{card.nameCard.name}</Text>
        <Text style={styles.role}>{card.nameCard.role}</Text>
        {card.nameCard.company.length > 0 && (
          <Text style={styles.company}>{card.nameCard.company}</Text>
        )}
      </View>

      <Text style={styles.tagline}>{card.nameCard.tagline}</Text>

      {card.variant === "personalized" && (
        <Text style={styles.encounterMeta}>
          {"We met at:\n"}
          {card.place} · {card.timestamp.toLocaleDateString()}
        </Text>
      )}

      <View style={styles.contactBlock}>
        <Text style={styles.contactLine}>{card.nameCard.email}</Text>
        <Text style={styles.contactLine}>{card.nameCard.phone}</Text>
        <Text style={styles.contactLine}>
          Telegram {card.nameCard.telegramHandle}
        </Text>
        <Text style={styles.contactLine}>X {card.nameCard.xHandle}</Text>
      </View>

      <View style={styles.qrRow}>
        <QRCode value={card.qrTargetUrl} size={72} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  selfie: { width: "100%", height: 180, borderRadius: 12 },
  headerText: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700" },
  role: { fontSize: 13, color: "#555" },
  company: { fontSize: 13, color: "#555" },
  tagline: { fontSize: 14, fontStyle: "italic", color: "#333" },
  encounterMeta: { fontSize: 12, color: "#777" },
  contactBlock: { gap: 2, marginTop: 4 },
  contactLine: { fontSize: 12, color: "#333" },
  qrRow: { alignItems: "center", marginTop: 8 },
});
