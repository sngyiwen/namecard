import * as Location from "expo-location";

// Best-effort place lookup for pre-filling the Encounter form. Returns "" on
// denied permission or lookup failure so the field is simply left blank and
// editable rather than blocking Encounter creation.
export async function getCurrentPlace(): Promise<string> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return "";
    }

    const position = await Location.getCurrentPositionAsync({});
    const [place] = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    if (!place) {
      return "";
    }

    return [place.name ?? place.street, place.city, place.country]
      .filter(Boolean)
      .join(", ");
  } catch {
    return "";
  }
}
