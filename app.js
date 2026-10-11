/**
 * KAISER HACKS - APP LOGIC (PERFORMANCE OPTIMIZED)
 * Dynamic drops rendering, live search, category filtering,
 * interactive Sellix-style modal, Web Audio cues, Confetti burst,
 * automated YouTube video embed connection, and high-converting Subscribe + Video-Key Gateway.
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM References
  const dropsContainer = document.getElementById("drops-container");
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const showcaseIframe = document.getElementById("showcase-iframe");

  // Product Modal
  const productModal = document.getElementById("product-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalDownloadBtn = document.getElementById("modal-download-btn");

  // Unlock Modal
  const unlockModal = document.getElementById("unlock-modal");
  const unlockCloseBtn = document.getElementById("unlock-close-btn");
  const btnSubAction = document.getElementById("btn-sub-action");
  const btnDlFinal = document.getElementById("btn-dl-final");
  const dlVerifiedNote = document.getElementById("dl-verified-note");
  const btnAlreadySubbed = document.getElementById("btn-already-subbed");
  const stepSubBox = document.getElementById("step-sub-box");
  const stepDlBox = document.getElementById("step-dl-box");
  const stepDlLabel = document.getElementById("step-dl-label");
  const dlButtonGroup = document.getElementById("dl-button-group");
  const unlockModalTitle = document.getElementById("unlock-modal-title");
  const unlockModalDesc = document.getElementById("unlock-modal-desc");

  // Password Input in Unlock Modal
  const passwordStepContainer = document.getElementById("password-step-container");
  const unlockPassInput = document.getElementById("unlock-pass-input");
  const btnVerifyKey = document.getElementById("btn-verify-key");
  const passErrorMsg = document.getElementById("pass-error-msg");

  // State
  let currentCategory = "all";
  let searchQuery = "";
  let activeDropItem = (typeof KAISER_DROPS !== "undefined" && KAISER_DROPS.length > 0) ? KAISER_DROPS[0] : null;
  let isAuraUnlocked = localStorage.getItem("kaiser_aura_unlocked") === "true";
  let isRadarUnlocked = localStorage.getItem("kaiser_radar_unlocked") === "true";

  // ============================================================================
  // 1. YouTube Video Embed Auto-Connector & Autoplay Controller
  // ============================================================================
  function initYouTubeShowcase() {
    if (!showcaseIframe || typeof KAISER_SITE_INFO === "undefined" || !KAISER_SITE_INFO.videoEmbedId) return;
    
    const raw = KAISER_SITE_INFO.videoEmbedId.trim();
    let videoId = raw;

    // Smart regex: extracts 11-char ID from full URLs or returns raw string
    const match = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    }

    const soundPrompt = document.getElementById("video-sound-prompt");
    const btnUnmute = document.getElementById("btn-unmute-sound");

    // Standard high-converting autoplay: starts playing immediately on page load
    showcaseIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&controls=1&rel=0`;

    function playWithSound() {
      try {
        showcaseIframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        showcaseIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } catch (_) {}

      if (showcaseIframe.src.includes("mute=1")) {
        showcaseIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&enablejsapi=1&controls=1&rel=0`;
      }

      if (soundPrompt) {
        soundPrompt.classList.add("hidden");
      }
    }

    if (btnUnmute) {
      btnUnmute.addEventListener("click", (e) => {
        e.stopPropagation();
        playClickSound();
        playWithSound();
      });
    }

    document.querySelectorAll('a[href="#showcase"]').forEach(link => {
      link.addEventListener("click", () => {
        playWithSound();
        const wrapper = document.querySelector(".showcase-video-wrapper");
        if (wrapper) {
          wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    if (window.location.hash === "#showcase" || window.location.search.includes("play=1") || window.location.search.includes("video=1")) {
      const onFirstInteract = () => {
        playWithSound();
        window.removeEventListener("click", onFirstInteract);
        window.removeEventListener("keydown", onFirstInteract);
      };
      window.addEventListener("click", onFirstInteract, { once: true });
      window.addEventListener("keydown", onFirstInteract, { once: true });
    }
  }

  initYouTubeShowcase();

  // ============================================================================
  // 2. Audio Synthesis Cues (Web Audio API - Zero External Network Latency)
  // ============================================================================
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClickSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (_) {}
  }

  function playUnlockSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (_) {}
  }

  function playErrorSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (_) {}
  }

  // ============================================================================
  // 3. Confetti Particle Celebration (GPU Optimized Canvas)
  // ============================================================================
  function fireConfetti() {
    const canvas = document.getElementById("celebration-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#10B981", "#06B6D4", "#38BDF8", "#F59E0B", "#FFFFFF", "#34D399"];
    const particles = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2 - 50,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.2) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.35,
        alpha: 1
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function renderParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rSpeed;
        if (elapsed > 1000) {
          p.alpha -= 0.02;
        }

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive && elapsed < 2600) {
        animationFrame = requestAnimationFrame(renderParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
        canvas.style.display = "none";
      }
    }

    renderParticles();
  }

  // ============================================================================
  // 4. Toast Notifications
  // ============================================================================
  function showToast(message, icon = "⚡") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate3d(0, 20px, 0)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // ============================================================================
  // 5. Render Weekly Drop Cards
  // ============================================================================
  function renderDrops() {
    if (!dropsContainer || typeof KAISER_DROPS === "undefined") return;

    dropsContainer.innerHTML = "";

    const filtered = KAISER_DROPS.filter(item => {
      const matchesCategory = 
        currentCategory === "all" ||
        (currentCategory === "active" && item.status === "active") ||
        (currentCategory === "upcoming" && item.status === "coming_soon");

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      dropsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-secondary);">
          <p style="font-size: 18px; font-weight: 700;">No tools found matching "${escapeHtml(searchQuery)}"</p>
          <p style="font-size: 13px; margin-top: 8px;">Check back next week for fresh drops!</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = `drop-card ${item.status === "coming_soon" ? "coming-soon" : ""}`;
      card.setAttribute("data-id", item.id);

      const isItemUnlocked = item.requiresPassword 
        ? (localStorage.getItem("kaiser_radar_unlocked") === "true") 
        : (localStorage.getItem("kaiser_aim_unlocked") === "true");
      const btnLabel = item.status === "active" 
        ? (isItemUnlocked ? "DOWNLOAD NOW" : (item.requiresPassword ? "KEY UNLOCK" : "SUBSCRIBE TO UNLOCK")) 
        : "DETAILS";

      card.innerHTML = `
        <div class="card-image-box">
          <span class="card-tag ${item.tagColor}">${escapeHtml(item.tag)}</span>
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-subtitle">${escapeHtml(item.subtitle)}</p>
          <div class="card-footer">
            <div class="card-pricing">
              <span class="price-original">${escapeHtml(item.originalPrice)}</span>
              <span class="price-current">${escapeHtml(item.currentPrice)}</span>
            </div>
            <button class="btn-card" type="button">
              ${btnLabel} →
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        playClickSound();
        openProductModal(item);
      });

      dropsContainer.appendChild(card);
    });
  }

  // ============================================================================
  // 6. Product Modal Handler
  // ============================================================================
  function openProductModal(item) {
    if (!productModal) return;
    activeDropItem = item;

    document.getElementById("modal-img").src = item.image;
    document.getElementById("modal-tag").textContent = item.tag;
    document.getElementById("modal-tag").className = `modal-badge ${item.tagColor}`;
    document.getElementById("modal-title").textContent = item.title;
    document.getElementById("modal-orig-price").textContent = item.originalPrice;
    document.getElementById("modal-price").textContent = item.currentPrice;
    document.getElementById("modal-desc").textContent = item.description;

    // Stats
    document.getElementById("stat-latency").textContent = item.stats.latency;
    document.getElementById("stat-bans").textContent = item.stats.bans;
    document.getElementById("stat-memory").textContent = item.stats.muscleMemory;
    document.getElementById("stat-cost").textContent = item.stats.cost;

    // Features
    const featList = document.getElementById("modal-features");
    featList.innerHTML = "";
    item.features.forEach(f => {
      const li = document.createElement("li");
      li.className = "modal-feature-item";
      li.innerHTML = `<span class="modal-feature-bullet">✔</span><span>${escapeHtml(f)}</span>`;
      featList.appendChild(li);
    });

    // Modal CTA Button text based on status and unlock state
    if (item.status === "active") {
      const isItemUnlocked = item.requiresPassword 
        ? (localStorage.getItem("kaiser_radar_unlocked") === "true") 
        : (localStorage.getItem("kaiser_aim_unlocked") === "true");

      if (isItemUnlocked) {
        modalDownloadBtn.textContent = "⚡ DIRECT DOWNLOAD (.ZIP FREE)";
      } else if (item.requiresPassword) {
        modalDownloadBtn.textContent = "⚡ ENTER VIDEO KEY TO UNLOCK →";
      } else {
        modalDownloadBtn.textContent = "⚡ SUBSCRIBE TO UNLOCK DOWNLOAD →";
      }
    } else {
      modalDownloadBtn.textContent = "🔔 SUBSCRIBE FOR EARLY ACCESS →";
    }

    productModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      playClickSound();
      closeProductModal();
    });
  }

  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) {
        closeProductModal();
      }
    });
  }

  // Modal Download Action
  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener("click", () => {
      playClickSound();
      if (!activeDropItem) return;

      if (activeDropItem.status === "coming_soon") {
        window.open(KAISER_SITE_INFO.youtubeSubscribeUrl, "_blank", "noopener,noreferrer");
        showToast("Opening Kaiser's channel! Subscribe to get notified on drop day.", "🔔");
        return;
      }

      const isItemUnlocked = activeDropItem.requiresPassword 
        ? (localStorage.getItem("kaiser_radar_unlocked") === "true") 
        : (localStorage.getItem("kaiser_aim_unlocked") === "true");

      if (isItemUnlocked) {
        triggerDirectDownload(activeDropItem);
      } else {
        closeProductModal();
        openUnlockGateway(activeDropItem);
      }
    });
  }

  // ============================================================================
  // 7. Subscribe-to-Unlock + Password Gateway Modal
  // ============================================================================
  function openUnlockGateway(item) {
    activeDropItem = item;
    if (!unlockModal) return;

    updateUnlockUI();
    unlockModal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (item && item.requiresPassword && unlockPassInput) {
      setTimeout(() => unlockPassInput.focus(), 250);
    }
  }

  function closeUnlockGateway() {
    if (!unlockModal) return;
    unlockModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateUnlockUI() {
    isAuraUnlocked = localStorage.getItem("kaiser_aura_unlocked") === "true";
    isRadarUnlocked = localStorage.getItem("kaiser_radar_unlocked") === "true";
    const isAimUnlocked = localStorage.getItem("kaiser_aim_unlocked") === "true";
    const needsPassword = activeDropItem && activeDropItem.requiresPassword;
    const isAimAssist = activeDropItem && activeDropItem.id === "kaiser-aim-assist";
    const videoCallout = document.getElementById("video-watch-callout");

    if (passErrorMsg) {
      passErrorMsg.style.display = "none";
      passErrorMsg.textContent = "";
    }

    if (needsPassword) {
      // Audio Radar flow (Subscribe + 10-Letter Video Key)
      if (videoCallout) videoCallout.style.display = "block";
      if (unlockModalTitle) unlockModalTitle.textContent = "Unlock Kaiser Audio Radar";
      if (unlockModalDesc) {
        unlockModalDesc.innerHTML = "Subscribe to Kaiser on YouTube, then watch the official video (<a href='https://youtu.be/lD9Qxc41Egg' target='_blank' rel='noopener noreferrer' style='color:var(--color-cyan);text-decoration:underline;'>https://youtu.be/lD9Qxc41Egg</a>) to find the <b>10-letter secret password in ALL CAPS</b> to unlock your clean download.";
      }

      if (isRadarUnlocked) {
        if (stepSubBox) stepSubBox.classList.add("completed");
        if (stepDlBox) stepDlBox.classList.add("completed");
        if (passwordStepContainer) passwordStepContainer.style.display = "none";
        if (dlButtonGroup) dlButtonGroup.style.display = "flex";
        if (btnDlFinal) {
          btnDlFinal.disabled = false;
          btnDlFinal.className = "btn-dl-unlocked";
          btnDlFinal.innerHTML = `<span>🔓 DOWNLOAD KAISER AUDIO RADAR (.ZIP FREE)</span>`;
        }
        if (dlVerifiedNote) {
          dlVerifiedNote.style.display = "block";
          dlVerifiedNote.textContent = "✓ Verified Clean · Kaiser-Audio-Radar-v1.0.zip · 100% Free & Unbannable";
        }
        if (stepDlLabel) stepDlLabel.textContent = "Key Verified · Ready for Download";
      } else {
        if (passwordStepContainer) passwordStepContainer.style.display = "flex";
        if (dlButtonGroup) dlButtonGroup.style.display = "none";
        if (dlVerifiedNote) dlVerifiedNote.style.display = "none";
        if (stepDlLabel) stepDlLabel.textContent = "Watch Video & Enter 10-Letter Key";

        if (isAuraUnlocked) {
          if (stepSubBox) stepSubBox.classList.add("completed");
        } else {
          if (stepSubBox) stepSubBox.classList.remove("completed");
        }
      }
    } else {
      // Kaiser Aim Assist / Non-password flow (Subscribe to Unlock)
      if (videoCallout) videoCallout.style.display = "none";
      if (passwordStepContainer) passwordStepContainer.style.display = "none";
      if (dlButtonGroup) dlButtonGroup.style.display = "flex";

      if (unlockModalTitle) {
        unlockModalTitle.textContent = isAimAssist ? "Subscribe to Unlock Kaiser Aim Assist" : "Subscribe to Unlock Download";
      }
      if (unlockModalDesc) {
        unlockModalDesc.innerHTML = "Subscribe to Kaiser on YouTube to support the Rivals Resistance. Once subscribed, your clean download unlocks immediately for <b>$0.00 free</b>.";
      }

      if (isAimUnlocked) {
        if (stepSubBox) stepSubBox.classList.add("completed");
        if (stepDlBox) stepDlBox.classList.add("completed");
        if (btnDlFinal) {
          btnDlFinal.disabled = false;
          btnDlFinal.className = "btn-dl-unlocked";
          const label = activeDropItem && activeDropItem.fileName ? `DIRECT DOWNLOAD (${activeDropItem.fileName})` : "DIRECT DOWNLOAD (.ZIP FREE)";
          btnDlFinal.innerHTML = `<span>🔓 ${label}</span>`;
        }
        if (dlVerifiedNote) {
          dlVerifiedNote.style.display = "block";
          dlVerifiedNote.textContent = "✓ Microsoft WHQL Signed · KaiserAimAssist-v2.0.zip · 100% Free & Anti-Cheat Safe";
        }
        if (stepDlLabel) stepDlLabel.textContent = "Subscribed · Ready for Download";
      } else {
        if (stepSubBox) stepSubBox.classList.remove("completed");
        if (stepDlBox) stepDlBox.classList.remove("completed");
        if (btnDlFinal) {
          btnDlFinal.disabled = true;
          btnDlFinal.className = "btn-dl-locked";
          btnDlFinal.innerHTML = `<span>🔒 Locked · Subscribe to Step 1 to Unlock</span>`;
        }
        if (dlVerifiedNote) dlVerifiedNote.style.display = "none";
        if (stepDlLabel) stepDlLabel.textContent = "Step 2: Download Software (Unlocked by Step 1)";
      }
    }
  }

  // SHA-256 helper for client-side password hash comparison (Zero plaintext in code)
  async function computeSha256(str) {
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  // Security anti-guess rate limiter
  let lockoutInterval = null;
  function checkLockoutStatus() {
    const lockoutUntil = parseInt(sessionStorage.getItem("kaiser_lockout_until") || "0", 10);
    const now = Date.now();
    if (lockoutUntil > now) {
      const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
      if (passErrorMsg) {
        passErrorMsg.innerHTML = `🔒 <b>Cooldown Active:</b> Too many incorrect guesses. Watch the full video (<a href="https://youtu.be/lD9Qxc41Egg" target="_blank" rel="noopener noreferrer" style="color:var(--color-cyan);text-decoration:underline;">https://youtu.be/lD9Qxc41Egg</a>) to find the 10-letter key.<br>Please wait <b>${remainingSec}s</b> before guessing again.`;
        passErrorMsg.style.display = "block";
      }
      if (unlockPassInput) unlockPassInput.disabled = true;
      if (btnVerifyKey) btnVerifyKey.disabled = true;
      if (!lockoutInterval) {
        lockoutInterval = setInterval(() => checkLockoutStatus(), 1000);
      }
      return true;
    } else {
      if (lockoutInterval) {
        clearInterval(lockoutInterval);
        lockoutInterval = null;
      }
      sessionStorage.removeItem("kaiser_lockout_until");
      if (unlockPassInput) unlockPassInput.disabled = false;
      if (btnVerifyKey) btnVerifyKey.disabled = false;
      return false;
    }
  }

  // Password verification logic
  async function handlePasswordVerify() {
    if (!unlockPassInput) return;
    if (checkLockoutStatus()) return;

    const rawVal = unlockPassInput.value.trim().toUpperCase().replace(/[\s-]/g, "");
    if (!rawVal) {
      if (passErrorMsg) {
        passErrorMsg.innerHTML = `⚠️ Please enter the 10-letter password. <a href="https://youtu.be/lD9Qxc41Egg" target="_blank" rel="noopener noreferrer" style="color:var(--color-cyan);text-decoration:underline;">Watch the video here</a> to find it.`;
        passErrorMsg.style.display = "block";
      }
      return;
    }

    if (rawVal.length !== 10) {
      let attempts = parseInt(sessionStorage.getItem("kaiser_pass_attempts") || "0", 10) + 1;
      sessionStorage.setItem("kaiser_pass_attempts", attempts.toString());
      playErrorSound();
      if (attempts >= 3) {
        sessionStorage.setItem("kaiser_lockout_until", (Date.now() + 30000).toString());
        sessionStorage.setItem("kaiser_pass_attempts", "0");
        checkLockoutStatus();
        return;
      }
      if (passErrorMsg) {
        passErrorMsg.innerHTML = `❌ Key must be exactly <b>10 letters in ALL CAPS</b> (${attempts}/3 guesses used). Watch the full video: <a href="https://youtu.be/lD9Qxc41Egg" target="_blank" rel="noopener noreferrer" style="color:var(--color-cyan);text-decoration:underline;">https://youtu.be/lD9Qxc41Egg</a>`;
        passErrorMsg.style.display = "block";
      }
      unlockPassInput.classList.add("shake-error");
      setTimeout(() => unlockPassInput.classList.remove("shake-error"), 500);
      return;
    }

    const targetHash = (activeDropItem && activeDropItem.passwordHash) 
      ? activeDropItem.passwordHash 
      : (window.KAISER_SITE_INFO && KAISER_SITE_INFO.radarSecretHash ? KAISER_SITE_INFO.radarSecretHash : "038377ce6cd93768368075691b7086c97ded38d84d469b64740fced9d516628f");

    const inputHash = await computeSha256(rawVal);

    if (inputHash === targetHash) {
      sessionStorage.removeItem("kaiser_pass_attempts");
      sessionStorage.removeItem("kaiser_lockout_until");
      playUnlockSound();
      fireConfetti();
      localStorage.setItem("kaiser_radar_unlocked", "true");
      isRadarUnlocked = true;
      isAuraUnlocked = true;
      localStorage.setItem("kaiser_aura_unlocked", "true");
      showToast("Access Granted! 10-Letter Key Verified 🎉", "🎉");
      updateUnlockUI();
      renderDrops();
      triggerDirectDownload(activeDropItem);
    } else {
      let attempts = parseInt(sessionStorage.getItem("kaiser_pass_attempts") || "0", 10) + 1;
      sessionStorage.setItem("kaiser_pass_attempts", attempts.toString());
      playErrorSound();
      if (attempts >= 3) {
        sessionStorage.setItem("kaiser_lockout_until", (Date.now() + 30000).toString());
        sessionStorage.setItem("kaiser_pass_attempts", "0");
        checkLockoutStatus();
      } else {
        if (passErrorMsg) {
          passErrorMsg.innerHTML = `❌ Invalid Key! (${attempts}/3 guesses used). The password is a 10-letter key in ALL CAPS scattered across the YouTube video: <a href="https://youtu.be/lD9Qxc41Egg" target="_blank" rel="noopener noreferrer" style="color:var(--color-cyan);text-decoration:underline;">https://youtu.be/lD9Qxc41Egg</a> (No skipping!).`;
          passErrorMsg.style.display = "block";
        }
        unlockPassInput.classList.add("shake-error");
        setTimeout(() => unlockPassInput.classList.remove("shake-error"), 500);
        showToast("Incorrect key! Watch the YouTube video.", "⚠️");
      }
    }
  }

  if (btnVerifyKey) {
    btnVerifyKey.addEventListener("click", () => {
      playClickSound();
      handlePasswordVerify();
    });
  }

  if (unlockPassInput) {
    unlockPassInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
    unlockPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        playClickSound();
        handlePasswordVerify();
      }
    });
  }

  if (unlockCloseBtn) {
    unlockCloseBtn.addEventListener("click", () => {
      playClickSound();
      closeUnlockGateway();
    });
  }

  if (unlockModal) {
    unlockModal.addEventListener("click", (e) => {
      if (e.target === unlockModal) {
        closeUnlockGateway();
      }
    });
  }

  // Step 1: Subscribe Action Click
  if (btnSubAction) {
    btnSubAction.addEventListener("click", () => {
      playClickSound();
      const isAimAssist = activeDropItem && activeDropItem.id === "kaiser-aim-assist";

      if (stepDlLabel) stepDlLabel.textContent = "Checking Subscription Status...";
      if (btnDlFinal) {
        btnDlFinal.innerHTML = `<span>⚡ Verifying Subscription... (3s)</span>`;
        btnDlFinal.style.borderColor = "var(--color-cyan)";
      }

      setTimeout(() => {
        isAuraUnlocked = true;
        localStorage.setItem("kaiser_aura_unlocked", "true");
        if (isAimAssist) {
          localStorage.setItem("kaiser_aim_unlocked", "true");
        }
        updateUnlockUI();
        playUnlockSound();
        fireConfetti();
        showToast(isAimAssist ? "Subscribed! Kaiser Aim Assist Unlocked 🎉" : "Subscription Verified! Step 1 Complete.", "🎉");
        renderDrops();
      }, 3200);
    });
  }

  // Step 2: Download Button Click (Standard flow)
  if (btnDlFinal) {
    btnDlFinal.addEventListener("click", () => {
      if (activeDropItem && activeDropItem.requiresPassword) {
        const isKeyUnlocked = localStorage.getItem("kaiser_radar_unlocked") === "true";
        if (!isKeyUnlocked) return;
      } else {
        const isAimUnlocked = localStorage.getItem("kaiser_aim_unlocked") === "true";
        if (!isAimUnlocked) return;
      }
      playClickSound();
      triggerDirectDownload(activeDropItem);
    });
  }

  // Bypass Action: "Already Subscribed?"
  if (btnAlreadySubbed) {
    btnAlreadySubbed.addEventListener("click", () => {
      playClickSound();
      isAuraUnlocked = true;
      localStorage.setItem("kaiser_aura_unlocked", "true");
      const isAimAssist = activeDropItem && activeDropItem.id === "kaiser-aim-assist";
      if (isAimAssist) {
        localStorage.setItem("kaiser_aim_unlocked", "true");
        playUnlockSound();
        fireConfetti();
        showToast("Subscription Verified! Kaiser Aim Assist Unlocked 🎉", "🎉");
      } else {
        playUnlockSound();
        showToast("Subscription verified! Now enter the 10-letter video password.", "🔑");
      }
      updateUnlockUI();
      renderDrops();
    });
  }

  // Trigger file download
  function triggerDirectDownload(item) {
    let downloadUrl = (item && item.downloadUrl) ? item.downloadUrl : "downloads/Kaiser-Audio-Radar-v1.0.zip";
    let fileName = (item && item.fileName) ? item.fileName : "Kaiser-Audio-Radar-v1.0.zip";
    
    if (item && item.id === "kaiser-aim-assist" && typeof KAISER_SITE_INFO !== "undefined" && KAISER_SITE_INFO.githubReleaseUrl) {
      downloadUrl = KAISER_SITE_INFO.githubReleaseUrl.trim();
    }

    showToast(`Launching ${item ? item.title : 'download'}...`, "🚀");

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    if (downloadUrl.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Global ESC key listener for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (unlockModal && unlockModal.classList.contains("open")) {
        closeUnlockGateway();
      } else if (productModal && productModal.classList.contains("open")) {
        closeProductModal();
      }
    }
  });

  // ============================================================================
  // 8. Category Filter Buttons
  // ============================================================================
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      playClickSound();
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderDrops();
    });
  });

  // ============================================================================
  // 9. Search Input Filter
  // ============================================================================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderDrops();
    });
  }

  // ============================================================================
  // 10. Utility: XSS-safe escape
  // ============================================================================
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initial render
  renderDrops();
});
