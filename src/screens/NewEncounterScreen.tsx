import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import { createEncounter } from "../db/repository";
import { getCurrentPlace } from "../encounters/location";

type Step = "consent" | "noPhotoForm" | "photoComingSoon";

export function NewEncounterScreen({
  navigation,
}: RootScreenProps<"NewEncounter">) {
  const [step, setStep] = useState<Step>("consent");
  const [personName, setPersonName] = useState("");
  const [place, setPlace] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (step !== "noPhotoForm") return;
    getCurrentPlace().then(setPlace);
  }, [step]);

  const handleSave = async () => {
    setSaving(true);
    await createEncounter(db, {
      personName,
      place,
      timestamp,
      consent: false,
      selfieUri: null,
    });
    setSaving(false);
    navigation.navigate("Home");
  };

  if (step === "consent") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Encounter</Text>
        <Text style={styles.question}>
          Did they agree to a photo together?
        </Text>
        <View style={styles.consentRow}>
          <Pressable
            style={styles.consentButton}
            onPress={() => setStep("photoComingSoon")}
          >
            <Text style={styles.consentButtonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={styles.consentButton}
            onPress={() => setStep("noPhotoForm")}
          >
            <Text style={styles.consentButtonText}>No</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (step === "photoComingSoon") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Encounter</Text>
        <Text>Selfie capture is coming in the next ticket (#4).</Text>
        <Pressable
          style={styles.linkButton}
          onPress={() => setStep("consent")}
        >
          <Text>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Encounter</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Person's name</Text>
        <TextInput
          style={styles.input}
          value={personName}
          onChangeText={setPersonName}
          placeholder="Who did you meet?"
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

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
        disabled={saving || personName.trim().length === 0}
      >
        <Text style={styles.saveButtonText}>
          {saving ? "Saving…" : "Save"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "600" },
  question: { fontSize: 16 },
  consentRow: { flexDirection: "row", gap: 12 },
  consentButton: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  consentButtonText: { color: "#fff", fontWeight: "600" },
  linkButton: { paddingVertical: 8 },
  field: { gap: 4 },
  label: { fontSize: 13, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
});
