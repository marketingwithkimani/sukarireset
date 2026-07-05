# Sukari Reset Ecosystem

Welcome to the official repository for **Sukari Reset**, a premium health companion for Kenyans living with Type 2 diabetes and prediabetes.

This project is a unified ecosystem containing:
1. **Marketing Website** (Root): The official storytelling, membership, and distribution platform.
2. **Companion App** (`/app`): The interactive React application designed for mobile distribution.

---

## 🏗️ Project Structure

- `/` - PHP-based Marketing Website
- `/app` - Vite/React/TypeScript Companion Application
- `/assets` - Shared assets and build artifacts (including the Android APK)
- `/views` - Website pages (Story, Membership, Payment, Download)
- `/js` - Website logic and routing
- `/includes` - Shared website components (Navbar, Footer)

---

## 🚀 Development

### 1. Website
The website is built with PHP and Vanilla JS/GSAP.
To run locally using PHP's built-in server:
```bash
npm run website:dev
```
Then visit `http://localhost:8000`.

### 2. Companion App
The app is a React application.
```bash
cd app
npm install
npm run dev
```
Then visit `http://localhost:3000`.

---

## 📦 Build & Integration

### Distributing the App
The website distributes the Android application via a secure APK download.
To update the distributed APK:
1. Generate the release APK in your Android build environment (Capacitor/Native).
2. Move the APK to `assets/Sukari_Reset_Companion.apk` or run:
```bash
npm run collect-apk
```

### Consistent Branding
The ecosystem uses a shared design system:
- **Primary Emerald**: `#2D6A4F` / `#0A1710`
- **Brand Gold**: `#cfa85c`
- **Typography**: Outfit, Space Grotesk, Playfair Display

---

## ✅ Integration Checklist

- [x] Shared branding and typography
- [x] Seamless flow from Story -> Membership -> Payment -> Download
- [x] Dedicated Download page with installation guide
- [x] Unified build system via root `package.json`
- [x] Production-ready metadata and SEO

---

© 2026 Sukari Reset. Built for Kenyans, for health, for life.
