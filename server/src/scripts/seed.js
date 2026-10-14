/**
 * seed.js - Firestore Database Seeding Script for SkillBridge
 * 
 * Populates Firestore with initial volunteer mentors and curated free learning resources.
 * 
 * Run with:
 * npm run seed
 */

import dotenv from 'dotenv';
dotenv.config();

import { getFirestoreDb } from '../config/firebase.js';

const INITIAL_MENTORS = [
  {
    name: 'Amina Yusuf',
    role: 'Senior Frontend Engineer',
    organization: 'Open Source Fellow',
    initials: 'AY',
    bio: 'Passionate about helping first-generation college students master React, JavaScript fundamentals, and responsive web design.',
    skills: ['React', 'JavaScript', 'CSS Grid', 'Web Accessibility'],
    availability: 'This Week',
    rating: 4.9,
    sessionsCompleted: 24,
    availableSlots: ['Tomorrow, 3:00 PM', 'Thursday, 5:30 PM', 'Friday, 11:00 AM'],
    active: true,
  },
  {
    name: 'Carlos Mendoza',
    role: 'Full Stack Developer',
    organization: 'CivicTech Collective',
    initials: 'CM',
    bio: 'Self-taught developer turned full-stack mentor. Happy to review student projects, Node.js/Express backends, and Git workflows.',
    skills: ['Node.js', 'Express', 'JavaScript', 'Git & GitHub'],
    availability: 'Weekend',
    rating: 5.0,
    sessionsCompleted: 19,
    availableSlots: ['Saturday, 10:00 AM', 'Saturday, 2:00 PM', 'Sunday, 1:00 PM'],
    active: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist & AI Researcher',
    organization: 'HealthTech Labs',
    initials: 'PS',
    bio: 'Guiding underserved learners through Python, pandas, and data structures. Mentoring on how to break into data science without an elite degree.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
    availability: 'Evening',
    rating: 4.8,
    sessionsCompleted: 31,
    availableSlots: ['Wednesday, 7:00 PM', 'Thursday, 6:30 PM', 'Friday, 7:00 PM'],
    active: true,
  },
  {
    name: 'Marcus Chen',
    role: 'Tech Lead & Career Coach',
    organization: 'Fintech Solutions',
    initials: 'MC',
    bio: '10+ years in software engineering. Offering mock technical interviews, resume teardowns, and confidence coaching for hackathons.',
    skills: ['Interview Prep', 'Resume Review', 'System Design', 'Career Guidance'],
    availability: 'This Week',
    rating: 5.0,
    sessionsCompleted: 45,
    availableSlots: ['Tuesday, 4:00 PM', 'Wednesday, 2:00 PM', 'Friday, 3:30 PM'],
    active: true,
  },
  {
    name: 'Fatima Al-Mansoor',
    role: 'UI/UX Product Designer',
    organization: 'Community First Design',
    initials: 'FA',
    bio: 'Helping young creators design intuitive user interfaces with Figma and user research methodologies. Design for social good.',
    skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    availability: 'Weekend',
    rating: 4.9,
    sessionsCompleted: 15,
    availableSlots: ['Saturday, 11:30 AM', 'Saturday, 3:30 PM', 'Sunday, 4:00 PM'],
    active: true,
  },
  {
    name: 'David Okafor',
    role: 'DevOps & Cloud Engineer',
    organization: 'CloudBridge',
    initials: 'DO',
    bio: 'Passionate about demystifying Docker, CI/CD, and deploying applications for free on platforms like Render and Vercel.',
    skills: ['Cloud & DevOps', 'Docker', 'Linux', 'Git & GitHub'],
    availability: 'Evening',
    rating: 4.7,
    sessionsCompleted: 12,
    availableSlots: ['Monday, 6:00 PM', 'Wednesday, 8:00 PM', 'Thursday, 7:30 PM'],
    active: true,
  },
  {
    name: 'Elena Rostova',
    role: 'Software Engineer',
    organization: 'EdTech For All',
    initials: 'ER',
    bio: 'Specializing in computer science fundamentals, algorithm practice, and preparing for competitive programming and hackathon judging.',
    skills: ['Data Structures', 'Python', 'Algorithms', 'Interview Prep'],
    availability: 'This Week',
    rating: 4.9,
    sessionsCompleted: 28,
    availableSlots: ['Wednesday, 1:00 PM', 'Thursday, 3:00 PM', 'Friday, 4:00 PM'],
    active: true,
  },
  {
    name: 'Jordan Taylor',
    role: 'Frontend Accessibility Lead',
    organization: 'Inclusive Web Org',
    initials: 'JT',
    bio: 'Dedicated to teaching accessible HTML/CSS, semantic markup, and modern React best practices to learners from non-traditional paths.',
    skills: ['React', 'JavaScript', 'Web Accessibility', 'Career Guidance'],
    availability: 'Weekend',
    rating: 5.0,
    sessionsCompleted: 22,
    availableSlots: ['Saturday, 1:00 PM', 'Sunday, 11:00 AM', 'Sunday, 2:30 PM'],
    active: true,
  },
];

const INITIAL_RESOURCES = [
  {
    title: 'MDN Web Docs: Learn Web Development',
    description: 'The gold standard documentation and structured curriculum for HTML, CSS, and modern JavaScript directly from Mozilla.',
    category: 'Frontend',
    format: 'Documentation & Tutorials',
    difficulty: 'Beginner',
    url: 'https://developer.mozilla.org/en-US/docs/Learn',
    highlight: 'Official Standard',
  },
  {
    title: 'The Odin Project',
    description: 'A free, open-source full-stack curriculum that takes students from zero to job-ready portfolio projects using Git and JavaScript.',
    category: 'Full Stack',
    format: 'Interactive Curriculum',
    difficulty: 'Beginner',
    url: 'https://www.theodinproject.com/',
    highlight: 'Project-Based',
  },
  {
    title: 'CS50x: Introduction to Computer Science',
    description: 'Harvard University’s renowned entry-level computer science course covering algorithms, memory, C, Python, SQL, and web development.',
    category: 'CS Fundamentals',
    format: 'University Course',
    difficulty: 'Beginner',
    url: 'https://cs50.harvard.edu/x/',
    highlight: 'Harvard University',
  },
  {
    title: 'roadmap.sh: Developer Roadmaps',
    description: 'Visual roadmaps, learning paths, and recommended topics for Frontend, Backend, DevOps, and Computer Science career paths.',
    category: 'Career & Roadmaps',
    format: 'Interactive Guides',
    difficulty: 'All Levels',
    url: 'https://roadmap.sh/',
    highlight: 'Visual Paths',
  },
  {
    title: 'freeCodeCamp: Responsive Web Design',
    description: 'Hands-on interactive coding challenges covering responsive CSS, accessibility standards, and flexbox/grid layout design.',
    category: 'Frontend',
    format: 'Interactive Coding',
    difficulty: 'Beginner',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    highlight: 'Hands-on Practice',
  },
  {
    title: 'Python for Everybody (PY4E)',
    description: 'Dr. Charles Severance’s free beginner Python course teaching data structures, web scraping, and database access.',
    category: 'Backend & Python',
    format: 'Free Course & Textbook',
    difficulty: 'Beginner',
    url: 'https://www.py4e.com/',
    highlight: 'Free Textbook Included',
  },
  {
    title: 'Full Stack Open (University of Helsinki)',
    description: 'Deep dive into modern web development with React, Redux, Node.js, Express, REST APIs, and automated testing.',
    category: 'Full Stack',
    format: 'University Course',
    difficulty: 'Intermediate',
    url: 'https://fullstackopen.com/en/',
    highlight: 'Modern Stack',
  },
  {
    title: 'Tech Interview Handbook',
    description: 'Free curated study guides for coding interviews, algorithmic patterns, resume writing, and behavioral interview questions.',
    category: 'Career & Roadmaps',
    format: 'Interview Guide',
    difficulty: 'Intermediate',
    url: 'https://www.techinterviewhandbook.org/',
    highlight: 'Interview Cheatsheet',
  },
  {
    title: 'Kaggle: Learn Data Science & Python',
    description: 'Bite-sized, hands-on micro-courses in pandas, machine learning, data visualization, and exploratory data analysis.',
    category: 'Data Science',
    format: 'Interactive Notebooks',
    difficulty: 'Beginner',
    url: 'https://www.kaggle.com/learn',
    highlight: 'Jupyter Notebooks',
  },
  {
    title: 'Missing Semester of Your CS Education (MIT)',
    description: 'The tools you need for software engineering: command line shell scripting, Git version control, SSH, and debugging.',
    category: 'CS Fundamentals',
    format: 'Video & Notes',
    difficulty: 'Beginner',
    url: 'https://missing.csail.mit.edu/',
    highlight: 'MIT Open Course',
  },
];

async function seed() {
  console.log('--- SkillBridge Database Seeding ---');
  try {
    const db = await getFirestoreDb();

    console.log('1. Seeding mentors collection...');
    const mentorBatch = db.batch();
    for (const mentor of INITIAL_MENTORS) {
      const docRef = db.collection('mentors').doc();
      mentorBatch.set(docRef, { ...mentor, createdAt: new Date().toISOString() });
    }
    await mentorBatch.commit();
    console.log(`✓ Successfully seeded ${INITIAL_MENTORS.length} volunteer mentors!`);

    console.log('2. Seeding resources collection...');
    const resourceBatch = db.batch();
    for (const resource of INITIAL_RESOURCES) {
      const docRef = db.collection('resources').doc();
      resourceBatch.set(docRef, { ...resource, createdAt: new Date().toISOString() });
    }
    await resourceBatch.commit();
    console.log(`✓ Successfully seeded ${INITIAL_RESOURCES.length} learning resources!`);

    console.log('\nSeed completed successfully! Database is ready for SkillBridge.');
    process.exit(0);
  } catch (err) {
    console.error('\nSeeding failed:', err.message);
    console.error('Ensure Firebase credentials are set in .env before running seed.');
    process.exit(1);
  }
}

seed();
