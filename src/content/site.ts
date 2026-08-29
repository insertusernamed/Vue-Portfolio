export const site = {
  name: 'Daniel Yevtushenko',
  role: 'Backend / Full-Stack Software Developer',
  lede: 'I build backend and full-stack systems, from routing and scheduling tools to automation and data pipelines.',
  email: 'dyevtus@gmail.com',
  github: 'https://github.com/insertusernamed',
  linkedin: 'https://linkedin.com/in/daniel-yevtushenko',
  resumePath: '/resume',
}

export const featuredIds = [
  'poolr-front',
  'poolr-back',
  'campus-operations-system',
  'osm-extractor',
  'Vue-Portfolio',
  'portfolio-graphql-api',
]

export const otherProjectFallback = [
  {
    name: 'pgKata',
    description: 'PostgreSQL challenges that run in the browser via PGlite / WebAssembly.',
    url: 'https://github.com/insertusernamed/pgKata',
    languages: { nodes: [{ name: 'TypeScript', color: '#3178c6' }] },
  },
  {
    name: 'TheMotherPlantFrontend',
    description: 'A plant shop built so my mom could sell plants online.',
    url: 'https://github.com/insertusernamed/TheMotherPlantFrontend',
    languages: { nodes: [{ name: 'Vue', color: '#41b883' }] },
  },
  {
    name: '2025-space-apps-frontend',
    description: 'NASA Space Apps 2025 — TEMPO air-quality maps, forecasts, and overlays.',
    url: 'https://github.com/Jenna-Deamer/2025-space-apps-frontend',
    languages: { nodes: [{ name: 'Vue', color: '#41b883' }] },
  },
  {
    name: 'go-screenshot-api',
    description: 'A small screenshot service in Go, used to capture live project previews.',
    url: 'https://github.com/insertusernamed/go-screenshot-api',
    languages: { nodes: [{ name: 'Go', color: '#00ADD8' }] },
  },
  {
    name: 'Goatpad-1337',
    description: 'A recreation of Goat MMO Simulator’s Goatpad-1337.',
    url: 'https://github.com/insertusernamed/Goatpad-1337',
    languages: { nodes: [{ name: 'JavaScript', color: '#f1e05a' }] },
  },
  {
    name: 'payment-exception-console',
    description: 'Payment exception console for search, failure resolution, and audit logging.',
    url: 'https://github.com/insertusernamed/payment-exception-console',
    languages: { nodes: [{ name: 'TypeScript', color: '#3178c6' }] },
  },
]

export const hideRepoPattern =
  /^(css-lab|assignment|COMP|W23|200528|midterm|sql_assignment|test$|yevtushenko_|final-project|semester-project|css-final|css-assignment|curly-invention)/i

export const stackLine = [
  'Java',
  'Spring Boot',
  'Vue',
  'TypeScript',
  'PostgreSQL',
  'GraphQL',
  'Docker',
  'CI',
]

export const experience = [
  {
    org: 'Dayforce (formerly Ceridian)',
    role: 'Test Automation Intern',
    dates: 'Sep 2023 – Dec 2023',
    note: 'SpecFlow and C# coverage for payroll and HCM workflows; defect triage with developers before release.',
  },
]

export const education = [
  {
    school: 'Lakehead University',
    credential: 'BSc (Honours), Computer Science',
    dates: 'Completed Apr 2026',
  },
  {
    school: 'Georgian College',
    credential: 'Computer Programming Diploma',
    dates: 'Completed Apr 2024',
  },
]

export type CaseImage = {
  src: string
  alt: string
  caption?: string
}

export const featured = [
  {
    id: 'poolr',
    layout: 'feature' as const,
    index: '01',
    kicker: 'Featured · carpooling',
    title: 'Poolr',
    lede: 'A carpool matcher that has to know whether a pickup is actually on the way.',
    asideTitle: 'What I led',
    body: [
      'Matching riders to drivers is easy if you measure crow-flies. It is not if you care about streets. Poolr asks a self-hosted GraphHopper instance whether a detour is acceptable, snaps fuzzy address and POI search onto the road graph, and prices the ride from that geometry.',
      'I was primary developer and team lead on a 7-person university project. I led most of the backend and routing work: Java 21 / Spring Boot, PostgreSQL, GraphHopper, and the OSM data path that feeds it. The Vue 3 / TypeScript client is the map and search surface on top.',
    ],
    owned: [
      'GraphHopper routing, road snapping, and detour logic',
      'Address / POI search and fuzzy matching',
      'Spring Boot API and PostgreSQL schema',
      'OSM data path used by routing and search',
      'GitHub Actions for map-data releases',
    ],
    stack: [
      'Java 21',
      'Spring Boot',
      'Vue 3',
      'TypeScript',
      'PostgreSQL',
      'GraphHopper',
      'Rust / OSM',
      'GitHub Actions',
    ],
    pipeline: [
      'OSM PBF',
      'Rust extractor',
      'SQLite + GH cache',
      'Spring Boot',
      'Vue map / search',
    ],
    links: [
      { label: 'Live demo', href: 'https://carpoolr.vercel.app' },
      { label: 'Frontend', href: 'https://github.com/insertusernamed/poolr-front' },
      { label: 'Backend', href: 'https://github.com/jntowns/poolr-back' },
    ],
    images: [
      { src: '/images/poolr-home.png', alt: 'Poolr homepage with ride and drive actions' },
    ] as CaseImage[],
  },
  {
    id: 'campus',
    layout: 'solver' as const,
    index: '02',
    kicker: 'Solo capstone · scheduling',
    title: 'Campus Operations System',
    lede: 'A university scheduler that treats rooms, instructors, and students as constraints, not spreadsheet rows.',
    asideTitle: 'What I built',
    body: [
      'Solo full-stack capstone. Spring Boot models the campus; Timefold Solver searches for a feasible timetable under hard constraints (room, instructor, student, capacity) and soft ones (gaps, building affinity, time preference). The Vue 3 client watches that search live over STOMP / WebSockets — assigned counts, hard violations, HardSoftScore.',
      'Enrollment and waitlists are simulated against seat limits so a schedule can be stressed before anyone sits in a room. Backend tests use JUnit and MockMvc; the frontend is covered with Playwright.',
    ],
    owned: [
      'Constraint model and Timefold solver wiring',
      'Live solver status over STOMP / WebSockets',
      'Enrollment and waitlist simulation',
      'Admin, instructor, and student workflows in Vue 3',
      'Automated backend and frontend tests',
    ],
    stack: [
      'Java 21',
      'Spring Boot',
      'Vue 3',
      'Timefold Solver',
      'STOMP / WebSockets',
      'JUnit',
      'Playwright',
    ],
    pipeline: [],
    links: [
      { label: 'Live demo', href: 'https://campus-operations-system.vercel.app' },
      { label: 'Source', href: 'https://github.com/insertusernamed/campus-operations-system' },
    ],
    images: [] as CaseImage[],
  },
  {
    id: 'osm',
    layout: 'data' as const,
    index: '03',
    kicker: 'Data pipeline · OSM',
    title: 'OSM Extractor',
    lede: 'Ontario map data, cut down until search and routing can actually use it.',
    asideTitle: 'What I built',
    body: [
      'Raw Ontario OSM made local Poolr setup slow. I wrote a Rust two-pass PBF extractor that pulls categorized POIs and addresses into an indexed SQLite database, with city and street inference for incomplete records.',
      'Weekly GitHub Actions builds publish that SQLite extract alongside a GraphHopper graph cache for Ontario. Poolr downloads the bundle on boot instead of processing a raw PBF every time.',
    ],
    owned: [
      'Two-pass Rust extraction over OSM PBF',
      'POI and address normalization into SQLite',
      'Weekly GitHub Actions releases of the extract and GraphHopper cache',
    ],
    stack: ['Rust', 'OpenStreetMap', 'SQLite', 'GraphHopper', 'GitHub Actions'],
    pipeline: ['PBF', 'Rust extractor → SQLite', 'GraphHopper import → cache', 'Weekly release', 'Poolr boot'],
    links: [{ label: 'Source', href: 'https://github.com/insertusernamed/osm-extractor' }],
    images: [] as CaseImage[],
  },
]
