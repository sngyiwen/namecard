import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { NewEncounterScreen } from "../screens/NewEncounterScreen";
import { EncounterDetailScreen } from "../screens/EncounterDetailScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

export type RootStackParamList = {
  Home: undefined;
  NewEncounter: undefined;
  EncounterDetail: { encounterId: number };
  Settings: undefined;
};

export type RootScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "History" }}
        />
        <Stack.Screen
          name="NewEncounter"
          component={NewEncounterScreen}
          options={{ title: "New Encounter" }}
        />
        <Stack.Screen
          name="EncounterDetail"
          component={EncounterDetailScreen}
          options={{ title: "Encounter" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
