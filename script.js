// script.js - NanoMCMod Frontend Logik
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('modForm');
  const result = document.getElementById('result');
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI zurücksetzen
    result.classList.add('hidden');
    error.classList.add('hidden');
    loading.classList.remove('hidden');

    const provider = document.getElementById('aiProvider').value;
    const description = document.getElementById('description').value;

    try {
      if (CONFIG.demoMode) {
        // 🎭 Demo-Modus: Zeige Beispiel-Code
        await new Promise(resolve => setTimeout(resolve, 2000)); // Fake-Ladezeit
        showResult(CONFIG.demoResponse);
      } else {
        // 🔌 Echter API-Aufruf (benötigt Backend!)
        const response = await fetch(CONFIG.apiEndpoints[provider], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt: `Erstelle eine Minecraft Forge 1.20.1 Mod: ${description}`,
            format: 'forge-mod'
          })
        });
        
        if (!response.ok) throw new Error(`API-Fehler: ${response.status}`);
        const data = await response.json();
        showResult(data);
      }
    } catch (err) {
      error.textContent = `❌ Fehler: ${err.message}`;
      error.classList.remove('hidden');
      console.error(err);
    } finally {
      loading.classList.add('hidden');
    }
  });

  function showResult(data) {
    document.getElementById('codePreview').textContent = data.sourceCode || 'Kein Code verfügbar';
    document.getElementById('downloadSrc').href = data.srcZipUrl || '#';
    document.getElementById('downloadJar').href = data.jarUrl || '#';
    result.classList.remove('hidden');
  }
});
