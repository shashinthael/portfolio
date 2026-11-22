// The hero's Stack: the parts named in the Master CV's Albhadreen stack line, and how they connect.
// The same data draws the 3D scene, its SVG fallback and the share image.

export interface StackNode {
  id: string;
  label: string;
  /** Shorter label for phones. */
  short: string;
  pos: [number, number, number];
  hub?: boolean;
}

export const stackCaption = 'The stack I work in at Albhadreen';

export const stackNodes: StackNode[] = [
  { id: 'fe', label: 'React · TypeScript', short: 'React · TS', pos: [-1.8, 1.2, 0.3] },
  { id: 'api', label: 'REST APIs', short: 'REST', pos: [-1.1, -0.35, 0.9] },
  { id: 'net', label: '.NET microservices', short: '.NET', pos: [0, 0.35, 0], hub: true },
  { id: 'sql', label: 'SQL Server', short: 'SQL', pos: [1.5, -1.1, 0.4] },
  { id: 'az', label: 'Azure', short: 'Azure', pos: [1.7, 1.05, -0.4] },
  { id: 'ai', label: 'Azure OpenAI · AI Foundry (experimental)', short: 'Azure OpenAI (exp.)', pos: [0.2, 1.95, -0.9] },
  { id: 'gha', label: 'GitHub Actions', short: 'Actions', pos: [-0.5, -1.55, -0.6] },
  { id: 'dock', label: 'Docker', short: 'Docker', pos: [0.6, -1.95, 0.9] },
  { id: 'ins', label: 'App Insights', short: 'Insights', pos: [1.75, -0.2, 1.1] },
  { id: 'test', label: 'xUnit · pytest', short: 'Tests', pos: [-1.9, -1.2, -0.2] },
];

export const stackLinks: [string, string][] = [
  ['fe', 'api'], ['api', 'net'], ['net', 'sql'], ['net', 'az'], ['net', 'ai'], ['gha', 'dock'],
  ['dock', 'az'], ['az', 'ins'], ['ins', 'net'], ['gha', 'net'], ['test', 'gha'], ['test', 'net'],
];
