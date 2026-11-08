# Android build notes

Status: **v3.3.1 debug APK** — `dist/HanziPeak-3.3.1-tv-debug.apk` (~4.5 MB, phone + Android TV), package
`com.hanziquest.app`, versionCode 38, minSdk 23, targetSdk 35. Display name: **HanziPeak**.
HSK 1 (30 lessons) + HSK 2 (75 lessons / 746 words) with unique art for every lesson,
panda gestures, conversation scoring, tone/clarity scoring, stroke practice, local account.

This file records exactly how it was built, what broke, and what to do next. It is deliberately
detailed: the toolchain here has three non-obvious traps.

---

## 1. Toolchain used

| Component | Version / path |
|---|---|
| Node | 22.23.2 |
| npm | 10.9.8 (use `npm.cmd`, not `npm`) |
| JDK for Gradle | 17 — `C:\jdk17\jdk-17.0.20.1+1` |
| JDK for compiling Capacitor | 21 — `C:\Code\ChineseLearning\.tools\jdk-21.0.12.1+1` (downloaded) |
| Android SDK | `C:\Android\Sdk` (build-tools 35.0.0 / 36.0.0, platforms 34–36) |
| Gradle | 8.10.2 (cached distribution) |
| AGP | 8.7.2 |
| Capacitor | 7.6.9 |
| Next.js | 16.4.3 (static export) |

---

## 2. Three traps (and how they were handled)

### 2.1 PowerShell blocks `npm.ps1`

`npm` resolves to `npm.ps1`, which the execution policy refuses to load. Use `npm.cmd` for every
command, or run `Set-ExecutionPolicy -Scope Process Bypass` in the session.

### 2.2 Capacitor 7 compiles with Java 21, but Gradle crashes on the local JDK 21

Capacitor 7 modules declare `sourceCompatibility = JavaVersion.VERSION_21`. With only JDK 17 the
build fails with `error: invalid source release: 21`. A JDK 21 was downloaded, but Gradle then failed
to start:

```
Could not initialize native services.
> Failed to load native library 'native-platform.dll' for Windows 11 amd64.
```

This happened with Gradle 8.10.2 and 8.14.3, with and without `-Dorg.gradle.native=false`
(a likely JDK 21 / native-platform incompatibility on this machine, not a project problem).

**Workaround in place:** Gradle runs on JDK 17, and `android/build.gradle` lowers the Java target of
every Android module to 17 after evaluation:

```gradle
subprojects { sub ->
    sub.afterEvaluate {
        if (sub.plugins.hasPlugin('com.android.library') || sub.plugins.hasPlugin('com.android.application')) {
            sub.android.compileOptions.sourceCompatibility = JavaVersion.VERSION_17
            sub.android.compileOptions.targetCompatibility = JavaVersion.VERSION_17
        }
    }
}
```

This is safe as long as Capacitor does not use Java 21-only language features. Remove it once Gradle
runs on JDK 21 correctly; then also delete the JDK 21 download.

### 2.3 UTF-8 PowerShell scripts are misread by Windows PowerShell 5.1

`tools/make-branding.ps1` originally contained the literal `字`. PowerShell 5.1 reads a UTF-8 file
without BOM as ANSI, so the glyph became mojibake and rendered as `a—` on the icon. Fixed by passing
the codepoint instead:

```powershell
$zi = [string][char]0x5B57
```

If you add more Chinese literals to `.ps1` files, either save with a BOM or use codepoints.

---

## 3. Build commands (reproducible)

```powershell
# 1. web build (static export → out/)
cd C:\Code\ChineseLearning\app
npm.cmd run build

# 2. copy web assets + plugin config into the Android project
node node_modules\@capacitor\cli\bin\capacitor sync android

# 3. APK (Gradle on JDK 17)
$env:JAVA_HOME = 'C:\jdk17\jdk-17.0.20.1+1'
$gradle = 'C:\Users\eddys\.gradle\wrapper\dists\gradle-8.10.2-all\7iv73wktx1xtkvlq19urqw1wm\gradle-8.10.2\bin\gradle.bat'
& $gradle -p android assembleDebug --no-daemon --console=plain

# 4. output
# android\app\build\outputs\apk\debug\app-debug.apk
```

Or use the generated wrapper once it can download Gradle 8.11.1:
`cd android; .\gradlew.bat assembleDebug`.

### Branding assets

```powershell
powershell -ExecutionPolicy Bypass -File tools\make-branding.ps1
```

Regenerates launcher icons (legacy + adaptive foreground), splash screens for all densities, and the
paper/red palette. Rebuild the APK afterwards.

---

## 4. Install on a phone

**Option A — USB (fastest once `adb` is on PATH):**

```powershell
& 'C:\Android\Sdk\platform-tools\adb.exe' install -r dist\HanziQuest-0.1.0-debug.apk
```

Enable **Developer options → USB debugging** first. `adb devices` should list the phone.

**Option B — transfer the file:** copy the APK to the phone (USB, Drive, Telegram), tap it, allow
"install unknown apps" for the file manager, then install.

The APK is debug-signed. That is fine for personal use; a release keystore is needed before the Play
Store (and must be backed up — losing it blocks all future updates).

---

## 5. TTS: what "best free" actually means here

| Option | Cost | Offline | Quality | Status |
|---|---|---|---|---|
| **Android native TTS** (`@capacitor-community/text-to-speech`) | free | ✅ | good; depends on the phone's engine/voice | **shipped** |
| Edge neural voices (Xiaoxiao/Yunxi), baked to MP3 | free but unofficial | ✅ after baking | excellent | blocked here — `speech.platform.bing.com` returns HTTP 200 instead of a WebSocket upgrade |
| Azure neural TTS, baked | free tier (~500k chars/month) | ✅ after baking | excellent | optional, needs a key |
| Google Cloud TTS, baked | free tier | ✅ after baking | excellent | optional, needs a key |

The APK uses the native engine because it is the only option that is free, offline, legal, and needs
no backend. If the phone has no Mandarin voice, the app shows a banner with an **Install voice**
button (opens the system TTS installer).

`tools/bake-audio.mjs` is ready for the neural path. Once it can reach the endpoint:

```powershell
node tools\bake-audio.mjs      # writes public/audio/*.mp3
npm.cmd run build
node node_modules\@capacitor\cli\bin\capacitor sync android
# rebuild APK
```

Design note: keep the native TTS as the fallback for *dynamic* text (dictionary lookups), and use
baked neural MP3s for *fixed lesson content*. That combination is both free and high quality.

---

## 6. What this APK contains (and what it does not)

**Included:** HSK 1 Unit 1 lesson (5 words), EN/ID toggle, 5-question lesson with feedback, story
reader with tap-to-gloss, XP/streak saved to `localStorage`, ability/coverage report screen, native
TTS, haptics, branded icon and splash.

**Not yet:** spaced repetition (FSRS), placement test, speech scoring, audio files, accounts/sync,
more units. This is a taste build to validate the feel, not the full product.

---

## 7. Next steps

1. Install the APK and check: startup speed, icon, TTS voice availability, lesson flow, back button.
2. If TTS is missing, install the Chinese voice from the banner — that is also the test for the
   fallback path.
3. Then Phase 1: FSRS + 20 lessons + real content, still local-first.
4. Play Store only after the app is good: closed testing needs 12 testers for 14 days.
