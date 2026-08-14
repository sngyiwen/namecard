import { View, Text, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";

export function NewEncounterScreen(_props: RootScreenProps<"NewEncounter">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Encounter</Text>
      <Text>Consent prompt, camera, and save flow go here (tickets #3, #4).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 20, fontWeight: "600" },
});
