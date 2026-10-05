// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Sunkesula Chakrapani Reddy',
  role: 'Senior Software Engineer',
  location: 'Hyderabad, India',
  email: 's.chakri15@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chakrapani-reddy-977846140',
  github: 'https://github.com/ChakrapaniReddy15',
  // The PDF lives in /public — replace the file (same name) and push to update it.
  resume: '/Sunkesula_Chakrapani_Reddy.pdf',
  status: 'Open to senior / lead full-stack & mobile roles',
}

export const marquee = [
  'React', 'TypeScript', 'React Native', 'Next.js', 'Node.js', 'Three.js', 'Konva', 'Material UI',
  'Microservices', 'TensorFlow Lite', 'Redux-Saga', 'Expo', 'BLE', 'Docker', 'PostgreSQL', 'Azure DevOps',
]

export type Visual = 'phone' | 'yard' | 'ai' | 'rental' | 'pass' | 'platform'

export interface Surface {
  /** Part of the product, e.g. "Mobile app", "Web portal" */
  name: string
  /** My role on this part */
  role: string
  points: string[]
}

export interface Project {
  slug: string
  /** Product name */
  title: string
  /** One-line description under the name */
  tagline: string
  kind: string
  summary: string
  highlights?: string[]
  tags: string[]
  visual: Visual
  accent: string
  /** Optional screenshot in /public, e.g. '/projects/car-sharing.png' */
  image?: string
  /** Optional demo video in /public (mp4 preferred, or gif) */
  video?: string
  /** Extra screenshots/clips for the case-study page (see docs/MEDIA_SHOTLIST.md) */
  gallery?: { src: string; caption: string }[]
  /** Public links (store pages, live sites) */
  links?: { label: string; url: string }[]
  caseStudy: {
    role: string
    period: string
    overview: string
    surfaces: Surface[]
    /** Hard problems and how I solved them */
    challenges?: { title: string; text: string }[]
    outcomes: string[]
    stack: string[]
  }
}

export const projects: Project[] = [
  {
    slug: 'ai-vehicle-inspection',
    title: 'Verifai AI',
    tagline: 'AI vehicle inspection platform',
    kind: 'WEB · AI · MICROSERVICES · 2024 → 2025',
    summary:
      'Fourteen phone photos in, a damage report out. I built the web app where inspectors review what the AI found — every panel and damage drawn on the photo, filterable and traceable to the model that produced it.',
    highlights: [
      'Panel & damage overlays on photos', 'Table ↔ photo highlight sync',
      '14-angle capture · 4-model pipeline', 'Annotation tool for training data',
      'Multi-tenant search & filters', 'Model versions & confidence on screen',
    ],
    tags: ['React', 'Material UI', 'SVG', 'Node.js', 'Microservices', 'Docker'],
    visual: 'ai',
    accent: 'var(--c)',
    video: '/projects/ai-vehicle-inspection-card.mp4',
    image: '/projects/ai-vehicle-inspection-card.jpg',
    gallery: [
      { src: '/projects/ai-vehicle-inspection.mp4', caption: 'Walkthrough: dashboard → AI overlays → panel drill-down → table/photo sync' },
      { src: '/projects/ai-dashboard.jpg', caption: 'Assessments dashboard — filter by plate, tenant, status and date range' },
      { src: '/projects/ai-damage-table.jpg', caption: 'Drill into a panel: every damage with type, score and flags, synced with the photo' },
      { src: '/projects/ai-front-angle.jpg', caption: 'Front angle — every panel and damage region detected in one pass' },
    ],
    caseStudy: {
      role: 'Frontend lead · web app and annotation tooling',
      period: 'Nov 2024 – Sep 2025',
      overview:
        'Verifai AI replaces manual vehicle inspection. A driver captures 14 fixed angles of the car on their phone; a four-model pipeline then identifies each angle, isolates the car, maps every body panel and detects damage — paint damage, scratches, dents, tears and abrasions. The web app is where inspectors and admins review those results, trust them, and correct them so the models keep improving. The same inspection flow is used inside three mobility products.',
      surfaces: [
        {
          name: 'Inspection web app',
          role: 'Built the frontend',
          points: [
            'Assessments dashboard across tenants: status from queued to completed, panel and damage totals, search by plate, filters for tenant, status and date range.',
            'Assessment view across all 14 angles: angle confidence, car detection, panels found vs expected for that angle, panel and damage scores, and processing time per model.',
            'Angle viewer: panel segmentation and damage polygons drawn over the original photo as SVG, scaled to any screen, with readable label placement.',
            'Layer controls and a damage table — type, score, on-car, on-panel, new damage, multi-region — that highlights the matching shape on the photo, and back; hover shows details, and multi-region damages are drawn as one grouped shape.',
            'Model transparency: every assessment shows which model versions processed it.',
          ],
        },
        {
          name: 'Annotation tool',
          role: 'Built (phase 2)',
          points: [
            'Draw and edit polygons on the photo with zoom and undo/redo, label panels and damages from API-driven lists, and mark images valid or invalid.',
            'Login with session restore: work in progress — shapes, labels and model IDs — survives a refresh or re-login, then is submitted as one training record.',
          ],
        },
        {
          name: 'Guided capture on mobile',
          role: 'Built (in the CheckNShare app)',
          points: [
            'An on-device angle-classification model runs in the live camera feed and guides the user to each required angle before a photo is accepted.',
          ],
        },
        {
          name: 'Model-testing app (Android)',
          role: 'Built the model-testing features',
          points: [
            'Lists the angle-classification models available on the server; the tester picks one and the app downloads it to the device.',
            'Models are cached on the phone and only re-downloaded when the server version changes (hash check), then loaded at runtime into the live camera pipeline.',
            'Configurable capture rules (e.g. wait time before manual capture) and an image grid of captured shots, so new models can be compared in the field before release.',
          ],
        },
        {
          name: 'Microservices backend',
          role: 'Contributed',
          points: [
            'Model upload with file hashing, angle configuration APIs and request validation inside a Dockerised stack (API gateway, OAuth, message bus, PostgreSQL).',
          ],
        },
      ],
      challenges: [
        { title: 'Making ML output readable', text: 'Each photo comes back with dozens of polygons, scores and flags. I drew them as scalable SVG over the original image, grouped multi-region damages, and linked every table row to its shape (hover or click either side) so an inspector can verify a result in seconds.' },
        { title: 'Pixel-accurate overlays on any screen', text: 'Model coordinates are in the original image space while photos are shown resized. Overlays are re-projected on every resize so shapes, labels and hit areas stay exactly on the damage — on a laptop or a large monitor.' },
        { title: 'Annotation work that is never lost', text: 'Labelling a photo can take minutes. In-progress polygons, labels and the model IDs they belong to are kept locally and restored after a refresh or a re-login, then submitted as one clean training record.' },
        { title: 'Testing models in the field before release', text: 'Built the model-testing flow so a new angle model can be downloaded to a phone, cached by hash and swapped into the live camera at runtime — comparing models on real cars without shipping a new app.' },
      ],
      outcomes: [
        'Inspectors see exactly what the AI saw — and which model saw it — instead of a black-box score.',
        'Dense ML output (shapes, scores, timings) made readable for non-technical users.',
        'Corrections flow back as labelled training data through the annotation tool.',
        'New models are tried on real phones and real cars before they go live, through the model-testing app.',
      ],
      stack: ['React', 'Material UI', 'React Router', 'SVG', 'Node.js', 'Moleculer', 'PostgreSQL', 'Docker', 'TensorFlow Lite'],
    },
  },
  {
    slug: 'yard-designer',
    title: 'Yard Management',
    tagline: '2D/3D yard design & operations platform',
    kind: 'WEB · 2D/3D · SOLE DEVELOPER · 2026',
    summary:
      'Design a parking yard in 2D or 3D, then run it live. I designed and built the whole platform — and shipped it as a package that powers two client products.',
    highlights: [
      '2D editor (Konva) + 3D editor (Three.js)', 'Multi-level yards, ramps & driveways',
      'Live occupancy & operational alerts', 'Admin controls & role permissions',
      'Config-driven, five delivery modes', 'npm package · automated tests',
    ],
    tags: ['React', 'TypeScript', 'Konva', 'Three.js', 'Redux Toolkit', 'Vitest'],
    visual: 'yard',
    accent: 'var(--b)',
    video: '/projects/yard-card.mp4',
    image: '/projects/yard-card.jpg',
    gallery: [
      { src: '/projects/yard-walkthrough.mp4', caption: 'Walkthrough: workspaces → 2D editor → 3D editor → operations → project management → admin controls' },
      { src: '/projects/yard-2d-editor.jpg', caption: '2D editor — zones, slots, driveways and entries/exits, with live validation and object properties' },
      { src: '/projects/yard-3d.jpg', caption: '3D editor — the same layout with Iso / Top / Front / Side camera presets' },
      { src: '/projects/yard-3d-level.jpg', caption: 'Upper level of a multi-level yard, with ramps and stairs' },
      { src: '/projects/yard-operations.jpg', caption: 'Operations — occupancy per level, alert thresholds, reservations and vehicle mix' },
      { src: '/projects/yard-projects.jpg', caption: 'Project management — modules, layouts, parking levels and permissions' },
    ],
    caseStudy: {
      role: 'Sole architect & developer',
      period: 'Apr 2026 – Present',
      overview:
        'Fleet and parking operators needed to model their yards — open areas and multi-level structures — and then run day-to-day operations on that same layout. And it had to live inside more than one product. Yard Management is a set of workspaces — 2D editor, 3D editor, operations, project management and admin — that runs standalone or embedded, from one codebase.',
      surfaces: [
        {
          name: 'Layout editors (2D & 3D)',
          role: 'Designed & built',
          points: [
            '2D floor-plan editor: zones, slots, bike slots, driveways, ramps, pillars, stairs and entry/exit points — select, move, rotate, resize, lock, boundary editing and undo/redo.',
            'A full 3D editor with the same tools, Iso / Top / Front / Side camera presets and current-floor or all-floors views, lazy-loaded so the 3D engine never slows the rest of the app.',
            'Multi-level yards: add, duplicate, swap or deactivate levels, each with its own capacity, alert threshold and display unit (canvas units, metres, feet).',
            'Live validation as you draw — driveway direction, overlaps, access points off the driveway.',
            'Direction-aware routing on the drawn driveways (one-way and two-way): entry → slot → exit with turn-by-turn instructions and distance.',
            'Import, and export as JSON, backend JSON, a deployable package or PNG; auto or manual save.',
          ],
        },
        {
          name: 'Operations',
          role: 'Designed & built',
          points: [
            'Real-time occupancy dashboard: pick any saved layout, drill into levels, zones and slots, and see occupancy against capacity and alert thresholds.',
            'Operational alerts for blocked slots and high-occupancy zones, reservations, vehicle mix, filters, and a slot monitor where operators change slot status — synced across open tabs.',
          ],
        },
        {
          name: 'Platform & admin',
          role: 'Designed & built',
          points: [
            'Project management: enabled modules, layouts and slots per project, ordered parking levels, a permissions summary (view / edit / update / manage) and a usage log of where each module was opened.',
            'Admin controls to choose, per editor, which tools, panels, validation and settings are available, plus theme, save mode and allowed vehicle types.',
            'Global visibility to show or hide whole workspaces and helper text across the app.',
          ],
        },
        {
          name: 'Package & integration',
          role: 'Designed & built',
          points: [
            'Shipped as a themeable, typed npm package (React 16 compatible) and embedded in the Fleetable enterprise portal and a food-delivery client’s portal — one codebase, per-client configuration and database.',
            'Wired the host integration: routes, state, translations and save flows.',
          ],
        },
        {
          name: 'Data & backend',
          role: 'Designed',
          points: [
            'MongoDB schemas and data model for the yard module, API contracts, and server-side validation for ramps and driveways.',
          ],
        },
      ],
      challenges: [
        { title: 'One editor, many hosts', text: 'The same code had to run as a standalone app, a multi-project workspace and an embedded module in other products. I put every host difference behind a runtime config and a pluggable data layer, so behaviour changes by configuration — never by forking the code.' },
        { title: 'Routing inside a drawn yard', text: 'Driveways are drawn freely, so there is no road map to start from. I turn driveway centre-lines into a graph, attach entry, slot and exit points to it, and compute a direction-aware route with turn-by-turn instructions and distance — respecting one-way roads.' },
        { title: '2D and 3D from the same data', text: 'The 3D scene is generated from the same layout model as the 2D canvas, including stacked floors, ramps and stairs, and lazy-loaded so the 3D engine never slows down the editor.' },
        { title: 'Rules users can trust', text: 'Validation runs while you draw — overlaps, driveway direction, access points off the road — and the same contract is validated on the server, with automated tests for editor rules, routing, import/export and API compatibility.' },
      ],
      outcomes: [
        'One editor, two client products — behaviour switched by configuration, not forks.',
        'Five delivery modes (standalone, multi-project, embedded, API, host) through a pluggable data layer.',
        'Automated test suite covering editor rules, routing, import/export and API contracts.',
      ],
      stack: ['React', 'TypeScript', 'Konva', 'Three.js', 'React Three Fiber', 'Redux Toolkit', 'Redux-Saga', 'Tailwind CSS', 'Vite', 'Vitest', 'MongoDB'],
    },
  },
  {
    slug: 'corporate-car-sharing',
    title: 'CheckNShare',
    tagline: 'Corporate car-sharing platform',
    kind: 'MOBILE + WEB PLATFORM · LIVE IN STORES · 2022 → NOW',
    summary:
      'Employees book a company car, unlock it with their phone and return it; fleet admins run everything from a web portal. I have led the mobile app since 2022 — from booking and keyless access to on-device AI and payments — and contribute across the portal and backend services.',
    highlights: [
      'Bluetooth keyless unlock', 'On-device AI photo capture',
      'Web admin portal & reports', 'Bookings, rides & driver shifts',
      'White-label, multi-tenant', '5 languages incl. Arabic RTL',
    ],
    tags: ['React Native', 'Next.js', 'TypeScript', 'BLE', 'TFLite', 'Node.js'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/app/checknshare/id6443759965' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=org.ae360dev.ticcs.mobileapp' },
    ],
    visual: 'platform',
    accent: 'var(--a)',
    video: '/projects/cns-card.mp4',
    image: '/projects/cns-card.jpg',
    gallery: [
      { src: '/projects/cns-walkthrough.mp4', caption: 'Walkthrough: organisation & role → booking → damage check & unlock → drive & return → safety → stats & languages' },
      { src: '/projects/cns-unlock.jpg', caption: 'Mark damage on vehicle blueprints with photos, unlock the car, then run the in-car checklist' },
      { src: '/projects/cns-book.jpg', caption: 'Self-drive or with a driver, book now or in advance — pick-up site, purpose and a note for the driver' },
      { src: '/projects/cns-return.jpg', caption: 'Drive with lock/unlock, fuel, parking and SOS on the map; end the trip and rate it' },
      { src: '/projects/cns-safety.jpg', caption: 'Emergency contacts, accident and breakdown reports with photos, time and location, and WhatsApp/call support' },
      { src: '/projects/cns-languages.jpg', caption: 'Personal stats and booking credits, in English, Arabic (RTL), French, Spanish and Portuguese' },
    ],
    caseStudy: {
      role: 'Lead mobile engineer · contributor to web portal and services',
      period: 'Oct 2022 – Present · my core project',
      overview:
        'CheckNShare lets companies run a shared fleet without keys or a front desk. Employees book a car (self-drive or with a driver), unlock it from their phone over Bluetooth, document its condition and hand it back. Fleet admins manage bookings, approvals, drivers, damages and spending from a web portal. It is white-label and multi-tenant, shipped under two client brands in five languages.',
      surfaces: [
        {
          name: 'Employee & driver app (iOS / Android)',
          role: 'Lead engineer',
          points: [
            'Booking journey: book now and advance booking, self-drive and chauffeur modes, booking credits, manager approval queue, cancellation reasons, no-show rules, reminders before a booking starts or ends, and history.',
            'Bluetooth (BLE) keyless access: scan for the car’s device, pair with a PIN, connect, and send lock and unlock commands from the booking screen — with live Bluetooth status, scanning animation and a loader while each command runs.',
            'BLE command lifecycle tied to the booking: device info saved on the phone, reconnect when the app reopens (even after a reinstall), an automatic lock command and disconnect when the booking ends, and lock/unlock events recorded against the contract and employee through the API.',
            'Multi-organisation accounts: pick an organisation and sign in as employee or driver; switch organisation from the menu; pick-up sites drawn as map polygons with a check that the vehicle is inside the site.',
            'Vehicle check before unlock: tap the damaged side and part on vehicle blueprints, choose the type (scratch, dent, paint, missing, broken), add photos and notes — then “confirm damage and unlock”.',
            'Guided photos with an on-device AI angle model, fuel and mileage from telematics, an in-car checklist, and an end-of-trip flow with key-box instructions, a trip summary and a star rating.',
            'Driver mode: start, pause and end shifts, accept rides, pick up and drop the shift vehicle, and personal stats.',
            'Safety: SOS contacts, incident reports with time, location and map, and an in-app hotline; personal documents with upload and share.',
            'Payments at booking time with success and failure handling, in-app announcements, WhatsApp and call support, push notifications with deep links, force-update prompts and Microsoft Clarity session analytics.',
            'Kept the app current through three React Native major upgrades (now 0.84), Android 15 / 16 KB support and a self-hosted CodePush pipeline, while releasing regularly to both stores.',
          ],
        },
        {
          name: 'Fleet admin web portal',
          role: 'Contributor',
          points: [
            'Next.js + Material UI portal covering live bookings, approvals, chauffeur requests and ride reassignment, driver shifts, damages and assessments, incidents, master data, and roles & permissions.',
            'Built booking and feedback reports with Excel export, remote vehicle block/unblock commands, the damage view, and the analytics-backed inventory screen; fixed RTL and Safari issues.',
          ],
        },
        {
          name: 'Backend services',
          role: 'Contributor',
          points: [
            'Payment gateway integration (invoices, payment tokens, callbacks, settlement), notifications, and organisation and user permissions in Node.js services.',
          ],
        },
      ],
      challenges: [
        { title: 'Keyless access that just works', text: 'Built the full BLE command flow for lock and unlock: scanning, PIN pairing, connection handling and command sending tied to the active booking. The phone remembers the paired device, reconnects after an app restart or reinstall, and always sends a lock command and disconnects before a booking can end — so a car is never left open.' },
        { title: 'Real-time AI in the camera', text: 'Runs a TensorFlow Lite angle model on live camera frames (VisionCamera + worklets) to guide the user to each required angle, including mirrored overlays for Arabic right-to-left.' },
        { title: 'One codebase, many brands', text: 'The app ships under two company brands with their own Firebase projects, store listings and over-the-air update channels — all from one codebase and one release process.' },
        { title: 'Keeping a long-lived app modern', text: 'Led three React Native major upgrades up to 0.84, plus Android 15 edge-to-edge, 16 KB page-size support and the move from App Center to self-hosted CodePush — without pausing feature releases.' },
      ],
      outcomes: [
        'Lead on the mobile app since 2022 — owning features, upgrades and releases from early versions to today’s React Native 0.84 build.',
        'Live on the App Store and Google Play, with 1,000+ downloads on Google Play.',
        'One codebase shipped as two branded apps for different companies.',
        'Five languages including Arabic right-to-left, down to the camera overlays.',
        'Photos captured in the app feed straight into the Verifai AI inspection platform.',
      ],
      stack: ['React Native', 'TypeScript', 'Redux-Saga', 'BLE', 'VisionCamera', 'TensorFlow Lite', 'react-native-maps', 'Firebase', 'Microsoft Clarity', 'Next.js', 'Material UI', 'Node.js', 'Fastlane', 'CodePush'],
    },
  },
  {
    slug: 'car-rental',
    title: 'Alfaris Rent-A-Car',
    tagline: 'Modernising a live rental app — and moving the business online',
    kind: 'MOBILE + WEB · LIVE IN STORES · 2025 → NOW',
    summary:
      'A rental app that had been live since 2020, built by many hands. My job: make it feel new, make it work properly in Arabic, and turn it from a booking tool into a place where customers subscribe, extend and pay — on the app and on the website.',
    highlights: [
      'Modernised a live app (since 2020)', 'Arabic-first, right-to-left',
      'Monthly subscriptions — new revenue line', 'Self-service payments (ClickPay)',
      'React Native 0.84 upgrade', 'App + website, same rules',
    ],
    tags: ['React Native', 'WordPress / PHP', 'ClickPay'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/sa/app/alfaris-rent-a-car/id1515017781' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.runcodesoft.fleetableconsumerapp' },
    ],
    visual: 'rental',
    accent: 'var(--a)',
    video: '/projects/alfaris-card.mp4',
    image: '/projects/alfaris-card.jpg',
    gallery: [
      { src: '/projects/alfaris-walkthrough.mp4', caption: 'Walkthrough: sign-in → daily rental → monthly subscription → Arabic → loyalty' },
      { src: '/projects/alfaris-home.jpg', caption: 'First impression — sign in with phone and OTP or continue as a guest; the home screen in English and Arabic' },
      { src: '/projects/alfaris-subscription.jpg', caption: 'Monthly subscription — price tiers that drop the longer you subscribe, add-ons and a clear monthly total' },
      { src: '/projects/alfaris-rent.jpg', caption: 'Daily rental — brands and cars, extras like unlimited mileage and insurance, and a summary of every charge' },
      { src: '/projects/alfaris-arabic.jpg', caption: 'Arabic-first — the same screens mirrored right-to-left' },
      { src: '/projects/alfaris-loyalty.jpg', caption: 'Loyalty membership and contact screens in both languages' },
    ],
    caseStudy: {
      role: 'Mobile & web developer — first-run experience, upgrade, subscriptions and payments',
      period: 'Jul 2025 – Present',
      overview:
        'Alfaris is a car rental company in the Gulf. Its app had been in the stores since 2020 and had grown through many developers: it worked, but it looked dated, Arabic felt like an afterthought, and anything involving money — subscriptions, extensions, paying what you owe — still meant calling or visiting a branch. I joined in 2025 and worked through it in stages: first the first impression, then the foundations, then the features that move revenue online. Each stage shipped to real customers before the next began.',
      surfaces: [
        {
          name: '1 · A first impression that converts',
          role: 'Jul 2025',
          points: [
            'Rebuilt the first-run journey — four onboarding screens, sign-up, phone + OTP login, auto-login and “continue as a guest” — because the first screens decide whether someone becomes a customer.',
            'New home and navigation: pick-up and drop-off search with promo banners up front, and five clear tabs — Rent, Services, Loyalty, Monthly Subscription and Contact.',
          ],
        },
        {
          name: '2 · Arabic-first, not translated',
          role: 'Jul 2025 → ongoing',
          points: [
            'Designed every new screen for both directions: Arabic flips the whole app right-to-left, including headers, navigation and forms.',
            'Fixed the Android right-to-left restart loop, safe-area and map rendering issues that made Arabic feel broken.',
          ],
        },
        {
          name: '3 · Bringing a 2020 codebase up to date',
          role: 'Mar 2026',
          points: [
            'Led the upgrade to React Native 0.84: replaced deprecated packages, updated iOS and Android native configuration, and removed a component that was crashing the app.',
            'Set up CodePush over-the-air updates, so fixes reach customers the same day instead of waiting for store review.',
          ],
        },
        {
          name: '4 · Paying without a branch visit',
          role: 'Jul – Aug 2026',
          points: [
            'Customers can pay contract balances and dues from the phone, see each booking’s own balance, and view or download proforma invoices — with clear loading and failure states so a payment is never sent twice.',
            'Daily rentals show every charge before confirming — rent per day, tax, grace charges, transfer fee, add-ons and insurance — with the security deposit set by the branch.',
          ],
        },
        {
          name: '5 · Monthly subscriptions — a new revenue line',
          role: 'Jul – Sep 2026',
          points: [
            'Built the subscription flow and then redesigned it end to end: choose a car and vehicle year, see a first-month price and price tiers that drop the longer you subscribe, then toggle add-ons such as unlimited mileage and full insurance.',
            'A summary the customer can trust: rent, tax, transfer fee for the chosen drop-off location, add-ons, CDW+ and promo or discount codes add up to one monthly total — and are carried exactly into the contract.',
          ],
        },
        {
          name: '6 · The same rules on the website',
          role: 'Booking website',
          points: [
            'Extended the WordPress booking plugin (PHP) so web customers get the same journeys: pay dues, extend an agreement, book a subscription or CDW+, validate promos and verify by OTP — all through the ClickPay gateway.',
          ],
        },
      ],
      challenges: [
        { title: 'Pricing that matches the counter', text: 'Subscription prices depend on plan, vehicle year, drop-off location (transfer fee), CDW+ insurance, add-ons and promo codes. I made the app show and submit exactly what the back office calculates, so the contract created matches the quote.' },
        { title: 'Arabic done properly', text: 'Switching to Arabic flips the whole app right-to-left, including navigation and maps — and I fixed the Android RTL restart loop and safe-area issues that come with it.' },
        { title: 'Paying from the phone', text: 'Customers can see each booking’s own balance, pay dues and contract balances through ClickPay and download proforma invoices — with clear loading and failure states so a payment is never double-submitted.' },
        { title: 'Upgrading a live app without a pause', text: 'Moved a 2020-era codebase to React Native 0.84 while customers kept using it: replaced deprecated packages, fixed iOS and Android native issues, removed a crashing component, and set up over-the-air updates so fixes no longer wait for store review.' },
      ],
      outcomes: [
        'Subscribing, extending and paying moved from the branch counter to the app and the website.',
        'A dated, 2020-era app modernised to React Native 0.84 without taking it out of the stores.',
        'Arabic customers get a native right-to-left experience, not a translated one.',
        'Near-weekly releases to the stores and over the air throughout 2026.',
      ],
      stack: ['React Native 0.84', 'TypeScript', 'WordPress', 'PHP', 'ClickPay', 'Docker', 'CodePush'],
    },
  },
  {
    slug: 'student-pass-system',
    title: 'CBS Student Pass & Attendance',
    tagline: 'Digital hall passes & daily attendance for a school — mobile app + web portals',
    kind: 'MOBILE + WEB · FREELANCE · SOLE DEVELOPER · 2026',
    summary: 'A school’s paper hall passes and attendance registers, rebuilt as one system: a teacher mobile app, teacher and admin web portals, and a real-time backend that alerts teachers the moment a student overstays. Designed, built, deployed and supported by me alone.',
    highlights: [
      'Teacher mobile app (Expo, iOS & Android)', 'Teacher & admin web portals (React)',
      'Pass rules: time & capacity limits per destination', 'Daily attendance, locked once submitted',
      'Overdue alerts: Socket.IO + Firebase push', 'OTA updates · Docker · AWS S3',
    ],
    tags: ['Expo', 'React', 'Express', 'PostgreSQL', 'Socket.IO'],
    visual: 'pass',
    accent: 'var(--b)',
    video: '/projects/cbs-card.mp4',
    image: '/projects/cbs-card.jpg',
    gallery: [
      { src: '/projects/cbs-walkthrough.mp4', caption: 'Walkthrough: teacher mobile app → teacher web portal → admin portal (passes, calendar, reports, accounts)' },
      { src: '/projects/cbs-mobile-passes.jpg', caption: 'Teacher mobile app — hall passes, create a pass in one step, and overdue-pass alert sounds' },
      { src: '/projects/cbs-mobile-attendance.jpg', caption: 'Teacher mobile app — attendance: pick a class, mark Present / Absent / Late / Early Dismissal, then the monthly report' },
      { src: '/projects/cbs-mobile-profile.jpg', caption: 'Teacher mobile app — profile with yearly stats, pass analytics and navigation' },
      { src: '/projects/cbs-teacher-pass.jpg', caption: 'Teacher portal — pick a student and a destination to issue a hall pass' },
      { src: '/projects/cbs-teacher-attendance.jpg', caption: 'Teachers mark daily attendance per class — Present, Absent, Late Arrival, Early Dismissal' },
      { src: '/projects/cbs-admin-passes.jpg', caption: 'Admin portal — every pass with student, destination, issuing teacher and status' },
      { src: '/projects/cbs-admin-calendar.jpg', caption: 'Monthly attendance calendar per student, filterable by grade, section and status' },
      { src: '/projects/cbs-admin-reports.jpg', caption: 'Reports with date-range CSV export, totals and average pass duration' },
    ],
    caseStudy: {
      role: 'Sole developer (freelance) — requirements to production',
      period: 'Feb – Aug 2026 · web live, mobile app rolling out',
      overview:
        'Teachers were writing hall passes and attendance on paper, so nobody knew who was out of class, for how long, or which students were missing. I built one system with three surfaces on a single API: a teacher mobile app, a teacher web portal and an admin web portal. A teacher issues a pass in one step, the server enforces the school’s rules, and if a student overstays the teacher gets an alert on the phone and in the browser until the pass is closed. Attendance lives in the same place, so the office sees passes and attendance side by side.',
      surfaces: [
        {
          name: 'Teacher mobile app',
          role: 'Built',
          points: [
            'Expo / React Native app for iOS and Android: one-step pass composer — search a student, pick a destination with its time limit and capacity — plus live timers for active and completed passes.',
            'Overdue alerts in the app with selectable alert sounds and push notifications; tapping a notification opens the right pass.',
            'Class attendance on the phone — pick grade and section, mark Present, Absent, Late Arrival or Early Dismissal — and a monthly attendance report per student.',
            'Personal reports (totals, average duration, top destinations and students, history with date filters), profile, light/dark theme, secure session storage and an offline notice.',
            'Separate dev, UAT and production builds with EAS, and over-the-air updates so fixes reach teachers without a store release.',
          ],
        },
        {
          name: 'Teacher web portal',
          role: 'Built',
          points: [
            'The same workflow in the browser: create and end passes, mark daily attendance with “mark all present”, personal reports and the monthly attendance report.',
            'Live alerts in the browser via Socket.IO and Firebase web push.',
          ],
        },
        {
          name: 'Admin web portal',
          role: 'Built',
          points: [
            'Dashboard with active passes, passes today, students and teachers, plus full pass history and an activity timeline.',
            'School setup: students and teachers with CSV bulk upload, grades and sections, destinations with time limits and maximum active passes, a per-student pass limit and the school logo (stored on AWS S3).',
            'Monthly attendance calendar per student showing which teacher recorded each day, with admin correction and Excel export; pass reports with date-range CSV export.',
          ],
        },
        {
          name: 'Backend & real-time',
          role: 'Built',
          points: [
            'Express + PostgreSQL API with JWT login and admin/teacher roles; every rule is enforced on the server — destination capacity, one active pass per student per destination, and daily and concurrent pass limits per student.',
            'Pass-expiry scheduler: a timer per active pass fires at expiry, then reminds every minute until the pass is ended, and is rebuilt for all active passes when the server restarts — so no alert is lost.',
            'Notifications go out over Socket.IO and Firebase Cloud Messaging, with a delivery log per alert and device-token management.',
            'Attendance integrity: the full class roster must be submitted, one record per student per day is guaranteed by a database constraint, and a second submission for the same class is rejected.',
            'Dockerised with Docker Compose and one-step database migrations.',
          ],
        },
      ],
      challenges: [
        { title: 'Alerts that are never missed', text: 'A per-pass timer fires at expiry and repeats every minute until the pass is closed; on server restart every active pass is rescheduled. Alerts go out over Socket.IO and Firebase, and each delivery is logged.' },
        { title: 'Rules enforced on the server', text: 'Destination capacity, one active pass per destination, and daily and concurrent limits per student are all checked by the API — so the mobile app, the web portal and any future client follow the same rules.' },
        { title: 'Attendance that can’t be double-counted', text: 'The whole class roster must be submitted together, the database allows one record per student per day, and a second submission for the same class is rejected — even if two teachers press save at once.' },
      ],
      outcomes: [
        'Paper passes and attendance sheets replaced by one system — the web portals are live and in daily use at the school.',
        'School rules are enforced by the server, not just the screen: no student can exceed a limit and no class can be marked twice.',
        'Alerts survive restarts — the scheduler rebuilds timers for every active pass on boot.',
        'Delivered alone, end to end: requirements, UI, mobile app, web portals, API, database, deployment and support.',
      ],
      stack: ['Expo', 'React Native', 'Expo Router', 'React', 'Vite', 'Material UI', 'Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Firebase Cloud Messaging', 'AWS S3', 'Docker'],
    },
  },
]

// Real numbers from git history (see README). Shown in the hero.
export const stats = [
  { value: '8+', label: 'years shipping web & mobile', hint: 'Swift iOS in 2018 → full-stack today' },
  { value: '5', label: 'products in production since 2022', hint: 'CheckNShare · Verifai AI · Yard · Alfaris · CBS' },
  { value: '2', label: 'products built solo, end to end', hint: 'Yard Management · CBS Student Pass' },
  { value: '4', label: 'React Native major upgrades led', hint: 'CheckNShare ×3 · Alfaris ×1' },
]

export const trust = ['Web apps', 'Admin dashboards', 'iOS', 'Android', 'Node.js APIs', 'App Store & Play Store', 'Over-the-air updates']

export const stack = [
  { group: 'Web', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Material UI', 'Tailwind', 'Redux Toolkit', 'Redux-Saga'] },
  { group: '2D / 3D & Visual', items: ['Three.js', 'React Three Fiber', 'Konva', 'SVG overlays', 'Canvas'] },
  { group: 'Mobile', items: ['React Native', 'Expo', 'Swift', 'Android', 'BLE', 'Firebase', 'Maps'] },
  { group: 'AI in product', items: ['TensorFlow Lite', 'VisionCamera frame processors', 'Model output visualisation', 'Annotation tooling'] },
  { group: 'AI-assisted development', items: ['OpenAI Codex', 'Claude', 'Scaffolding & refactoring', 'Test generation', 'Code review'] },
  { group: 'Backend & Data', items: ['Node.js', 'Express', 'LoopBack', 'Moleculer', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Socket.IO'] },
  { group: 'Ship it', items: ['Azure DevOps', 'Azure Artifacts', 'Docker', 'AWS', 'Fastlane', 'CodePush', 'Vitest', 'Jest'] },
]

/** Smaller websites (shown under the main projects). */
export const sites = [
  {
    name: 'Allied Constructions',
    text: 'Live website for a Hyderabad construction company — services, team, project showcase, FAQs and quote requests, with GSAP animations and carousels.',
    stack: ['React 19', 'Vite', 'GSAP', 'Swiper', 'Netlify'],
    links: [
      { label: 'Live site', url: 'https://alliedconstructionshyd.com/' },
      { label: 'Code', url: 'https://github.com/ChakrapaniReddy15/AlliedConstructions' },
    ],
  },
  {
    name: 'Hanvika Clothing',
    text: 'Launch page for a women’s ethnic-wear brand with a live countdown — fast static build on a custom domain.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    links: [
      { label: 'Live site', url: 'https://www.hanvikaclothing.com/' },
      { label: 'Code', url: 'https://github.com/ChakrapaniReddy15/HanvikaClothingLanding' },
    ],
  },
]

/** Smaller deliveries that don't need a full case study. */
export const alsoBuilt = [
  {
    name: 'Fleetable — fleet operator app',
    client: 'Car rental · operations team',
    text: 'A separate mobile app for Alfaris fleet operators: track vehicles and record every vehicle going in and out, so the yard and the counter see the same fleet.',
    role: 'Built',
    stack: ['React Native', 'React'],
    related: [{ label: 'Alfaris Rent-A-Car', slug: 'car-rental' }],
  },
  {
    name: 'Food-delivery fleet client — web & yard management',
    client: 'Food delivery · fleet operations',
    text: 'Web and admin features for a Gulf food-delivery client’s fleet operations, on the shared Fleetable codebase with its own configuration and database — with my Yard Management editor and AI-assisted vehicle inspection built in.',
    role: 'Built & integrated',
    stack: ['React', 'Next.js'],
    related: [{ label: 'Yard Management', slug: 'yard-designer' }, { label: 'Verifai AI', slug: 'ai-vehicle-inspection' }],
  },
]

/** "What I bring" — strengths, each backed by projects. */
export const strengths = [
  {
    title: 'I own products end to end',
    text: 'Requirements, UI, mobile app, web portals, API, database, deployment and support — I have delivered complete products on my own and kept them running.',
    proof: [{ label: 'CBS Student Pass', slug: 'student-pass-system' }, { label: 'Yard Management', slug: 'yard-designer' }],
  },
  {
    title: 'I make complex data usable',
    text: 'AI output drawn on photos, 2D/3D yard editors, live operations dashboards — dense, technical data turned into screens non-technical people trust.',
    proof: [{ label: 'Verifai AI', slug: 'ai-vehicle-inspection' }, { label: 'Yard Management', slug: 'yard-designer' }],
  },
  {
    title: 'I keep mobile apps healthy',
    text: 'Bluetooth hardware, on-device AI, payments and multi-brand releases — and the unglamorous part: major upgrades and over-the-air fixes without pausing delivery.',
    proof: [{ label: 'CheckNShare', slug: 'corporate-car-sharing' }, { label: 'Alfaris', slug: 'car-rental' }],
  },
  {
    title: 'I build for Gulf markets',
    text: 'Arabic-first right-to-left interfaces, five languages, local payment gateways and the business rules of real rental, fleet and school operations.',
    proof: [{ label: 'Alfaris', slug: 'car-rental' }, { label: 'CheckNShare', slug: 'corporate-car-sharing' }],
  },
]

/** Career journey — oldest first, so it reads as growth. */
export const journey = [
  { when: '2017', title: 'B.E. Computer Science & Engineering', at: 'Sathyabama University · Chennai', text: 'Where it started.', level: 'Foundations' },
  { when: '2018 — 2019', title: 'iOS Developer', at: 'Havik Healthcare · Hyderabad', text: 'First production apps: healthcare iOS apps in Swift with in-app chat and push notifications.', level: 'Native mobile' },
  { when: '2019 — 2020', title: 'Mobile Application Developer', at: 'RasiInfotech · Salem', text: 'Jewellery POS and billing app with Bluetooth printing and QR scanning, plus chit-fund and restaurant apps.', level: 'Hardware & business apps' },
  { when: '2020 — 2021', title: 'Team Lead — Mobile & Web', at: 'BrandIT Technologies · Visakhapatnam', text: 'Led and mentored five developers and built Tip My Ticket end to end — React Native app, web app and Django backend.', level: 'First team, first full product' },
  { when: '2021 — 2022', title: 'Software Developer', at: 'Digicorp Information Systems · Ahmedabad', text: 'React Native investment app (Sprint Money) with a payment gateway, REST APIs and push notifications.', level: 'Fintech-grade quality' },
  { when: '2022 — Now', title: 'Senior Software Engineer', at: 'RunCode Software Solutions · Hyderabad', text: 'Mobility and fleet products for Middle East clients: lead mobile engineer on CheckNShare since 2022, the Verifai AI inspection web app, the Alfaris rental app and website, and — solo — the Yard Management 2D/3D platform, used in the Fleetable portal and a food-delivery client’s portal — plus a fleet-operator app for Alfaris.', level: 'From mobile lead to whole platforms', products: ['CheckNShare', 'Verifai AI', 'Alfaris Rent-A-Car', 'Yard Management', 'Fleetable', 'Food-delivery fleet client'] },
  { when: '2026', title: 'Freelance Full-Stack Developer', at: 'CBS Student Pass & Attendance', text: 'A complete school system delivered alone for a paying client: teacher mobile app, teacher and admin web portals, real-time API and deployment.', level: 'A whole product, solo' },
]

/** What I'm looking for next. */
export const next = {
  title: 'Next: a senior or lead role where I own a product',
  text: 'I’m looking for a senior or lead full-stack / mobile role on a product team — owning features from idea to production across web and mobile, and helping the people around me ship better too.',
}
