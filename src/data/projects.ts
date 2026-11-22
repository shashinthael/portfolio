// Featured projects, in Gallery order. Claims come from the Master CV or, for projects not on it,
// from the project's own repo. See docs/portfolio-spec.md §2 and §4.

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  kind: string;
  paragraphs: string[];
  stack: string[];
  links: Link[];
  /** File name in src/assets/screens/, when a screenshot exists. */
  screen?: 'zeylan' | 'kivorana';
}

export const featured: Project[] = [
  {
    id: 'axd-fraud',
    title: 'AXD-Fraud',
    kind: 'MSc dissertation · 2026',
    paragraphs: [
      'My MSc dissertation. A neural network spots fraudulent card transactions, SHAP explains each prediction, and a drift detector I wrote from scratch flags when the model starts to degrade.',
      'The best model reached an F1-score of 0.82, evaluated without data leakage.',
    ],
    stack: ['Python', 'TensorFlow', 'SHAP', 'Flask', 'React'],
    links: [{ label: 'GitHub', href: 'https://github.com/shashinthael/Fraud-Detection-' }],
  },
  {
    // Name the shop or its town only with the shop owner's OK (spec §4).
    id: 'edirisooriya-stores',
    title: 'Edirisooriya Stores',
    kind: 'Shop system · 2026',
    paragraphs: [
      'A shop system for a retail and wholesale shop: a counter POS with billing, credit customers and stock, an iPhone app for the owner, and a cloud copy.',
      'The business rules are plain TypeScript with their own tests, and the cloud security rules are tested too.',
    ],
    stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Supabase'],
    links: [],
  },
  {
    id: 'zeylan',
    title: 'Zeylan',
    kind: 'Personal project · 2026',
    paragraphs: [
      "A trip planner for Sri Lanka holidays. Visitors choose who's travelling, how long and a comfort level, then see a price estimate and the best route on a 3D island.",
      'Enquiries are spam-checked, stored and emailed, and every change is tested and deployed by CI.',
    ],
    stack: ['TypeScript', 'Astro', 'three.js', 'Cloudflare Workers', 'D1'],
    links: [{ label: 'Live site', href: 'https://zeylan.zeylan-travel.workers.dev' }],
    screen: 'zeylan',
  },
  {
    id: 'kivorana',
    title: 'Kivorana',
    kind: 'My web studio · 2026',
    paragraphs: [
      'The site for my own web studio for local businesses. Every price on every page is calculated from one config file.',
      'It includes a scripted demo of the AI assistant I offer to cafés and B&Bs.',
    ],
    stack: ['Next.js', 'TypeScript', 'Cloudflare Pages'],
    links: [{ label: 'Live site', href: 'https://kivorana.pages.dev' }],
    screen: 'kivorana',
  },
];

/** One line each, shown only once each project's code is public with a README (spec §4). */
export const archive: { title: string; line: string; href: string }[] = [];
