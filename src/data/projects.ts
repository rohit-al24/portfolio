import type { Project } from "./types";

/**
 * PROJECT DATA — modular & easy to extend.
 *
 * To add a new project:
 *  1. Add a new object to the `projects` array below.
 *  2. Give it a unique `id` (used in the URL `/projects/:id`).
 *  3. Add its `id` to the `related` arrays of the projects it should
 *     cross-link with.
 *
 * IMPORTANT — honesty rules:
 *  - `status` marks whether a project is finished, in development,
 *    a working prototype, or a concept. Never claim something is
 *    implemented when it is not.
 *  - `screenshots` are described placeholders. Replace them with real
 *    image paths when actual captures exist (see ProjectCover component).
 */

export const projects: Project[] = [
  {
    id: "kiranya",
    number: "01",
    title: "KIRANYA",
    category: "AI Assistant",
    status: "In Development",
    shortDescription:
      "An intelligent, voice-controlled virtual assistant that automates everyday tasks and provides interactive assistance.",
    overview:
      "KIRANYA is a secure, voice-first virtual assistant built to make daily computing hands-free. It listens for a wake word, understands spoken commands, and then carries out real automation — launching applications, browsing the web, controlling the mouse and keyboard, and responding conversationally. The vision is a trusted personal assistant that keeps security at its core, with face authentication planned as a future layer.",
    problem:
      "Repetitive desktop tasks and manual web navigation consume time and require constant hands-on attention. Existing assistants are either cloud-locked, lack real automation depth, or expose users to privacy concerns. The goal was an assistant that could act locally on the machine — reliably, and with a clear path toward stronger security.",
    solution:
      "KIRANYA combines speech recognition with a modular automation engine. A wake-word detector keeps the assistant idle until called, after which spoken commands are parsed and dispatched to automation modules (PyAutoGUI for desktop control, Selenium for web automation, OpenCV for visual verification and future authentication). A text-to-speech layer (pyttsx3) provides natural spoken responses.",
    features: [
      "Voice interaction & spoken responses",
      "Wake-word detection",
      "Speech recognition pipeline",
      "Application & system automation",
      "Web browsing automation via Selenium",
      "Conversational assistant interaction",
      "Future face authentication integration",
    ],
    technologies: [
      "Python",
      "Speech Recognition",
      "pyttsx3",
      "OpenCV",
      "Selenium",
      "PyAutoGUI",
      "Web Automation",
    ],
    contribution:
      "Designed the overall architecture and built the voice pipeline end-to-end — from wake-word detection and speech-to-command parsing to the automation modules that execute tasks on the desktop and in the browser.",
    challenges: [
      "Achieving reliable wake-word detection across varying ambient noise.",
      "Making speech-to-command parsing robust to different phrasings.",
      "Coordinating long-running automation without freezing the voice loop.",
      "Designing the security model so future face authentication slots in cleanly.",
    ],
    accent: "#C02655",
    icon: "mic",
    github: null,
    demo: null,
    screenshots: [
      { title: "Voice Command Flow", caption: "Placeholder — replace with a real capture of the voice pipeline." },
      { title: "Automation Dashboard", caption: "Placeholder — replace with a real capture of task automation." },
      { title: "Assistant Conversation", caption: "Placeholder — replace with a real capture of the assistant chat." },
    ],
    related: ["secure-vision", "talentime"],
  },
  {
    id: "medora",
    number: "02",
    title: "MEDORA",
    category: "Desktop Application",
    status: "Concept",
    shortDescription:
      "A modern desktop hospital management application concept for patient records, staff, medicines and appointments.",
    overview:
      "MEDORA is a desktop hospital management system concept designed to bring order to the daily operations of a clinic or small hospital. It centralizes patient records, employee management, medicine inventory and appointment tracking in a single fast, native-feeling desktop application — with a WhatsApp integration concept for instant patient communication and automated receipt generation.",
    problem:
      "Small and mid-sized healthcare facilities often juggle paper records, disconnected spreadsheets and ad-hoc appointment books. Patient history, staff details and medicine stock live in separate places, making daily operations slow and error-prone.",
    solution:
      "MEDORA proposes a unified desktop application covering the core operational loop: a dashboard for at-a-glance status, structured employee and patient management, medicine records, appointment tracking, receipt generation, and a WhatsApp integration concept to notify patients and send receipts.",
    features: [
      "Unified dashboard",
      "Employee management",
      "Patient management & entry",
      "Medicine management",
      "Appointment tracking",
      "WhatsApp integration concept",
      "Receipt generation",
    ],
    technologies: [
      "Tauri",
      "Rust",
      "React",
      "JavaScript",
      "Database Integration",
    ],
    contribution:
      "Defined the product concept, mapped the core operational workflows (patients, staff, medicines, appointments), and designed the module structure for the Tauri + React desktop architecture.",
    challenges: [
      "Choosing a desktop stack that stays lightweight while feeling native.",
      "Modelling the data relationships between patients, staff and medicines.",
      "Designing receipt generation and WhatsApp messaging as pluggable modules.",
    ],
    accent: "#A51F4B",
    icon: "hospital",
    github: null,
    demo: null,
    screenshots: [
      { title: "Dashboard", caption: "Placeholder — replace with a real dashboard capture." },
      { title: "Patient Records", caption: "Placeholder — replace with a real patient management capture." },
      { title: "Appointments", caption: "Placeholder — replace with a real appointment view." },
    ],
    related: ["kiranya", "talentime"],
  },
  {
    id: "secure-vision",
    number: "03",
    title: "SECURE VISION",
    category: "IoT / Systems",
    status: "Prototype",
    shortDescription:
      "A Linux-based camera streaming and secure browser-access system built around Raspberry Pi hardware.",
    overview:
      "SECURE VISION turns a Raspberry Pi into a self-hosted camera streaming node. It captures a live camera feed, streams it over the network, and exposes it securely through a browser — protected by an authentication gateway. Systemd services keep the pipeline running automatically, surviving reboots and background restarts.",
    problem:
      "Off-the-shelf IP cameras often rely on cloud services with opaque privacy guarantees. Building a self-hosted, browser-accessible camera stream on low-cost hardware requires stitching together several moving parts — capture, encoding, streaming protocols and authentication.",
    solution:
      "The project combines FFmpeg for capture and encoding with MediaMTX as the media server, streaming over RTSP and exposing the feed to browsers via WebRTC. A lightweight authentication gateway guards browser access. Bash scripts and systemd units handle startup, monitoring and background process management.",
    features: [
      "Live camera streaming",
      "Browser-based camera access",
      "Authentication gateway",
      "Automatic service startup (systemd)",
      "Background process management",
      "Network configuration",
      "Linux service monitoring",
    ],
    technologies: [
      "Raspberry Pi",
      "Linux",
      "MediaMTX",
      "FFmpeg",
      "RTSP",
      "WebRTC",
      "systemd",
      "Bash",
    ],
    contribution:
      "Set up the end-to-end streaming pipeline on the Raspberry Pi — capture, encoding, media server configuration, WebRTC browser delivery — and hardened it with an authentication gateway and systemd service automation.",
    challenges: [
      "Tuning FFmpeg encoding for low-latency streaming on limited Pi hardware.",
      "Bridging RTSP to browser-friendly WebRTC playback.",
      "Keeping services alive across reboots with systemd.",
      "Securing the feed behind authentication without breaking playback.",
    ],
    accent: "#7A1838",
    icon: "camera",
    github: null,
    demo: null,
    screenshots: [
      { title: "Live Feed", caption: "Placeholder — replace with a real browser capture of the stream." },
      { title: "Auth Gateway", caption: "Placeholder — replace with a real capture of the login flow." },
      { title: "Service Status", caption: "Placeholder — replace with a real systemd status capture." },
    ],
    related: ["kiranya", "medora"],
  },
  {
    id: "talentime",
    number: "04",
    title: "TALENTIME",
    category: "EdTech Platform",
    status: "Concept",
    shortDescription:
      "An interactive language-learning platform focused on Japanese vocabulary, grammar, kanji and conversation.",
    overview:
      "TALENTIME is a gamified language-learning platform concept for Japanese learners. It structures the journey around N5/N4 progression — vocabulary, grammar and kanji lessons reinforced by roleplay conversations — while XP and streaks keep learners motivated and coming back.",
    problem:
      "Language apps often teach isolated words without meaningful practice, and few combine structured JLPT-aligned content with realistic conversation practice. Learners lose momentum without visible progress and streaks.",
    solution:
      "TALENTIME combines structured N5/N4 lesson tracks with interactive roleplay conversations, then wraps the experience in progress tracking, XP and a streak system. A Flutter client pairs with a Django backend for accounts, content and progress persistence.",
    features: [
      "Japanese N5/N4 learning tracks",
      "Vocabulary lessons",
      "Grammar lessons",
      "Kanji practice",
      "Roleplay conversations",
      "Learning progress tracking",
      "XP and streak system",
    ],
    technologies: ["Flutter", "React", "Django", "Database Integration"],
    contribution:
      "Shaped the product concept and learning flow, mapped the N5/N4 content structure, and designed the gamification model (XP, streaks, progress) around a Django-backed API.",
    challenges: [
      "Structuring JLPT-aligned content into clean lesson tracks.",
      "Designing roleplay conversation flows that adapt to learner level.",
      "Modelling progress, XP and streaks in the data layer.",
    ],
    accent: "#B32852",
    icon: "language",
    github: null,
    demo: null,
    screenshots: [
      { title: "Lesson Dashboard", caption: "Placeholder — replace with a real lesson screen capture." },
      { title: "Kanji Practice", caption: "Placeholder — replace with a real kanji practice capture." },
      { title: "Roleplay Chat", caption: "Placeholder — replace with a real roleplay capture." },
    ],
    related: ["kiranya", "medora"],
  },
];

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const getRelatedProjects = (project: Project): Project[] =>
  project.related
    .map((id) => getProjectById(id))
    .filter((p): p is Project => Boolean(p));
