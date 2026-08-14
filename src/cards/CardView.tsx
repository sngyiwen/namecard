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
        <Text style={styles.greeting}>{"Hello 👋🏼"}</Text>
      )}

      <View style={styles.headerText}>
        <Text style={styles.myNameIs}>{"My Name is"}</Text>
        <Text style={styles.name}>{card.nameCard.name}</Text>
        <Text style={styles.role}>{card.nameCard.role}</Text>
        <Image
          source={FORTY_TWO_LOGO}
          style={styles.logo}
          resizeMode="contain"
        />
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
          <Image
            source={SUTD_LOGO}
            style={styles.sutdLogo}
            resizeMode="contain"
          />
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
  headerText: { alignItems: "flex-start", gap: 4 },
  logo: { width: 140, height: 52, marginTop: 6 },
  name: { fontSize: 25, fontWeight: "700", textAlign: "left" },
  role: { fontSize: 13, color: "#555", textAlign: "left" },
  myNameIs: { fontSize: 13, color: "#555", textAlign: "left", marginBottom: -4 },
  company: { fontSize: 13, color: "#555", textAlign: "left" },
  tagline: { fontSize: 14, fontStyle: "italic", color: "#333", textAlign: "left" },
  greeting: { fontSize: 40, color: "#777", textAlign: "left" },
  encounterMeta: { fontSize: 12, color: "#777", textAlign: "left" },
  contactBlock: { gap: 2, marginTop: 4, alignItems: "flex-start" },
  contactLine: { fontSize: 12, color: "#333", textAlign: "left" },
  qrRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 },
  sutdLogo: { width: 72, height: 72 },
});
