# Karto

Karto is a mobile app (built with Expo) that replaces a physical name card. It generates a shareable card image the moment you meet someone — optionally with a selfie taken together — and lets you look back on who you've met, where, and when.

## How it works

- **NameCard**: your own static profile — name, role, company, tagline, email, phone, Telegram handle, X handle, and a QR code linking to a URL of your choice. There's exactly one, editable from the Settings screen.
- **Encounter**: a record of meeting someone — their name, place, timestamp, a consent flag, and an optional selfie. Fully editable and deletable.
- **Consent**: captured *before* the camera opens. If declined, no selfie is taken or stored.
- **Card image**: the shareable image generated from an Encounter. Personalized (selfie + place + date + NameCard fields) if consent was given; generic (NameCard fields only) if not. Always includes the QR code.
- **History**: the on-device list of every past Encounter.

Everything is stored locally on-device (SQLite via Drizzle) — no backend, no login, no sync across devices. Sharing goes through the native OS share sheet.

## Tech stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (React Native)
- TypeScript
- Drizzle ORM + expo-sqlite (better-sqlite3 for tests)
- React Navigation
- Jest for tests

## Getting started

```
make start
```

This installs dependencies and launches the Expo dev server. Then either:

- Scan the QR code with the **Expo Go** app on your phone, or
- Press `i` / `a` in the terminal to open an iOS Simulator / Android emulator.

Other commands:

```
make ios      # open in iOS simulator
make android  # open in Android emulator
make web      # run in browser
make test     # run the Jest suite
```

## Building & installing on a real Android device (sideloading)

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) to produce an installable `.apk` without needing Android Studio.

1. Install the EAS CLI and log in (one-time):
   ```
   npm install -g eas-cli
   eas login
   ```
2. Link this project to your Expo account (one-time):
   ```
   eas build:configure
   ```
3. Build an APK:
   ```
   eas build -p android --profile preview
   ```
4. Download the resulting `.apk` from the link EAS prints (or from expo.dev), transfer it to your phone, and open it to install. You may need to allow "Install unknown apps" for whichever app you used to download it (browser, Files, etc.).

Build profiles are defined in `eas.json`:
- `preview` — internal-distribution `.apk`, for sideloading.
- `production` — for Play Store submission (`.aab`).
- `development` — dev client build for local development against native modules.

## Project layout

```
src/
  cards/       card rendering + derivation logic
  db/          schema, repository, table setup (Drizzle)
  encounters/  location helpers
  nameCard/    static assets/constants for the NameCard
  navigation/  React Navigation setup
  screens/     Home, New Encounter, Encounter Detail, Settings
```
