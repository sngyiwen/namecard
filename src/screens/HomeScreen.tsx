import { View, Text, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";

export function HomeScreen(_props: RootScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text>Encounter list goes here (ticket #5).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 20, fontWeight: "600" },
});
