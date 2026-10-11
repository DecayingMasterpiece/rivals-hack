/**
 * KAISER HACKS - DATA-DRIVEN DROPS & SITE CONFIGURATION
 * 
 * ==============================================================================
 * THE RIVALS RESISTANCE:
 * Fighting to save Roblox Rivals against closet cheaters.
 * Autonomous Watchdog anti-cheat sentry launching at 100K subscribers.
 * ==============================================================================
 */

const KAISER_SITE_INFO = {
  brandName: "KAISER HACKS",
  brandSubtitle: "The End of All Stories · Saving Roblox Rivals",
  
  // 👉 FRONT-PAGE HERO SHOWCASE VIDEO (Official Rivals ESP Release):
  videoEmbedId: "lD9Qxc41Egg", 
  videoWatchUrl: "https://www.youtube.com/watch?v=lD9Qxc41Egg",

  // 👉 OFFICIAL RADAR DIRECT DOWNLOAD:
  radarDownloadUrl: "downloads/Kaiser-Audio-Radar-v1.0.zip",
  radarSecretHash: "038377ce6cd93768368075691b7086c97ded38d84d469b64740fced9d516628f",

  // 👉 AIM ASSIST DIRECT DOWNLOAD:
  githubReleaseUrl: "https://github.com/toufiqbd4200-sketch/rivals-hack/releases/download/v2.0/KaiserAimAssist-v2.0.zip",
  directDownloadUrl: "downloads/KaiserAimAssist-v2.0.zip",

  // 👉 YOUR YOUTUBE CHANNEL FOR SUBSCRIBE-TO-UNLOCK:
  youtubeSubscribeUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation?sub_confirmation=1",
  discordUrl: "https://discord.com/invite/vRu6bYdTWF",

  rivalStats: {
    kaiserSubs: 28000,
    kaiserSubsLabel: "28K",
    coraxSubs: 30700,
    coraxSubsLabel: "30.7K",
    gap: 2700,
    gapLabel: "2.7K"
  }
};

const KAISER_DROPS = [
  {
    id: "kaiser-audio-radar",
    title: "Kaiser Audio Radar v1.0 (The Equalizer · Audio ESP)",
    subtitle: "Universal Stereo Sound Direction Visualizer (HUD & Radar)",
    status: "active", // "active" | "coming_soon"
    statusLabel: "AVAILABLE NOW · 100% UNBANNABLE",
    tag: "THE EQUALIZER",
    tagColor: "cyan",
    image: "assets/kaiser-radar.png",
    originalPrice: "$39.99",
    currentPrice: "$0.00 FREE",
    downloadUrl: "downloads/Kaiser-Audio-Radar-v1.0.zip",
    fileName: "Kaiser-Audio-Radar-v1.0.zip",
    requiresPassword: true, // Mandatory 2-step verification: Subscribe + 10-Letter Video Password
    passwordHash: "038377ce6cd93768368075691b7086c97ded38d84d469b64740fced9d516628f",
    espVideoUrl: "https://www.youtube.com/watch?v=lD9Qxc41Egg", // Official ESP Video
    downloadLabel: "UNLOCK FREE DOWNLOAD",
    category: "active",
    badge: "100% UNBANNABLE · ACCESSIBILITY STANDARD",
    shortDesc: "Visualizes footsteps and gunfire directly on your crosshair and mini radar. 100% legal, zero memory injection, levels the playing field against closet cheaters.",
    description: "Closet cheaters in Roblox Rivals pay $25/month to Gayrax just to hide behind walls with silent aim, gaslighting legit players into thinking they have pro game sense. Kaiser Audio Radar is the Equalizer. It reads stereo audio loopback directly from your sound card to project real-time footstep and gunfire directions onto your screen. It does not touch Roblox's memory, inject DLLs, or modify game files. It uses the exact same legal principle as Fortnite's Visual Sound Effects wheel. Equalize your ranked lobbies without risking your account, until our Watchdog bans rage cheaters for good.",
    features: [
      "Center Crosshair HUD — Left/right sound brackets flash next to your crosshair so you pre-fire before enemies peek",
      "360° Tactical Mini Radar — Floating compass beam pinpoints enemy movement, reloads, and footsteps",
      "100% Ban-Proof & Hyperion Safe — Pure external sound card loopback analysis with 0 game memory injection",
      "Universal Cross-Platform Engine — Native high-speed Windows app + Universal Mac/Windows Python fallback",
      "Auto-Dependency Installer — 1-click launcher handles setup and audio endpoints automatically",
      "Zero Game File Tampering — Never triggers anti-cheat heuristics; works across all future game updates",
      "Closes the Gap on Closet Cheaters — Punishes $25/mo closet cheat buyers with pure fair-play spatial awareness",
      "1-Click Toggle Controls — Press Home for Crosshair HUD, End for Mini Radar"
    ],
    setupSteps: [
      "Subscribe to Kaiser on YouTube using the confirmation link to support the crusade to save Rivals.",
      "Watch the official video (https://youtu.be/lD9Qxc41Egg) to find the 10-letter secret password in ALL CAPS.",
      "Enter the 10-letter password in the unlock gateway to verify and download 'Kaiser-Audio-Radar-v1.0.zip'.",
      "Extract the ZIP, then run 'Run_Windows.bat' on Windows or 'Run_Mac.command' on Mac.",
      "Select your headphones/speakers from the dropdown, hit Start, and dominate your matches with complete spatial awareness!"
    ],
    stats: {
      latency: "< 0.01ms (Real-time Audio)",
      bans: "0 (100% Legal Accessibility)",
      muscleMemory: "Visual Cues",
      cost: "$0.00 Free Forever"
    }
  },
  {
    id: "kaiser-aim-assist",
    title: "Kaiser Aim Assist v2.1 (Anti-Cheat & Avira Safety Patch)",
    subtitle: "Universal Mouse Anti-Jitter & Aim Stabilizer",
    status: "active",
    statusLabel: "AVAILABLE NOW · CLEAN PATCH",
    tag: "AURA STABILIZER",
    tagColor: "emerald",
    image: "assets/kaiser-logo.jpg",
    originalPrice: "$49.99",
    currentPrice: "$0.00 FREE",
    downloadUrl: "https://github.com/toufiqbd4200-sketch/rivals-hack/releases/download/v2.0/KaiserAimAssist-v2.0.zip",
    fileName: "KaiserAimAssist-v2.0.zip",
    requiresPassword: false,
    downloadLabel: "UNLOCK FREE DOWNLOAD",
    category: "active",
    badge: "100% CLEAN · 1:1 PASSTHROUGH",
    shortDesc: "Strips hand tremors, tension wobbles, and shaky mouse aim. 100% legit, WHQL-signed, Avira safe, infinite aura.",
    description: "Imagine paying $50 a month to a cheat seller named after a bird just to get hardware banned in three business days. Couldn't be me. Kaiser Hacks gives you physical mouse stabilization at the system level. No shady memory injections, no game file tampering—just crystal clean, locked-in aim that feels like natural talent. You hit clips, cheat sellers cry, and everyone wins.",
    features: [
      "Zero Shaky Aim — Removes micro-jitters, hand tension wobbles, and sensor noise",
      "Strict 1:1 Muscle Memory — 1:1 hardware passthrough preserves your exact physical mouse sensitivity",
      "Universal Hardware Compatibility — Works identically on 400, 800, 1600, or 3200 DPI",
      "Official Microsoft WHQL Driver — Authentic certified rawaccel.sys, 0 fake or renamed files",
      "1-Click Emergency Mouse Restore — Includes EMERGENCY-RESTORE-MOUSE.cmd for 100% peace of mind",
      "Zero Antivirus Conflict — Fixed Avira/Defender heuristic false positives with native PE versioning",
      "Zero Artificial Angle Snapping — 0.0° default ensures natural diagonal flicks and headshots",
      "100% Anti-Cheat Safe — Uses clean Windows mouse filter driver (safe on Valorant, Apex, CS2, Rivals)",
      "Smart Discord/Chat Disable — Type freely in chat without the hotkey getting in your way",
      "Head-Level Tracking Lock — Keeps your horizontal crosshair sweeps steady at head height",
      "One-Click Power Toggle — Turn it on or off instantly with a single button press"
    ],
    setupSteps: [
      "Hit the Subscribe button below to unlock your free download.",
      "Download the verified v2.1 ZIP package directly from the high-speed CDN.",
      "Extract the downloaded ZIP package anywhere on your PC.",
      "Right-click 'INSTALL-KAISER.cmd' and select 'Run as Administrator'.",
      "Restart your computer once so Windows attaches the clean mouse filter to your hardware.",
      "Launch 'KaiserAimAssist.exe' and go farm aura in your ranked matches."
    ],
    stats: {
      latency: "< 0.05ms (Zero Lag)",
      bans: "0 (100% Legit)",
      muscleMemory: "Strict 1:1",
      cost: "$0.00 Forever"
    }
  },
  {
    id: "the-watchdog",
    title: "The Watchdog AI (Anti-Cheat Sentry)",
    subtitle: "Autonomous Server-Side Moderator for Nosni Games",
    status: "coming_soon",
    statusLabel: "LAUNCHING AT 100K SUBSCRIBERS / NOSNI PARTNERSHIP",
    tag: "THE WATCHDOG",
    tagColor: "amber",
    image: "assets/espn.jpg",
    originalPrice: "Priceless",
    currentPrice: "$0.00 FOR PLAYERS",
    downloadUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation?sub_confirmation=1",
    requiresPassword: false,
    downloadLabel: "SUBSCRIBE TO SUPPORT THE PETITION",
    category: "upcoming",
    badge: "IN DEVELOPMENT · NOSNI PARTNERSHIP",
    shortDesc: "Autonomous 24/7 backend AI sentry that reviews reported gameplay telemetry and bans rage cheaters within 2–3 minutes.",
    description: "The permanent cure for Rivals cheating. An autonomous digital moderator living inside the server architecture. When players report a cheater, the sentry analyzes raw gameplay telemetry with consent, verifies angular snaps and flight speed, and strikes them with a permanent ban before the match finishes. We are bringing this directly to Nosni Games once we hit 100,000 subscribers and verification.",
    features: [
      "Autonomous 24/7 Server Sentry — Operates continuously without relying on slow manual ticket backlogs",
      "15-Second Telemetry Snapshots — Analyzes player camera angles, impossible flick speeds, and physics anomalies",
      "Instant 2–3 Minute Match Bans — Eradicates rage cheaters before they can complete a single round",
      "Script Signature Suffocation — Fingerprints injector payloads to neutralize cheat updates immediately",
      "Exclusive In-Game Security Badge — Reserved for founding channel subscribers who stood with us from day one"
    ],
    setupSteps: [
      "Subscribe to Kaiser on YouTube to build our subscriber leverage for Nosni Games.",
      "Support every video and short to get the channel verified.",
      "At 100,000 subscribers, we sit down with Nosni Games to integrate The Watchdog directly."
    ],
    stats: {
      latency: "Real-time Telemetry",
      bans: "Instant Server Bans",
      muscleMemory: "Clean Matchmaking",
      cost: "$0.00 Free"
    }
  },
  {
    id: "kaiser-aimbot",
    title: "Kaiser Aimbot (Leverage Software)",
    subtitle: "The Final Leverage Bomb for Developer Attention",
    status: "coming_soon",
    statusLabel: "DROPPING AT 35,000 SUBSCRIBERS",
    tag: "35K MILESTONE",
    tagColor: "purple",
    image: "assets/korex.jpg",
    originalPrice: "$99.99",
    currentPrice: "$0.00 FREE",
    downloadUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation?sub_confirmation=1",
    requiresPassword: false,
    downloadLabel: "SUBSCRIBE FOR 35K DROP",
    category: "upcoming",
    badge: "UNLEASHING AT 35K SUBS",
    shortDesc: "Releasing to the public at 35,000 subscribers on YouTube. The ultimate demonstration of capability.",
    description: "You think an audio radar is where my skill stops? You think an AI watchdog is my limit? When this channel hits 35,000 subscribers, I am releasing my next software: an aimbot. Subscribe now and watch what happens when we unleash undeniable leverage.",
    features: [
      "Demonstration of AI Neural Engineering & Machine Vision",
      "Forces Developers to Acknowledge the Anti-Cheat Crisis",
      "Drops Completely Free at the 35K YouTube Milestone",
      "Zero Paywalls — Destroying Paid Cheat Markets Forever"
    ],
    setupSteps: [
      "Subscribe to Kaiser on YouTube.",
      "Software unlocks automatically the moment the channel crosses 35,000 subscribers."
    ],
    stats: {
      latency: "Frame-Perfect",
      bans: "Community Leverage",
      muscleMemory: "Total Domination",
      cost: "$0.00 Free"
    }
  }
];
