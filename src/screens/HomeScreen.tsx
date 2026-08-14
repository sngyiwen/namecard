import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import { listEncounters, deleteEncounter } from "../db/repository";
import type { Encounter } from "../db/schema";

export function HomeScreen({ navigation }: RootScreenProps<"Home">) {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const swipeableRefs = useRef(new Map<number, Swipeable>());

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

  const handleDelete = (id: number) => {
    Alert.alert("Delete encounter?", "This can't be undone.", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => swipeableRefs.current.get(id)?.close(),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteEncounter(db, id);
          swipeableRefs.current.delete(id);
          setEncounters((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

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
          <Swipeable
            ref={(ref) => {
              if (ref) swipeableRefs.current.set(item.id, ref);
              else swipeableRefs.current.delete(item.id);
            }}
            renderRightActions={() => (
              <Pressable
                style={styles.deleteAction}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteActionText}>Delete</Text>
              </Pressable>
            )}
          >
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
          </Swipeable>
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
    backgroundColor: "#fff",
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
  deleteAction: {
    backgroundColor: "#c0392b",
    justifyContent: "center",
    alignItems: "center",
    width: 88,
  },
  deleteActionText: { color: "#fff", fontWeight: "600" },
  button: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
