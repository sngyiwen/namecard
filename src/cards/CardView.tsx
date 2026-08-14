import { View, Text, Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { FORTY_TWO_LOGO } from "../nameCard/constants";
import type { CardData } from "./cardData";

export function CardView({ card }: { card: CardData }) {
  return (
    <View style={styles.card}>
      {card.variant === "personalized" && (
        <Image source={{ uri: card.selfieUri }} style={styles.selfie} />
      )}

      {card.variant === "personalized" && (
        <Text style={styles.greeting}>Hello 👋🏼 {card.personName}</Text>
      )}

      <View style={styles.headerText}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{card.nameCard.name}</Text>
          <Image
            source={FORTY_TWO_LOGO}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
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
        <Text style={styles.contactLine}>
          {"You can contact me at:\n"}
          {card.nameCard.email}
        </Text>
        <Text style={styles.contactLine}>{card.nameCard.phone}</Text>
        <Text style={styles.contactLine}>
          Telegram {card.nameCard.telegramHandle}
        </Text>
        <Text style={styles.contactLine}>X {card.nameCard.xHandle}</Text>

        <View style={styles.qrRow}>
          <QRCode value={card.qrTargetUrl} size={72} />
        </View>
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
  headerText: { alignItems: "flex-start" },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  logo: { width: 32, height: 32 },
  name: { fontSize: 18, fontWeight: "700", textAlign: "left" },
  role: { fontSize: 13, color: "#555", textAlign: "left" },
  company: { fontSize: 13, color: "#555", textAlign: "left" },
  tagline: { fontSize: 14, fontStyle: "italic", color: "#333", textAlign: "left" },
  greeting: { fontSize: 15, fontWeight: "600", color: "#111", textAlign: "left" },
  encounterMeta: { fontSize: 12, color: "#777", textAlign: "left" },
  contactBlock: { gap: 2, marginTop: 4, alignItems: "flex-start" },
  contactLine: { fontSize: 12, color: "#333", textAlign: "left" },
  qrRow: { alignItems: "flex-start", marginTop: 8 },
});
