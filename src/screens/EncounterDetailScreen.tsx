import { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import { getEncounter } from "../db/repository";
import type { Encounter } from "../db/schema";

export function EncounterDetailScreen({
  route,
}: RootScreenProps<"EncounterDetail">) {
  const { encounterId } = route.params;
  const [encounter, setEncounter] = useState<Encounter | undefined>();

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getEncounter(db, encounterId).then((row) => {
        if (!cancelled) setEncounter(row);
      });
      return () => {
        cancelled = true;
      };
    }, [encounterId])
  );

  if (!encounter) {
    return (
      <View style={styles.container}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {encounter.selfieUri ? (
        <Image source={{ uri: encounter.selfieUri }} style={styles.selfie} />
      ) : (
        <View style={styles.selfiePlaceholder}>
          <Text style={styles.selfiePlaceholderText}>No photo</Text>
        </View>
      )}

      <Text style={styles.name}>{encounter.personName}</Text>
      <Text style={styles.meta}>{encounter.place}</Text>
      <Text style={styles.meta}>{encounter.timestamp.toLocaleString()}</Text>
      <Text style={styles.meta}>
        Consent: {encounter.consent ? "Yes" : "No"}
      </Text>

      <Text style={styles.todo}>
        Edit, delete, and share go here (tickets #6, #7, #8).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  selfie: { width: "100%", height: 240, borderRadius: 8 },
  selfiePlaceholder: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  selfiePlaceholderText: { color: "#999" },
  name: { fontSize: 22, fontWeight: "600", marginTop: 8 },
  meta: { fontSize: 15, color: "#555" },
  todo: { marginTop: 16, color: "#999" },
});
