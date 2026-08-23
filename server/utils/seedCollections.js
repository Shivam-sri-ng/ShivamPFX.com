/**
 * seedCollections.js
 * Creates/populates: contacts, projects, and about collections in MongoDB Atlas
 * Run: node utils/seedCollections.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Message    = require('../models/Contact');  // model renamed to Message → saves to 'messages' collection
const Project = require('../models/Project');
const About   = require('../models/About');
const Skill   = require('../models/Skill');
const Social  = require('../models/Social');
const Experience = require('../models/Experience');
const Education  = require('../models/Education');

const run = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('\n🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected! DB:', mongoose.connection.name, '\n');

    // ─────────────────────────────────────────
    // 1. ABOUT collection
    // ─────────────────────────────────────────
    console.log('📋 Seeding About...');
    await About.deleteMany({});
    await About.create({
      name: 'Shivam Srivastava',
      title: 'Full Stack Engineer & Data Analyst / Scientist',
      typingTexts: [
        'Full Stack Engineer',
        'Backend-Focused Developer',
        'Data Analyst & Scientist',
        'MERN Stack Specialist',
        'Python & SQL Analytics Expert',
      ],
      shortBio:
        'Versatile Full Stack Engineer and Data Analyst/Scientist specializing in scalable web applications, predictive machine learning models, and interactive data analytics dashboards.',
      bio:
        'I am Shivam Srivastava, a results-driven Full Stack and Backend Developer with hands-on industry experience delivering production web applications using Python, Django, Node.js, Express.js, and React.js. I bridge the gap between robust software engineering and high-impact data analytics — designing end-to-end data-driven applications that transform complex data into actionable business intelligence.',
      email: 'shivamsrivastava0122@gmail.com',
      phone: '+91 9170845849',
      location: 'Ghaziabad, Uttar Pradesh',
      freelance: 'Available for Hire',
      profileImage: '/shiva_pro.jpeg',
      aboutImage: '/shiva_pro.jpeg',
      resumeUrl: '/Shivam_2.0_CV.pdf',
    });
    console.log('   ✅ About collection ready\n');

    // ─────────────────────────────────────────
    // 2. PROJECTS collection
    // ─────────────────────────────────────────
    console.log('🚀 Seeding Projects...');
    await Project.deleteMany({});
    await Project.insertMany([
      {
        title: 'Retrieval-Augmented AI Assistant',
        description:
          'AI assistant using TF-IDF semantic search over a SQLite knowledge base for contextual answers, integrated with Gemini API.',
        longDescription:
          'Developed a retrieval-augmented assistant using TF-IDF semantic search over a SQLite knowledge base for contextual answers. Used Pandas to preprocess and structure the knowledge base. Integrated Gemini API via REST APIs with response caching, cutting repeat query latency by 60%. Deployed on Vercel.',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-sri-ng',
        githubUrl: 'https://github.com/shivam-sri-ng',
        technologies: ['Python', 'TF-IDF', 'SQLite', 'Pandas', 'Gemini API', 'REST APIs', 'Vercel'],
        category: 'AI & ML',
        featured: true,
        order: 1,
      },
      {
        title: 'AC Repairing Management System',
        description:
          'Service platform with JWT authentication and role-based authorization for admin, technician, and customer workflows.',
        longDescription:
          'Built a service management platform featuring JWT authentication and role-based authorization for admin, technician, and customer roles. Implemented ORM-driven CRUD REST APIs across MySQL and MongoDB, automating booking and technician assignment workflows.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-sri-ng',
        githubUrl: 'https://github.com/shivam-sri-ng',
        technologies: ['Node.js', 'Express.js', 'JWT', 'MySQL', 'MongoDB', 'REST APIs', 'React.js'],
        category: 'Full Stack',
        featured: true,
        order: 2,
      },
      {
        title: 'TravelSafely Portal',
        description:
          'Real-time trip tracking platform with WebSockets and REST APIs delivering live location updates at sub-second latency.',
        longDescription:
          'Engineered real-time trip tracking with WebSockets and REST APIs, delivering live location updates at sub-second latency. Optimized the backend through database indexing and query tuning, improving CRUD throughput by 40% on the deployed build.',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-sri-ng',
        githubUrl: 'https://github.com/shivam-sri-ng',
        technologies: ['Node.js', 'Express.js', 'WebSockets', 'REST APIs', 'React.js', 'MongoDB'],
        category: 'Full Stack',
        featured: true,
        order: 3,
      },
      {
        title: 'bhavaglobal.com — Client Website',
        description:
          'Production client website built with responsive React.js frontend and secure Django REST API backend.',
        longDescription:
          'Developed and delivered a production website for live client bhavaglobal.com. Built responsive cross-browser frontend in React.js and JavaScript ES6+. Engineered secure REST APIs using Django with JWT authentication and middleware.',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://bhavaglobal.com',
        githubUrl: 'https://github.com/shivam-sri-ng',
        technologies: ['React.js', 'Django', 'JWT', 'MySQL', 'JavaScript ES6+', 'CSS3'],
        category: 'Client Work',
        featured: false,
        order: 4,
      },
      {
        title: 'theyogaguru.online — Client Website',
        description:
          'Wellness platform with responsive design, optimized SQL queries and Render deployment.',
        longDescription:
          'Developed and delivered theyogaguru.online for a live client. Built fully responsive frontend improving mobile usability. Designed MySQL schema with CRUD operations and optimized SQL queries, cutting API response time by 30%. Deployed on Render using Git and GitHub.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://theyogaguru.online',
        githubUrl: 'https://github.com/shivam-sri-ng',
        technologies: ['Node.js', 'Express.js', 'MySQL', 'React.js', 'Render', 'Git'],
        category: 'Client Work',
        featured: false,
        order: 5,
      },
    ]);
    console.log('   ✅ Projects collection ready (5 projects inserted)\n');

    // ─────────────────────────────────────────
    // 3. CONTACTS collection (sample/empty)
    // ─────────────────────────────────────────
    console.log('📬 Setting up Messages collection...');
    // Just ensure the collection exists — real messages will come from the contact form
    const existingMessages = await Message.countDocuments();
    if (existingMessages === 0) {
      await Message.create({
        name: 'System Init',
        email: 'system@portfolio.local',
        subject: 'Collection initialized',
        message: 'This is a system record to initialize the messages collection. Real messages will appear here when visitors submit the contact form.',
        status: 'read',
      });
      console.log('   ✅ Messages collection created (1 init record)\n');
    } else {
      console.log(`   ✅ Messages collection already has ${existingMessages} record(s)\n`);
    }

    // ─────────────────────────────────────────
    // 4. SKILLS collection
    // ─────────────────────────────────────────
    console.log('🛠️  Seeding Skills...');
    await Skill.deleteMany({});
    await Skill.insertMany([
      { name: 'Python',             icon: 'SiPython',       iconColor: '#3776ab', category: 'backend',     level: 95, order: 1 },
      { name: 'JavaScript (ES6+)', icon: 'SiJavascript',   iconColor: '#f7df1e', category: 'frontend',    level: 92, order: 2 },
      { name: 'TypeScript',        icon: 'SiTypescript',   iconColor: '#3178c6', category: 'frontend',    level: 85, order: 3 },
      { name: 'SQL',               icon: 'SiPostgresql',   iconColor: '#4169e1', category: 'database',    level: 90, order: 4 },
      { name: 'Pandas & NumPy',    icon: 'SiPandas',       iconColor: '#38bdf8', category: 'datascience', level: 94, order: 5 },
      { name: 'Machine Learning',  icon: 'SiScikitlearn',  iconColor: '#f7931e', category: 'ml',          level: 90, order: 6 },
      { name: 'React.js',          icon: 'SiReact',        iconColor: '#61dafb', category: 'frontend',    level: 92, order: 7 },
      { name: 'Node.js',           icon: 'SiNodedotjs',    iconColor: '#339933', category: 'backend',     level: 90, order: 8 },
      { name: 'Express.js',        icon: 'SiExpress',      iconColor: '#a855f7', category: 'backend',     level: 90, order: 9 },
      { name: 'Django',            icon: 'SiDjango',       iconColor: '#10b981', category: 'backend',     level: 88, order: 10 },
      { name: 'REST APIs',         icon: 'SiPostman',      iconColor: '#ff6c37', category: 'backend',     level: 94, order: 11 },
      { name: 'JWT Auth',          icon: 'SiJsonwebtokens',iconColor: '#d63aff', category: 'backend',     level: 90, order: 12 },
      { name: 'MongoDB',           icon: 'SiMongodb',      iconColor: '#47a248', category: 'database',    level: 90, order: 13 },
      { name: 'MySQL',             icon: 'SiMysql',        iconColor: '#4479a1', category: 'database',    level: 88, order: 14 },
      { name: 'SQLite',            icon: 'SiSqlite',       iconColor: '#38bdf8', category: 'database',    level: 86, order: 15 },
      { name: 'Git & GitHub',      icon: 'SiGithub',       iconColor: '#f05032', category: 'tools',       level: 92, order: 16 },
      { name: 'Vercel & Render',   icon: 'SiVercel',       iconColor: '#cbd5e1', category: 'tools',       level: 90, order: 17 },
      { name: 'WebSockets',        icon: 'SiSocketdotio',  iconColor: '#010101', category: 'backend',     level: 85, order: 18 },
    ]);
    console.log('   ✅ Skills collection ready (18 skills)\n');

    // ─────────────────────────────────────────
    // 5. SOCIALS collection
    // ─────────────────────────────────────────
    console.log('🔗 Seeding Social Links...');
    await Social.deleteMany({});
    await Social.insertMany([
      { platform: 'LinkedIn',  url: 'https://linkedin.com/in/shivam-srivastava0022', icon: 'FaLinkedinIn', order: 1 },
      { platform: 'GitHub',    url: 'https://github.com/shivam-sri-ng',              icon: 'FaGithub',     order: 2 },
    ]);
    console.log('   ✅ Socials collection ready\n');

    // ─────────────────────────────────────────
    // 6. EXPERIENCE
    // ─────────────────────────────────────────
    console.log('💼 Seeding Experience...');
    await Experience.deleteMany({});
    await Experience.create({
      company: 'SoftEdge Solution',
      position: 'Part-Time Web Developer',
      location: 'Remote',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description:
        'Developed and delivered 5+ production websites for live clients including bhavaglobal.com and theyogaguru.online. Built REST APIs with Django, Node.js, and Express.js; designed MySQL & MongoDB schemas; resolved 40+ production bugs; deployed on Render and Vercel.',
      technologies: ['React.js', 'Django', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'JWT', 'Render', 'Vercel'],
      order: 1,
    });
    console.log('   ✅ Experience collection ready\n');

    // ─────────────────────────────────────────
    // 7. EDUCATION
    // ─────────────────────────────────────────
    console.log('🎓 Seeding Education...');
    await Education.deleteMany({});
    await Education.insertMany([
      {
        institution: 'AKGEC, Ghaziabad',
        degree: 'B.Tech',
        field: 'Information Technology',
        startYear: '2021',
        endYear: '2025',
        current: false,
        grade: 'CGPA: 7.2',
        order: 1,
      },
      {
        institution: 'Hewett Polytechnic College',
        degree: 'Diploma',
        field: 'Information Technology',
        startYear: '2018',
        endYear: '2021',
        current: false,
        grade: '73%',
        order: 2,
      },
    ]);
    console.log('   ✅ Education collection ready\n');

    // Summary
    const counts = {
      about:    await About.countDocuments(),
      projects: await Project.countDocuments(),
      messages:  await Message.countDocuments(),
      skills:   await Skill.countDocuments(),
      socials:  await Social.countDocuments(),
      experience: await Experience.countDocuments(),
      education:  await Education.countDocuments(),
    };

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 ALL COLLECTIONS READY ON MONGODB ATLAS!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Object.entries(counts).forEach(([col, count]) => {
      console.log(`   📦 ${col.padEnd(12)} → ${count} document(s)`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
};

run();
