import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import { listEncounters } from "../db/repository";
import type { Encounter } from "../db/schema";

export function HomeScreen({ navigation }: RootScreenProps<"Home">) {
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      listEncounters(db).then((rows) => {
        if (!cancelled) setEncounters(rows);
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={encounters}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No encounters logged yet — tap "New Encounter" to add one.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() =>
              navigation.navigate("EncounterDetail", { encounterId: item.id })
            }
          >
            {item.selfieUri ? (
              <Image source={{ uri: item.selfieUri }} style={styles.thumb} />
            ) : (
              <View style={styles.thumbPlaceholder} />
            )}
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{item.personName}</Text>
              <Text style={styles.rowMeta}>
                {item.place} · {item.timestamp.toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("NewEncounter")}
      >
        <Text style={styles.buttonText}>New Encounter</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  thumb: { width: 44, height: 44, borderRadius: 22 },
  thumbPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eee",
  },
  rowText: { flex: 1 },
  rowName: { fontSize: 16, fontWeight: "500" },
  rowMeta: { fontSize: 13, color: "#777" },
  button: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
