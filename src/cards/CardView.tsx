import { View, Text, Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { FORTY_TWO_LOGO, SUTD_LOGO } from "../nameCard/constants";
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

      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={FORTY_TWO_LOGO} style={styles.logo} resizeMode="contain" />
          <Image source={SUTD_LOGO} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{card.nameCard.name}</Text>
          <Text style={styles.role}>{card.nameCard.role}</Text>
          {card.nameCard.company.length > 0 && (
            <Text style={styles.company}>{card.nameCard.company}</Text>
          )}
        </View>
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
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoRow: { flexDirection: "row", gap: 6 },
  logo: { width: 32, height: 32 },
  headerText: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700" },
  role: { fontSize: 13, color: "#555" },
  company: { fontSize: 13, color: "#555" },
  tagline: { fontSize: 14, fontStyle: "italic", color: "#333" },
  greeting: { fontSize: 15, fontWeight: "600", color: "#111" },
  encounterMeta: { fontSize: 12, color: "#777" },
  contactBlock: { gap: 2, marginTop: 4 },
  contactLine: { fontSize: 12, color: "#333" },
  qrRow: { alignItems: "flex-start", marginTop: 8 },
});
