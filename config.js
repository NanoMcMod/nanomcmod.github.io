// config.js - Einstellungen für NanoMCMod
const CONFIG = {
  // ⚠️ WICHTIG: API-Keys gehören NICHT ins Frontend!
  // Diese Endpunkte zeigen auf dein eigenes Backend (später)
  apiEndpoints: {
    openai: "https://DEIN-BACKEND.com/api/openai",
    anthropic: "https://DEIN-BACKEND.com/api/anthropic",
    google: "https://DEIN-BACKEND.com/api/google",
    qwen: "https://DEIN-BACKEND.com/api/qwen"
  },
  
  // Für Demo-Modus (ohne Backend):
  demoMode: true, // Auf false setzen, wenn Backend fertig ist
  
  // Beispiel-Response für Demo
  demoResponse: {
    sourceCode: `// Beispiel-Mod: FeuerBlock.java
public class FireBlock extends Block {
  public FireBlock() {
    super(Properties.of().strength(2.0f));
  }
  @Override
  public void onRightClick(...) {
    // Feuer spucken Logik hier
  }
}`,
    jarUrl: "#", // Placeholder
    srcZipUrl: "#"
  }
};
