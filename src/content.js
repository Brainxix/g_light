// All site copy lives here so it can be edited without touching layout code.
//
// Anything marked CONFIRM comes from the client's brief as a suggestion and
// must be checked against reality before the site goes live.

export const BRAND = {
  name: 'G-LIGHT',
  descriptor: 'Electrical & Energy Solutions',
  tagline: 'Powering progress.',
};

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
];

export const HERO = {
  headline: ['Engineering power.', 'Enabling progress.'],
  lead:
    'G-LIGHT delivers electrical engineering, solar energy and power solutions designed to keep homes, businesses and critical infrastructure powered. From a single installation to complex energy systems, we engineer it, build it and keep it running.',
  primary: { label: 'Start a project', to: '/contact' },
  secondary: { label: 'Explore our capabilities', to: '/capabilities' },
  areas: ['Electrical Engineering', 'Solar Energy', 'Power Systems', 'Maintenance', 'Energy Solutions'],
};

export const STATEMENT = {
  heading: 'Power is more than electricity.',
  lines: [
    'It is what keeps a hospital operating.',
    'It is what keeps a business productive.',
    'It is what keeps a home connected.',
    'It is what allows industries to grow.',
  ],
  close: "That's why we don't simply install power systems. We engineer them.",
  body:
    'G-LIGHT combines electrical engineering, renewable energy and technical expertise to deliver reliable power solutions built for today and engineered for tomorrow.',
};

// `short` is the one-line description used on the Home page cards.
// `long` and `items` are used on the Capabilities page.
export const CAPABILITIES = [
  {
    slug: 'electrical',
    title: 'Electrical Engineering',
    short: 'Building wiring, electrical installations, distribution systems, troubleshooting and electrical infrastructure.',
    long: 'The foundation of every project: wiring, distribution and installation work done with technical discipline and attention to detail.',
    items: [
      'Building wiring and installations',
      'Full conduit wiring',
      'Half conduit wiring',
      'Distribution systems',
      'Home appliance installation',
      'Interior and decorative lighting',
      'Troubleshooting',
    ],
  },
  {
    slug: 'solar',
    title: 'Solar Energy',
    short: 'Solar PV systems, hybrid systems, battery storage and complete renewable-energy solutions.',
    long: 'Solar and hybrid power systems, from design and installation through battery storage and ongoing maintenance.',
    items: [
      'Solar PV installation',
      'Hybrid systems',
      'Battery storage',
      'Solar maintenance and servicing',
      'Complete renewable-energy solutions',
    ],
    accent: 'amber',
  },
  {
    slug: 'power-systems',
    title: 'Power Systems',
    short: 'Inverters, battery systems, backup power, power distribution and system integration.',
    long: 'Systems that have to work when they are needed: inverters, batteries and backup power engineered as one integrated solution.',
    items: ['Inverter systems', 'Battery systems', 'Backup power', 'Power distribution', 'System integration'],
  },
  {
    slug: 'commercial-industrial',
    title: 'Commercial & Industrial',
    short: 'Electrical infrastructure for offices, hotels, institutions, commercial buildings and industrial applications.',
    long: 'Electrical infrastructure for buildings and operations that cannot afford downtime.',
    items: ['Offices', 'Hotels', 'Institutions', 'Commercial buildings', 'Industrial applications'],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Support',
    short: 'Preventive maintenance, troubleshooting, diagnostics and system optimization.',
    long: 'Keeping installed systems performing through preventive maintenance, diagnostics and optimization.',
    items: ['Preventive maintenance', 'Troubleshooting', 'Diagnostics', 'System optimization'],
  },
  {
    slug: 'consulting',
    title: 'Energy Consulting',
    short: 'Energy audits, system design, capacity assessment and technical recommendations.',
    long: 'Technical guidance before you build: understanding the load, sizing the system and recommending the right approach.',
    items: ['Energy audits', 'System design', 'Capacity assessment', 'Technical recommendations'],
  },
];

// CONFIRM: details and permission to name each client publicly.
export const FEATURED_PROJECTS = [
  {
    name: 'Seaside Hotels',
    location: 'Sagbama',
    sector: 'Hospitality',
    description: 'Three single-phase inverter systems integrated into a three-phase power solution.',
  },
  {
    name: 'Everlight Hotel & Suites',
    location: 'Yenagoa',
    sector: 'Hospitality',
    description: 'Complete electrical installation.',
  },
  {
    name: 'Otuoke Residential Development',
    location: 'Otuoke',
    sector: 'Residential',
    description: 'Multi-unit electrical infrastructure.',
  },
  {
    name: 'African University',
    location: 'Toro Orua',
    sector: 'Institution',
    description: 'Computer laboratory electrical installation.',
  },
];

// CONFIRM: these are the client's suggested figures. Publish only numbers
// that can be substantiated, and treat "24/7" as a real operating commitment.
export const METRICS = {
  heading: 'Built on experience. Engineered for scale.',
  items: [
    { value: '10+', label: 'Years of electrical experience' },
    { value: '5+', label: 'Years in solar energy' },
    { value: '100+', label: 'Projects delivered' },
    { value: '3+', label: 'States served' },
    { value: '24/7', label: 'Technical commitment' },
  ],
};

export const PRINCIPLES = [
  { title: 'Engineered', text: 'We approach every project with technical discipline and attention to detail.' },
  { title: 'Reliable', text: 'Power systems must work when they are needed. Reliability is fundamental to our work.' },
  { title: 'Innovative', text: 'We continuously learn, adapt and adopt better technologies.' },
  {
    title: 'Built to last',
    text: "We don't just deliver installations. We build systems designed for long-term performance.",
  },
];

export const HOME_CTA = {
  heading: 'Have a power project?',
  body: "Tell us what you're building. We'll help you engineer the power behind it.",
  primary: { label: 'Start your project', to: '/contact' },
  secondary: { label: 'Talk to an engineer', to: '/contact' },
};
