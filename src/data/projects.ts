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
    id: "idcs",
    number: "01",
    title: "IDCS – KRCT",
    subtitle: "Integrated Data Capturing System",
    category: "Enterprise Institutional ERP Platform",
    status: "Completed",
    shortDescription:
      "A unified, modular and multi-institutional digital ecosystem modernizing academic, administrative and operational activities for KR Institutions.",
    organization: "KR Institutions",
    coreArchitect: "Rohit SK",
    role: "Core Architect | System Designer | Technical Architecture",
    projectType: "Enterprise Institutional ERP Platform",
    architectureType: "Modular, Multi-Institutional Platform",
    idcsLogo: "/assets/idcs/idcs-logo-Ci6ccowJ.png",
    collegeLogo: "/assets/idcs/images.jpg",
    overview:
      "IDCS (Integrated Data Capturing System) is an integrated institutional management ecosystem designed to digitize and streamline academic, administrative, and operational activities across KR Institutions (KRCT, KRCE, MKCE). The platform brings students, faculty, administrators, heads of departments, and management into a unified digital environment. Moving away from disconnected systems and manual spreadsheets, IDCS provides a structured, configuration-driven architecture where institutional data, academic processes, assessment engines, and analytics work together seamlessly.",
    problem:
      "Educational institutions previously relied on fragmented software tools, manual spreadsheet-based assessment workflows, and disconnected administrative databases. This caused data silos between departments, delayed CIA mark processing, error-prone manual Outcome-Based Education (OBE) and CO attainment calculations, and high overhead when managing operations across multiple campuses.",
    solution:
      "Engineered an enterprise-grade, modular web platform with a React/TypeScript frontend and a Python/Django/PostgreSQL backend. IDCS delivers centralized role-based access for 8 distinct user tiers, introduces Academic 2.1 for configuration-driven assessment structures, automates Bloom's Taxonomy (BTL) and Course Outcome (CO) calculations, and features IDCS KeyLite for distributed institutional hosting securely connected via Cloudflare Tunnels.",
    objectives: [
      "Centralize institutional information across all departments and campuses.",
      "Digitize academic, assessment, and administrative workflows end-to-end.",
      "Improve operational efficiency, data accessibility, and audit readiness.",
      "Enable institution-specific module management and customized configurations.",
      "Provide automated Outcome-Based Education (OBE) and CQI analytics.",
      "Establish a robust, scalable foundation supporting multi-institutional expansion.",
    ],
    institutions: [
      { code: "KRCT", name: "K. Ramakrishnan College of Technology" },
      { code: "KRCE", name: "K. Ramakrishnan College of Engineering" },
      { code: "MKCE", name: "M. Kumarasamy College of Engineering" },
    ],
    userEcosystem: [
      {
        role: "Super Administrator",
        points: [
          "Platform-wide system configuration & maintenance",
          "Institution registration, onboarding & license management",
          "Global module permissions & access control policies",
          "Centralized system monitoring, logging & security audits",
        ],
      },
      {
        role: "Institutional Management",
        points: [
          "Executive institutional performance overview",
          "Operational monitoring across all campus departments",
          "Longitudinal academic performance analysis",
          "Automated strategic management reports & KPI tracking",
        ],
      },
      {
        role: "Principal / Head of Institution",
        points: [
          "Campus-wide academic supervision & governance",
          "Department-level activity monitoring & approvals",
          "Institutional accreditation readiness & analytics",
          "Executive reporting & statutory compliance metrics",
        ],
      },
      {
        role: "HOD / Department Administrator",
        points: [
          "Department operations & faculty subject allocation",
          "Curriculum planning & academic calendar compliance",
          "Assessment approval & student performance tracking",
          "Department-level accreditation & audit documentation",
        ],
      },
      {
        role: "Faculty Members",
        points: [
          "Daily course management & student attendance logging",
          "Digital CIA mark entry with automated calculations",
          "Question paper pattern mapping to CO and BTL levels",
          "Direct CO attainment & Continuous Quality Improvement (CQI)",
        ],
      },
      {
        role: "Students",
        points: [
          "Personalized academic portal & course schedule tracking",
          "Real-time attendance & CIA internal assessment breakdown",
          "Subject syllabus, timetable & examination notifications",
          "Student institutional requests & digital services",
        ],
      },
      {
        role: "IQAC / Academic Coordinators",
        points: [
          "Internal quality assurance & OBE evaluation workflows",
          "Course Outcome (CO) and Program Outcome (PO) mapping",
          "Post-assessment gap analysis & CQI implementation",
          "NAAC & NBA accreditation report generation",
        ],
      },
      {
        role: "Administrative Staff",
        points: [
          "Student admissions, profiles & institutional records",
          "Staff records & departmental administrative workflows",
          "Certification issuance & fee/office documentation",
        ],
      },
    ],
    modulesList: [
      {
        title: "Academic Management",
        description:
          "Centralized academic operations, curriculum mapping, course management, subject allocation, and semester scheduling workflows.",
      },
      {
        title: "Internal Assessment Management",
        description:
          "Digital CIA mark-entry workflows, dynamic assessment configuration, question-paper patterns, and real-time mark calculation engines.",
      },
      {
        title: "Outcome-Based Education (OBE)",
        description:
          "Direct CO mapping, Bloom's Taxonomy Level (BTL) distribution, course outcome analysis, and automated attainment calculations.",
      },
      {
        title: "CQI – Continuous Quality Improvement",
        description:
          "Algorithmic identification of student learning gaps, attainment-based improvement analysis, and structured post-assessment evaluations.",
      },
      {
        title: "Faculty Management",
        description:
          "Faculty directory, academic workload allocation, teaching responsibilities, and department-level collaboration tools.",
      },
      {
        title: "Student Management",
        description:
          "Comprehensive student lifecycle tracking, enrollment records, internal grades, attendance statistics, and academic services.",
      },
      {
        title: "Reporting & Analytics",
        description:
          "Executive multi-institution dashboards, academic performance summaries, accreditation-ready audits, and administrative reporting.",
      },
    ],
    academicEngineeringFeatures: [
      "Configurable question paper patterns without code modifications",
      "Dynamic Continuous Internal Assessment (CIA) structures",
      "CO (Course Outcome) and BTL (Bloom's Taxonomy Level) distribution matrices",
      "Automated weighted mark calculation engines",
      "Draft and published assessment states with validation checks",
      "Autosave-based resilient data entry preventing data loss",
      "Structured CQI closed-loop post-assessment workflows",
      "Course-level and program-level analytical reporting exports",
    ],
    keyLiteCapabilities: [
      "Institutional registration, cryptographic machine identification & activation",
      "Central administrator machine approval & module authorization",
      "Automated local PostgreSQL database setup and migration management",
      "Local IDCS microservice hosting on institution-owned hardware",
      "Integrated Cloudflare Tunnel daemon for zero-inbound port exposure",
      "Secure public endpoint routing through custom domains/subdomains",
      "Automated institutional cloud backup integration & storage quota monitoring",
      "Scheduled bi-directional data synchronization with central ecosystem",
    ],
    deploymentWorkflow: [
      "Institution registers with the central IDCS master platform",
      "Registration generates a cryptographically signed activation token",
      "Institution installs the IDCS KeyLite package on host server",
      "Machine submits hardware identification & activation credentials",
      "Central super administrator reviews, approves, and provisions node",
      "Authorized institutional modules and license keys are enabled",
      "Local PostgreSQL database engine is initialized and migrated",
      "IDCS application microservices and background daemons start",
      "Cloudflare Tunnel establishes an encrypted outbound tunnel",
      "Campus users securely access IDCS via authorized subdomains",
    ],
    challengesTable: [
      {
        challenge: "Multiple Institutions & Data Isolation",
        solution: "Multi-institutional tenant architecture with strict database separation and shared ecosystem standards.",
      },
      {
        challenge: "Varying Campus Academic Rules",
        solution: "Configuration-driven assessment templates replacing hardcoded evaluation logic.",
      },
      {
        challenge: "Manual & Error-Prone Mark Entry",
        solution: "Autosaving digital mark entry grids with instant client & server calculation verification.",
      },
      {
        challenge: "Complex OBE & CQI Calculations",
        solution: "Dedicated mathematical computation engine generating CO/PO attainment matrices automatically.",
      },
      {
        challenge: "On-Premise Institutional Hosting Needs",
        solution: "Engineered IDCS KeyLite for automated local node configuration and lifecycle management.",
      },
      {
        challenge: "External Access Without Inbound Ports",
        solution: "Architected Cloudflare Tunnel integration eliminating static IP and firewall port requirements.",
      },
      {
        challenge: "Large-Scale Institutional Reporting",
        solution: "Asynchronous reporting engine generating multi-department accreditation audits on demand.",
      },
      {
        challenge: "Disaster Recovery & Data Integrity",
        solution: "Automated incremental cloud backup synchronization with quota monitoring.",
      },
      {
        challenge: "Granular Hierarchical Access",
        solution: "Comprehensive 8-tier role-based access control (RBAC) matrix enforcing least privilege.",
      },
    ],
    architectResponsibilities: [
      "Designing the overall enterprise system architecture and multi-tier database schemas.",
      "Defining modular application boundaries and reusable service interfaces.",
      "Planning the multi-institutional tenancy and data-isolation framework.",
      "Architecting the Academic 2.1 configuration-driven assessment pipeline.",
      "Developing the mathematical models for OBE, CO attainment, and CQI gap analysis.",
      "Planning frontend-to-backend API contract specifications and real-time state management.",
      "Designing the IDCS KeyLite distributed infrastructure and Cloudflare Tunnel integration.",
      "Formulating disaster recovery, incremental backup, and data synchronization protocols.",
      "Leading technical direction, code reviews, and architectural compliance across the team.",
    ],
    engineeringFocus:
      "Transforming complex institutional regulations and academic mandates into resilient, scalable software architecture — bridging academic workflows, enterprise application modules, and distributed edge infrastructure into one cohesive, high-performance ecosystem.",
    projectVision:
      "IDCS aims to establish a unified, scalable, and adaptable institutional technology ecosystem. The long-term roadmap expands beyond traditional ERP workflows into a connected intelligence layer unifying academic analytics, operational administration, and institution-managed edge infrastructure. One Ecosystem. Multiple Institutions. Unified Intelligence.",
    features: [
      "Multi-institutional platform supporting KRCT, KRCE, and MKCE",
      "8-tier role-based access management with granular permissions",
      "Academic 2.1 configurable assessment & question paper patterns",
      "Automated Outcome-Based Education (OBE) and CO/BTL analysis",
      "Closed-loop Continuous Quality Improvement (CQI) workflows",
      "IDCS KeyLite distributed on-premise node deployment",
      "Zero-inbound Cloudflare Tunnel connectivity with SSL",
      "Accreditation-ready reporting and longitudinal analytics",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "Django",
      "PostgreSQL",
      "REST APIs",
      "Cloudflare Tunnel",
      "Linux",
      "ERP Architecture",
      "Tailwind CSS",
    ],
    contribution:
      "Core Architect & System Designer: Conceived and engineered the platform architecture from the ground up — from database schemas and Academic 2.1 assessment logic to the IDCS KeyLite deployment pipeline and Cloudflare Tunnel security integration.",
    challenges: [
      "Architecting multi-tenant institutional isolation while maintaining a shared core codebase.",
      "Designing a configuration-driven question paper and assessment structure flexible enough for any department.",
      "Building reliable mathematical attainment services for OBE and Continuous Quality Improvement.",
      "Engineering IDCS KeyLite to enable campus-level hosting without public static IPs or open firewall ports.",
    ],
    accent: "#C02655",
    icon: "layers",
    github: null,
    demo: null,
    screenshots: [
      {
        title: "Main Institutional Dashboard",
        caption: "Centralized overview of institutional metrics, department curriculum, announcements, and administrative workflows.",
        filename: "dashboard.png",
        image: "/assets/idcs/dashboard.png",
      },
      {
        title: "Academic 2.1 Admin Console",
        caption: "Configuration-driven exam management, QP pattern builder, mark weightage distributions, and approval inbox.",
        filename: "academic2.1.png",
        image: "/assets/idcs/academic2.1.png",
      },
      {
        title: "Outcome-Based Education & CO Attainment",
        caption: "Automated CO — PO/PSO summary matrices, Bloom's Taxonomy Level mapping, and real-time attainment calculations.",
        filename: "screen3.png",
        image: "/assets/idcs/screen3.png",
      },
      {
        title: "krgi.co.in Cloudflare Edge & Network Traffic",
        caption: "Edge traffic monitoring, zero-inbound Cloudflare Tunnel proxying 3.1M+ institutional requests, and SSL encryption.",
        filename: "screen4.png",
        image: "/assets/idcs/screen4.png",
      },
      {
        title: "IQAC Institutional Engineering Team",
        caption: "Core system architects, software developers, and IQAC institutional leadership behind the IDCS ecosystem.",
        filename: "engineeringteam.jpeg",
        image: "/assets/idcs/engineeringteam.jpeg",
      },
    ],
    related: ["medora", "secure-vision"],
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
    related: ["idcs", "talentime"],
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
    related: ["idcs", "medora"],
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
    related: ["idcs", "medora"],
  },
];

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const getRelatedProjects = (project: Project): Project[] =>
  project.related
    .map((id) => getProjectById(id))
    .filter((p): p is Project => Boolean(p));
