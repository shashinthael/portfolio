// Everything a Reader learns about Shashintha comes from the Master CV
// (~/Dev/CV/deliverables/cv/Shashintha-Edirisooriya-CV.html). Copy changes from there by hand;
// tests/unit/claim-rules.test.ts fails the build if a change breaks the claim rules.

export const profile = {
  firstName: 'Shashintha',
  lastName: 'Edirisooriya',
  fullName: 'Shashintha Edirisooriya',
  role: 'Full Stack Developer · AI & LLM Applications',
  jobTitle: 'Full Stack Developer',
  lede: "I build .NET microservices, React front ends and the pipelines that ship them to Azure, and I'm helping my team experiment with agentic AI.",
  phoneLine: 'Albhadreen · London · UK right to work to Nov 2028 · MSc, BSc First Class',
  city: 'London',
  employer: 'Albhadreen',
  email: 'shashinthael@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shashinthael',
  github: 'https://github.com/shashinthael',
  cv: '/cv/Shashintha-Edirisooriya-CV.pdf',
  site: 'https://shashintha.dev',
  signOff: "Let's build something.",
} as const;

export const seo = {
  title: 'Shashintha Edirisooriya · Full Stack Developer · London',
  description:
    'Full stack developer in London working across .NET microservices, React and Azure, and helping my team experiment with agentic AI. UK right to work. Projects, experience and CV.',
} as const;

/** The Fact strip: always in the first screen (the Scan test). */
export const facts = [
  { label: 'Now', value: 'Intermediate Full Stack Developer, Albhadreen' },
  { label: 'Stack', value: 'C#, .NET, React, TypeScript, Python, Azure' },
  { label: 'Based', value: 'London · hybrid, remote or relocation' },
  { label: 'Right to work', value: 'UK Graduate visa, valid to Nov 2028' },
  { label: 'Education', value: 'MSc Software Engineering (Merit) · BSc First Class' },
] as const;
