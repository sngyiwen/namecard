import { View, Text, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";

export function SettingsScreen(_props: RootScreenProps<"Settings">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>NameCard profile fields go here (ticket #2).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 20, fontWeight: "600" },
});
