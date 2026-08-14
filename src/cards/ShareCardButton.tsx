import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ViewShot, { captureRef, type ViewShotRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { CardView } from "./CardView";
import type { CardData } from "./cardData";

// Renders the Card off-screen-ish (but still mounted, since view-shot needs a
// laid-out view to capture) and hands the captured PNG to the OS share sheet.
export function ShareCardButton({ card }: { card: CardData }) {
  const viewShotRef = useRef<ViewShotRef>(null);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (!viewShotRef.current) return;
    setSharing(true);
    try {
      const uri = await captureRef(viewShotRef, { format: "png", quality: 1 });
      await Sharing.shareAsync(uri, { mimeType: "image/png" });
    } finally {
      setSharing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
        <CardView card={card} />
      </ViewShot>

      <Pressable
        style={styles.shareButton}
        onPress={handleShare}
        disabled={sharing}
      >
        <Text style={styles.shareButtonText}>
          {sharing ? "Preparing…" : "Share Card"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 12 },
  shareButton: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  shareButtonText: { color: "#fff", fontWeight: "600" },
});
