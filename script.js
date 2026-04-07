// script.js - NanoMCMod Frontend Logik (Backend-Connected 🚀)
// Diese Datei verbindet deine GitHub Pages-Seite mit dem Render-Backend

document.addEventListener('DOMContentLoaded', () => {
  // 🔍 Elemente aus dem HTML holen
  const form = document.getElementById('modForm');
  const result = document.getElementById('result');
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const codePreview = document.getElementById('codePreview');
  const downloadSrc = document.getElementById('downloadSrc');
  const downloadJar = document.getElementById('downloadJar');
  const aiProvider = document.getElementById('aiProvider');
  const description = document.getElementById('description');

  // 🎯 Formular-Submit behandeln
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Verhindert Seiten-Neuladen
    
    // 🧹 UI zurücksetzen
    resetUI();
    
    // 📥 Nutzer-Eingaben holen
    const selectedProvider = aiProvider.value;
    const userDescription = description.value.trim();
    
    // ✅ Validierung: Ist die Beschreibung leer?
    if (!userDescription) {
      showError('Bitte beschreibe zuerst deine Mod-Idee! 🎮');
      return;
    }
    
    // ⏳ Lade-Status anzeigen
    setLoading(true);

    try {
      let responseData;
      
      if (CONFIG.demoMode) {
        // 🎭 DEMO-MODUS: Simuliere API-Antwort (kein Backend nötig)
        console.log('🎭 Demo-Modus aktiv - simuliere Antwort...');
        await simulateDelay(1500); // 1.5 Sekunde warten (wie echtes API)
        responseData = CONFIG.demoResponse;
        responseData.message = '✨ Demo-Code generiert! (Echtes Backend noch nicht verbunden)';
      } else {
        // 🔌 PRODUKTION: Echter API-Aufruf an dein Render-Backend
        console.log(`🔄 Sende Anfrage an ${selectedProvider}...`);
        
        responseData = await callBackendAPI(selectedProvider, userDescription);
      }
      
      // ✅ Erfolg: Ergebnis anzeigen
      showResult(responseData);
      
    } catch (err) {
      // ❌ Fehler behandeln
      console.error('❌ Fehler bei der Mod-Generierung:', err);
      showError(`Fehler: ${err.message || 'Unbekannter Fehler'}`);
      
    } finally {
      // 🔄 Immer: Lade-Status ausblenden
      setLoading(false);
    }
  });

  // ─────────────────────────────────────────────────────
  // 🧰 HELPER-FUNKTIONEN (Noob-friendly erklärt)
  // ─────────────────────────────────────────────────────

  /**
   * 📡 Ruft das Backend auf und holt die generierte Mod
   * @param {string} provider - Welche KI (openai, anthropic, google, qwen)
   * @param {string} prompt - Die Mod-Beschreibung vom Nutzer
   * @returns {Promise<Object>} - Die Antwort vom Backend
   */
  async function callBackendAPI(provider, prompt) {
    // 🔗 Backend-URL aus config.js holen
    const endpoint = CONFIG.apiEndpoints[provider];
    
    if (!endpoint) {
      throw new Error(`Keine URL für Provider "${provider}" in config.js gefunden!`);
    }

    // 📤 POST-Request an Backend senden
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: User-Agent für Analytics
        'X-NanoMCMod-Client': 'frontend-v0.1'
      },
      body: JSON.stringify({
        provider: provider,        // 👈 WICHTIG: Welche KI soll verwendet werden?
        prompt: `Erstelle eine Minecraft Forge 1.20.1 Mod: ${prompt}`,
        format: 'forge-mod',       // Format: Forge-Mod (später erweiterbar auf Fabric)
        version: '1.20.1'          // Minecraft Version
      })
    });

    // 🚨 HTTP-Fehler abfangen (4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Server-Antwort: ${response.status} ${response.statusText}\n${errorData.details || ''}`
      );
    }

    // 📥 JSON-Antwort parsen
    const data = await response.json();
    
    // ✅ Backend-Fehler im Response-Body prüfen
    if (!data.success) {
      throw new Error(data.error || 'Backend meldete einen Fehler');
    }
    
    return data;
  }

  /**
   * 🎭 Simuliert eine API-Antwort für den Demo-Modus
   */
  async function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * ✅ Zeigt das Ergebnis mit Code und Downloads an
   * @param {Object} data - Die Antwort vom Backend/Demo
   */
  function showResult(data) {
    // 📝 Quellcode anzeigen (mit Syntax-Highlighting-Vorbereitung)
    codePreview.textContent = data.sourceCode || '// Kein Code verfügbar';
    
    // 📦 Download-Links setzen
    if (data.downloadLinks?.srcZip) {
      downloadSrc.href = data.downloadLinks.srcZip;
      downloadSrc.classList.remove('disabled');
    } else {
      downloadSrc.href = '#';
      downloadSrc.classList.add('disabled');
    }
    
    if (data.downloadLinks?.jar) {
      downloadJar.href = data.downloadLinks.jar;
      downloadJar.classList.remove('disabled');
    } else {
      downloadJar.href = '#';
      downloadJar.classList.add('disabled');
    }
    
    // 💬 Optional: Nachricht vom Backend anzeigen
    if (data.message) {
      const messageEl = document.createElement('p');
      messageEl.className = 'info-message';
      messageEl.textContent = data.message;
      
      // Alte Nachrichten entfernen
      const oldMsg = result.querySelector('.info-message');
      if (oldMsg) oldMsg.remove();
      
      result.insertBefore(messageEl, result.firstChild);
    }
    
    // 🎉 Ergebnis-Bereich einblenden
    result.classList.remove('hidden');
    
    // 📜 Zum Ergebnis scrollen (mobil-freundlich)
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * ❌ Zeigt eine Fehlermeldung an
   * @param {string} message - Die Fehlermeldung
   */
  function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    
    // 🔔 Optional: Fehler kurz hervorheben (Animation)
    error.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(-10px)', opacity: 0.8 },
      { transform: 'translateX(10px)', opacity: 0.8 },
      { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 300 });
  }

  /**
   * ⏳ Setzt den Lade-Status
   * @param {boolean} isLoading - true = laden, false = fertig
   */
  function setLoading(isLoading) {
    if (isLoading) {
      loading.classList.remove('hidden');
      form.querySelector('button[type="submit"]').disabled = true;
      form.querySelector('button[type="submit"]').textContent = '⏳ Generiere...';
    } else {
      loading.classList.add('hidden');
      form.querySelector('button[type="submit"]').disabled = false;
      form.querySelector('button[type="submit"]').textContent = '✨ Mod generieren';
    }
  }

  /**
   * 🧹 Setzt die komplette UI zurück (vor neuem Request)
   */
  function resetUI() {
    result.classList.add('hidden');
    error.classList.add('hidden');
    
    // Alte Info-Nachrichten entfernen
    const oldMsg = result.querySelector('.info-message');
    if (oldMsg) oldMsg.remove();
    
    // Code-Preview leeren
    codePreview.textContent = '';
  }

  // ─────────────────────────────────────────────────────
  // 🎁 BONUS: Live-Preview der Beschreibung (optional)
  // ─────────────────────────────────────────────────────
  
  // Zeigt Zeichenanzahl an (hilfreich für lange Prompts)
  description.addEventListener('input', () => {
    const count = description.value.length;
    const max = description.maxLength || 1000;
    
    // Optional: Counter im HTML hinzufügen:
    // <small id="charCount">0/1000</small>
    const counter = document.getElementById('charCount');
    if (counter) {
      counter.textContent = `${count}/${max}`;
      counter.style.color = count > max * 0.9 ? '#ff6b6b' : '#888';
    }
  });

  // ─────────────────────────────────────────────────────
  // 🎯 INITIALISIERUNG
  // ─────────────────────────────────────────────────────
  
  console.log('🎮 NanoMCMod Frontend geladen!');
  console.log('🔗 Backend-URLs:', CONFIG.apiEndpoints);
  console.log('🎭 Demo-Modus:', CONFIG.demoMode ? 'AKTIV' : 'DEAKTIVIERT');
  
  // Fokus auf das Beschreibungsfeld setzen (bessere UX)
  description.focus();
});
