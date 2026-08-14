import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { RootScreenProps } from "../navigation/RootNavigator";
import { db } from "../db/client";
import { getNameCard, saveNameCard, type NameCardFields } from "../db/repository";
import { QR_TARGET_URL, SUTD_LOGO } from "../nameCard/constants";

const EMPTY_FIELDS: NameCardFields = {
  name: "",
  role: "",
  company: "",
  tagline: "",
  email: "",
  phone: "",
  telegramHandle: "",
  xHandle: "",
};

const FIELD_LABELS: { key: keyof NameCardFields; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "company", label: "Company" },
  { key: "tagline", label: "Tagline" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "telegramHandle", label: "Telegram handle" },
  { key: "xHandle", label: "X handle" },
];

export function SettingsScreen(_props: RootScreenProps<"Settings">) {
  const [fields, setFields] = useState<NameCardFields>(EMPTY_FIELDS);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getNameCard(db).then((card) => {
        if (!cancelled) {
          const { id: _id, ...rest } = card;
          setFields(rest);
        }
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const handleSave = async () => {
    await saveNameCard(db, fields);
    setSavedAt(Date.now());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.logoRow}>
        <Image source={SUTD_LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.qrText}>QR links to: {QR_TARGET_URL}</Text>
      </View>

      {FIELD_LABELS.map(({ key, label }) => (
        <View key={key} style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={fields[key]}
            onChangeText={(text) =>
              setFields((prev) => ({ ...prev, [key]: text }))
            }
            placeholder={label}
          />
        </View>
      ))}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
      {savedAt !== null && <Text style={styles.savedNotice}>Saved</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "600" },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: { width: 48, height: 48 },
  qrText: { flex: 1, color: "#555" },
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
  savedNotice: { textAlign: "center", color: "#2a2" },
});
