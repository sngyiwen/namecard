import { View, Text, Pressable, StyleSheet } from "react-native";
import type { RootScreenProps } from "../navigation/RootNavigator";

export function HomeScreen({ navigation }: RootScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text>Encounter list goes here (ticket #5).</Text>

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
  title: { fontSize: 20, fontWeight: "600" },
  button: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
