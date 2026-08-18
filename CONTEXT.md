# Namecard

A mobile app (Expo Go) that replaces a physical name card. It generates a shareable card image at the moment you meet someone, optionally including a selfie taken together, and lets you look back on who you've met, where, and when.

## Language

**NameCard**:
Your own static profile: name, role, tagline, email, phone number, Telegram handle, X handle, SUTD logo, and QR code (linking to a URL of your choice). Singular — there is exactly one, editable via a settings screen (except the logo, which is a bundled static asset).
_Avoid_: Card, profile

**Encounter**:
A record of meeting one person: their name (freeform text), place, timestamp, a consent flag, and an optional selfie. Belongs to your NameCard. Supports full create/edit/delete, and is persisted locally.
_Avoid_: Meeting, contact, connection

**Consent**:
A boolean captured *before* the camera opens, asking whether the other person agrees to a selfie. If declined, no selfie is taken or stored — the Encounter's `selfie` field stays null.
_Avoid_: Permission, opt-in

**Card image**:
The rendered, shareable image generated from an Encounter. Personalized (selfie + place + date + NameCard fields) if consent was given; generic (NameCard fields only, no photo) if not. Every card image has the QR code baked in. Can be regenerated and re-shared anytime from the history list, not just at creation.
_Avoid_: Shared card, export

**History**:
The persistent, on-device list of all past Encounters, viewable and editable at any time.
_Avoid_: Log, feed

## Notes

- Storage is local-only (on-device DB) — no backend, no login, no sync across devices.
- Sharing happens via the native OS share sheet (Expo Share API); the app does not send messages itself.
