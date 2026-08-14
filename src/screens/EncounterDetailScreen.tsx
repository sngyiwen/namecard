import { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import {
  getEncounter,
  getNameCard,
  updateEncounter,
  deleteEncounter,
} from "../db/repository";
import type { Encounter, NameCard } from "../db/schema";
import { deriveCardData } from "../cards/cardData";
import { ShareCardButton } from "../cards/ShareCardButton";

export function EncounterDetailScreen({
  route,
  navigation,
}: RootScreenProps<"EncounterDetail">) {
  const { encounterId } = route.params;
  const [encounter, setEncounter] = useState<Encounter | undefined>();
  const [nameCard, setNameCard] = useState<NameCard | undefined>();
  const [editing, setEditing] = useState(false);
  const [personName, setPersonName] = useState("");
  const [place, setPlace] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([getEncounter(db, encounterId), getNameCard(db)]).then(
        ([row, card]) => {
          if (cancelled) return;
          if (row) {
            setEncounter(row);
            setPersonName(row.personName);
            setPlace(row.place);
            setTimestamp(row.timestamp);
          }
          setNameCard(card);
        }
      );
      return () => {
        cancelled = true;
      };
    }, [encounterId])
  );

  const handleSaveEdit = async () => {
    setSaving(true);
    const updated = await updateEncounter(db, encounterId, {
      personName,
      place,
      timestamp,
    });
    setEncounter(updated);
    setSaving(false);
    setEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete encounter?",
      "This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteEncounter(db, encounterId);
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  if (!encounter) {
    return (
      <View style={styles.container}>
        <Text>Loading…</Text>
      </View>
    );
  }

  if (editing) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Encounter</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Person's name</Text>
          <TextInput
            style={styles.input}
            value={personName}
            onChangeText={setPersonName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Place</Text>
          <TextInput style={styles.input} value={place} onChangeText={setPlace} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>When</Text>
          <TextInput
            style={styles.input}
            value={timestamp.toLocaleString()}
            onChangeText={(text) => {
              const parsed = new Date(text);
              if (!Number.isNaN(parsed.getTime())) {
                setTimestamp(parsed);
              }
            }}
          />
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => setEditing(false)}
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveEdit}
            disabled={saving || personName.trim().length === 0}
          >
            <Text style={styles.saveButtonText}>
              {saving ? "Saving…" : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
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

      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => setEditing(true)}
        >
          <Text>Edit</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {nameCard && (
        <View style={styles.shareSection}>
          <ShareCardButton card={deriveCardData(encounter, nameCard)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, gap: 8 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
    marginTop: 16,
  },
  title: { fontSize: 20, fontWeight: "600" },
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
  field: { gap: 4 },
  label: { fontSize: 13, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionsRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#eee" },
  saveButton: { backgroundColor: "#111" },
  saveButtonText: { color: "#fff", fontWeight: "600" },
  deleteButton: { backgroundColor: "#c0392b" },
  deleteButtonText: { color: "#fff", fontWeight: "600" },
  shareSection: { marginTop: 16, alignItems: "center" },
});
