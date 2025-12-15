import { Theme, FontOption, Template } from "./types";

export const FONTS: FontOption[] = [
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'lato', name: 'Lato', family: "'Lato', sans-serif" },
  { id: 'opensans', name: 'Open Sans', family: "'Open Sans', sans-serif" },
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'raleway', name: 'Raleway', family: "'Raleway', sans-serif" },
  { id: 'merriweather', name: 'Merriweather', family: "'Merriweather', serif" },
  { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif" },
  { id: 'lora', name: 'Lora', family: "'Lora', serif" },
];

export const THEMES: Theme[] = [
  {
    id: 'sage',
    name: 'Sage & Slate (Default)',
    colors: {
      primary: '#334155', // Slate 700
      secondary: '#475569', // Slate 600
      body: '#4B5563', // Gray 600
      accent: '#CBD5E1', // Slate 300
      link: '#2563EB', // Blue 600
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: '#0C4A6E', // Sky 900
      secondary: '#0369A1', // Sky 700
      body: '#374151', // Gray 700
      accent: '#BAE6FD', // Sky 200
      link: '#0284C7', // Sky 600
    }
  },
  {
    id: 'rose',
    name: 'Dusty Rose',
    colors: {
      primary: '#881337', // Rose 900
      secondary: '#9F1239', // Rose 800
      body: '#4B5563', 
      accent: '#FECDD3', // Rose 200
      link: '#E11D48', // Rose 600
    }
  },
  {
    id: 'lavender',
    name: 'Lavender Mist',
    colors: {
      primary: '#581C87', // Purple 900
      secondary: '#6B21A8', // Purple 800
      body: '#374151',
      accent: '#E9D5FF', // Purple 200
      link: '#7C3AED', // Purple 600
    }
  },
  {
    id: 'charcoal',
    name: 'Charcoal & Mint',
    colors: {
      primary: '#18181B', // Zinc 900
      secondary: '#27272A', // Zinc 800
      body: '#52525B', // Zinc 600
      accent: '#A7F3D0', // Emerald 200 (Mint)
      link: '#059669', // Emerald 600
    }
  }
];

export const INITIAL_MARKDOWN = `# Jordan Smith

Email: jordan.smith@example.com | Phone: +1-555-010-2020 | [linkedin.com/in/jordansmith](https://linkedin.com)

### Profile Summary

Senior Engineer and Team Lead with over 12 years of full-stack experience, specializing in **React** and **Node.js** within startup ecosystems.

### Technical Skills

* **Languages & Frameworks:** React, Node.js, Express.js, JavaScript, Ruby on Rails, Angular.
* **Architecture & Data:** Microservices, REST API Design, PostgreSQL, MySQL.
* **DevOps & Tools:** AWS, Docker, CI/CD (Jenkins, CircleCI), Git, TDD/BDD (RSpec, Minitest).

### Professional Experience

**Engineering Team Lead** | **TechFlow Systems** | *Feb 2025 - Present*

* Leading the Courier Integrations squad, fostering a high-performance engineering culture and overseeing technical execution.
* Managing sprint planning and technical roadmaps while contributing to the 'Supership' project by defining user flows and mockups for the application.
* Assessing technical feasibility of new integrations and ensuring alignment with product roadmaps.

**Technical Consultant** | **Multiple Clients** | *May 2022 - Feb 2025*

* Architected and delivered front-end solutions for multiple clients using **React**, ensuring high performance and seamless user experiences.
* Specialized in creating stable, intuitive interfaces that reduced customer support tickets.
* Mentored client teams to improve code stability, reducing bug reports through improved testing strategies.

**Lead Software Engineer** | **Global Solutions Inc** | *April 2021 - May 2022*

* Guided front-end development and technical improvements for a large-scale **React** application.
* Designed solutions for both Rails and **React** codebases, facilitating cross-functional development across four distinct engineering teams.
* Mentored a team of 10 developers on modern JavaScript and front-end best practices, increasing team capacity by 40%.
`;

const TEMPLATE_FRESHER = `# Alex Taylor
Email: alex.taylor@example.com | Phone: +1-555-010-9988 | [github.com/alext](https://github.com)

### Education

**Bachelor of Science in Computer Science** | **University of Technology** | *2021 - 2025*
* GPA: 3.8/4.0
* Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management.

### Skills

* **Languages:** Python, Java, JavaScript, TypeScript, HTML/CSS.
* **Tools:** Git, VS Code, Figma, Postman.
* **Soft Skills:** Problem Solving, Team Collaboration, Technical Writing.

### Projects

**E-Commerce Dashboard** | *React, Node.js, MongoDB*
* Developed a responsive admin dashboard for tracking sales and inventory.
* Implemented real-time data visualization using Recharts.
* Designed RESTful APIs for product management.

**Task Manager App** | *Python, Flask, SQLite*
* Built a lightweight task management application with user authentication.
* Implemented CRUD operations and deployed on Heroku.

### Internships

**Frontend Intern** | **Tech Solutions Inc.** | *Summer 2024*
* Assisted in migrating legacy code to **React**.
* Fixed UI bugs and improved mobile responsiveness, increasing mobile engagement by 15%.
`;

const TEMPLATE_PRODUCT = `# Sarah Jenkins
Email: sarah.j@example.com | Phone: +1-555-123-4567 | [linkedin.com/in/sarahj](https://linkedin.com)

### Professional Summary
Results-oriented Product Manager with 5+ years of experience driving product strategy and execution in SaaS environments. Proven track record of increasing user retention and launching successful features.

### Experience

**Senior Product Manager** | **SaaS Growth Corp** | *2022 - Present*
* Led the launch of the "Analytics Pro" suite, resulting in a **20% increase in ARR**.
* Conducted user research and market analysis to define product roadmaps.
* Collaborated with engineering and design teams to deliver features on time and within scope.

**Product Owner** | **Innovate Ltd** | *2019 - 2022*
* Managed the backlog for a cross-functional agile team of 8 developers.
* Reduced churn by **10%** through targeted UX improvements.
* Facilitated sprint planning, reviews, and retrospectives.

### Skills
* **Strategy:** Roadmap Planning, Market Research, Competitive Analysis, Go-to-Market.
* **Tools:** Jira, Confluence, Amplitude, Figma, Mixpanel.
* **Methodologies:** Agile, Scrum, Kanban, Design Thinking.

### Education
**MBA** | **Stanford Graduate School of Business** | *2019*
**BA in Economics** | **University of California, Berkeley** | *2017*
`;

export const TEMPLATES: Template[] = [
  { id: 'senior', name: 'Senior / Lead (Default)', content: INITIAL_MARKDOWN },
  { id: 'fresher', name: 'Student / Fresher', content: TEMPLATE_FRESHER },
  { id: 'product', name: 'Product Manager', content: TEMPLATE_PRODUCT },
];


export const SYSTEM_INSTRUCTION = `You are an expert Resume Writer and Career Coach. 
Your task is to take the provided markdown resume content and improve it.
Rules:
1. Fix any grammar or spelling errors.
2. Improve the clarity and impact of bullet points (use strong action verbs).
3. Do NOT change the underlying structure or Markdown formatting significantly.
4. Keep specific tech stacks and dates exactly as they are.
5. Aim for a professional, concise tone.
6. Return ONLY the raw markdown string. No surrounding markdown code blocks (e.g., no \`\`\`).`;
