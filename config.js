// config.js - NanoMCMod Einstellungen
const CONFIG = {
  // 🎯 Backend-URLs (auf dein Render-Backend anpassen!)
  apiEndpoints: {
    openai: "https://nanomcmod-backend.onrender.com/api/generate-mod",
    anthropic: "https://nanomcmod-backend.onrender.com/api/generate-mod", 
    google: "https://nanomcmod-backend.onrender.com/api/generate-mod",
    qwen: "https://nanomcmod-backend.onrender.com/api/generate-mod"
  },
  
  // 🎭 Demo-Modus: true = ohne Backend testen, false = echtes Backend
  demoMode: false, // 👈 Auf false setzen, wenn Backend live ist!
  
  // 📦 Demo-Antwort (wird nur bei demoMode: true verwendet)
  demoResponse: {
    success: true,
    sourceCode: `// 🎮 Beispiel-Mod: FeuerBlock.java
// Forge 1.20.1 - Generiert von NanoMCMod

package com.example.firemod;

import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.material.MapColor;

public class FireBlock extends Block {
  
  public FireBlock() {
    super(BlockBehaviour.Properties.of()
      .mapColor(MapColor.COLOR_RED)
      .strength(2.0f, 3.0f)
      .lightLevel(state -> 15));
  }
  
  // 🔥 Hier kommt deine Logik hin!
  // Tipp: Override onRightClick() für Interaktion
}
`,
    downloadLinks: {
      srcZip: "data:application/zip;base64,UEsDBBQAAAAI...", // Demo: leer oder Placeholder
      jar: "data:application/java-archive;base64,UEsDBBQAAAAI..."
    },
    message: "✨ Demo-Code! Für echte .jar-Datei: Backend aktivieren."
  }
};
