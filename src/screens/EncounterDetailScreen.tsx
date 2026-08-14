import { View, Text, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";

export function EncounterDetailScreen({
  route,
}: RootScreenProps<"EncounterDetail">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encounter #{route.params.encounterId}</Text>
      <Text>
        Encounter details, edit/delete, and card sharing go here (tickets #5,
        #6, #7, #8).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 20, fontWeight: "600" },
});
