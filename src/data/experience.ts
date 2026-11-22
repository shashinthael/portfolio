// Word for word from the Master CV.

export interface Role {
  title: string;
  org: string;
  place: string;
  dates: string;
  note?: string;
  bullets: string[];
  stack: string;
}

export const experience: Role[] = [
  {
    title: 'Intermediate Full Stack Developer',
    org: 'Albhadreen (Pvt) Ltd',
    place: 'Sri Lanka · remote from London',
    dates: 'Aug 2025 – Present',
    note: 'Part-time while completing my MSc, full-time from May 2026.',
    bullets: [
      "Build and maintain .NET microservices and REST APIs for the company's overseas recruitment platform, as one of three developers in an eight-person Scrum team.",
      'Develop the React and TypeScript front end.',
      'Set up the GitHub Actions pipelines that build, test and deploy every service to Azure in Docker containers.',
      'Write unit tests with xUnit and pytest, review pull requests, and monitor services with Application Insights.',
      'Help the team experiment with agentic AI workflows on Azure OpenAI and Azure AI Foundry to automate manual recruitment processes.',
      'Use Claude Code day to day for development work.',
    ],
    stack: 'C#, .NET, React, TypeScript, SQL Server, Python, Azure (OpenAI, AI Foundry), Docker, GitHub Actions, Application Insights',
  },
  {
    title: 'Junior Full Stack Developer',
    org: 'Innovio IT Solutions',
    place: 'Colombo, Sri Lanka',
    dates: 'Jun 2024 – Jan 2025',
    bullets: [
      'Built front-end features in React for a commercial point-of-sale system.',
      'Developed Node.js REST endpoints and the SQL queries behind them.',
      'Wrote automated tests and reviewed pull requests.',
      'Shipped through Azure DevOps pipelines as part of a Scrum team.',
    ],
    stack: 'React, Node.js, SQL, Docker, Azure DevOps, Application Insights',
  },
];
