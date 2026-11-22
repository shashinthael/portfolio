// Word for word from the Master CV.

export interface Degree {
  title: string;
  grade: string;
  school: string;
  dates: string;
  lines: { text: string; linkTo?: string }[];
}

export const education: Degree[] = [
  {
    title: 'MSc Software Engineering',
    grade: 'Merit',
    school: 'University of Hertfordshire',
    dates: 'Jan 2025 – May 2026',
    lines: [
      { text: 'Modules included software quality and validation, design patterns, and agile development.' },
      { text: 'Dissertation: AXD-Fraud, fraud detection with neural networks.', linkTo: '#work' },
    ],
  },
  {
    title: 'BSc (Hons) Software Engineering',
    grade: 'First Class',
    school: 'University of Wolverhampton',
    dates: '2021 – 2024',
    // Text only until the project's code is found (spec §2).
    lines: [{ text: 'Final-year project: Market Price Forecasting Platform.' }],
  },
];

export const skills: { group: string; items: string }[] = [
  { group: 'AI & ML', items: 'Agentic workflows, Azure OpenAI, Azure AI Foundry, Claude Code, TensorFlow, LSTM, SHAP, pandas, NumPy' },
  { group: 'Software Development', items: 'C#, .NET, Python, Node.js, REST APIs, Microservices, FastAPI, Flask' },
  { group: 'Frontend', items: 'React, Next.js, TypeScript, JavaScript, HTML, CSS, Astro, three.js' },
  { group: 'Cloud & DevOps', items: 'Azure, Amazon Web Services (AWS), Docker, CI/CD, GitHub Actions, Azure DevOps, Application Insights' },
  { group: 'Data', items: 'SQL Server, PostgreSQL, MongoDB' },
  { group: 'Testing & Practices', items: 'xUnit, pytest, Code review, Git, Agile / Scrum' },
];
