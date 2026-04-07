# 🎮 NanoMCMod

> KI-gestützte Minecraft Mod-Generierung

## 🌐 Live-Demo
[https://nanomcmod.github.io](https://nanomcmod.github.io)

## 🚀 Funktionsweise (Demo)
1. Wähle eine KI (ChatGPT, Claude, Gemini, Qwen)
2. Beschreibe deine Mod-Idee
3. Erhalte generierten Quellcode + .jar-Download *(Demo: Beispiel-Code)*

## ⚠️ Wichtiger Hinweis
Diese GitHub Pages-Seite ist **statisch**. Für echte KI-Generierung benötigst du:
- Ein Backend mit API-Keys (z.B. Node.js + Express auf Render/Railway)
- Minecraft Mod Build-Pipeline (Gradle)

## 🔧 Backend-Idee (für später)
```javascript
// Beispiel: server.js (Node.js)
app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;
  // 1. Prompt an OpenAI senden
  // 2. Antwort parsen → Java-Code extrahieren
  // 3. Code in Forge-Template einfügen
  // 4. Mit Gradle .jar bauen (oder zum Download vorbereiten)
  res.json({ sourceCode, jarUrl, srcZipUrl });
});
