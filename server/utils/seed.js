const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');
const Social = require('../models/Social');

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB for seeding!');

    // Clear existing data
    await Admin.deleteMany({});
    await About.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Certificate.deleteMany({});
    await Social.deleteMany({});

    // 1. Create Admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345';

    const admin = await Admin.create({
      name: 'Shivam Srivastava',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      avatar: '/profile.jpg',
    });
    console.log(`✅ Admin seeded: ${admin.email}`);

    // 2. Create About
    await About.create({
      name: 'Shivam Srivastava',
      title: 'Full Stack Engineer & Data Analyst / Scientist',
      typingTexts: [
        'Full Stack Engineer',
        'Data Analyst & Scientist',
        'MERN Stack Specialist',
        'Machine Learning & AI Enthusiast',
        'Python & SQL Analytics Expert',
      ],
      shortBio: 'Versatile Full Stack Engineer and Data Analyst/Scientist specializing in scalable web applications, predictive machine learning models, and interactive data analytics dashboards.',
      bio: "I am Shivam Srivastava, a results-driven Full Stack Engineer and Data Analyst / Scientist. I bridge the gap between robust software engineering and high-impact data analytics. With expertise in MERN stack web development, Python data science ecosystem (Pandas, Scikit-Learn, TensorFlow, SQL, Power BI/Tableau), and cloud architecture, I design end-to-end data-driven applications that transform complex data into actionable business intelligence.",
      email: 'shivam.srivastava.dev@gmail.com',
      phone: '+91 98765 43210',
      location: 'India',
      freelance: 'Available for Hire',
      profileImage: '/profile.jpg',
      aboutImage: '/about-photo.jpg',
      resumeUrl: '#',
    });
    console.log('✅ About section seeded');

    const skillsData = [
      // Languages
      { name: 'Python', icon: 'SiPython', iconColor: '#3776ab', category: 'datascience', level: 95, order: 1 },
      { name: 'JavaScript (ES6+)', icon: 'SiJavascript', iconColor: '#f7df1e', category: 'frontend', level: 92, order: 2 },
      { name: 'TypeScript', icon: 'SiTypescript', iconColor: '#3178c6', category: 'frontend', level: 85, order: 3 },
      { name: 'Java', icon: 'FaJava', iconColor: '#5382a1', category: 'backend', level: 80, order: 4 },
      { name: 'C', icon: 'SiC', iconColor: '#a8b9cc', category: 'backend', level: 78, order: 5 },
      { name: 'SQL', icon: 'SiPostgresql', iconColor: '#4169e1', category: 'database', level: 90, order: 6 },

      // Data Science & Analytics
      { name: 'Pandas & NumPy', icon: 'SiPandas', iconColor: '#38bdf8', category: 'datascience', level: 94, order: 7 },
      { name: 'Matplotlib & Seaborn', icon: 'SiPython', iconColor: '#ff6f61', category: 'datascience', level: 88, order: 8 },
      { name: 'Machine Learning', icon: 'SiScikitlearn', iconColor: '#f7931e', category: 'ml', level: 90, order: 9 },
      { name: 'LLMs & RAG Architectures', icon: 'FaBrain', iconColor: '#10a37f', category: 'ml', level: 88, order: 10 },
      { name: 'Exploratory Data Analysis (EDA)', icon: 'SiPython', iconColor: '#06b6d4', category: 'analytics', level: 92, order: 11 },
      { name: 'Statistical Analysis', icon: 'SiPython', iconColor: '#8b5cf6', category: 'analytics', level: 86, order: 12 },

      // Frontend Development
      { name: 'React.js', icon: 'SiReact', iconColor: '#61dafb', category: 'frontend', level: 92, order: 13 },
      { name: 'HTML5 & CSS3', icon: 'SiHtml5', iconColor: '#e34f26', category: 'frontend', level: 95, order: 14 },
      { name: 'Bootstrap & Responsive Design', icon: 'SiBootstrap', iconColor: '#7952b3', category: 'frontend', level: 90, order: 15 },

      // Backend Development
      { name: 'Node.js', icon: 'SiNodedotjs', iconColor: '#339933', category: 'backend', level: 90, order: 16 },
      { name: 'Express.js', icon: 'SiExpress', iconColor: '#a855f7', category: 'backend', level: 90, order: 17 },
      { name: 'Django (Python)', icon: 'SiDjango', iconColor: '#10b981', category: 'backend', level: 88, order: 18 },
      { name: 'REST APIs & WebSockets', icon: 'SiPostman', iconColor: '#ff6c37', category: 'backend', level: 94, order: 19 },
      { name: 'JWT Auth & Security', icon: 'SiJsonwebtokens', iconColor: '#d63aff', category: 'backend', level: 90, order: 20 },

      // Databases
      { name: 'MongoDB', icon: 'SiMongodb', iconColor: '#47a248', category: 'database', level: 90, order: 21 },
      { name: 'MySQL', icon: 'SiMysql', iconColor: '#4479a1', category: 'database', level: 88, order: 22 },
      { name: 'SQLite', icon: 'SiSqlite', iconColor: '#38bdf8', category: 'database', level: 86, order: 23 },

      // Tools & Deployment
      { name: 'Git & GitHub', icon: 'SiGithub', iconColor: '#f05032', category: 'tools', level: 92, order: 24 },
      { name: 'Render & Vercel Deployment', icon: 'SiVercel', iconColor: '#cbd5e1', category: 'tools', level: 90, order: 25 },
      { name: 'VS Code', icon: 'FaTerminal', iconColor: '#007acc', category: 'tools', level: 95, order: 26 },
    ];
    await Skill.insertMany(skillsData);
    console.log('✅ Skills seeded');

    // 4. Create Projects
    const projectsData = [
      {
        title: 'AI Customer Churn Analytics & Prediction',
        description: 'Machine learning pipeline and interactive dashboard predicting customer churn risk with 92% accuracy.',
        longDescription: 'End-to-end Machine Learning solution utilizing XGBoost and Random Forest classifiers to detect churn risk factors. Paired with a React dashboard for real-time customer lifetime value tracking, cohort analysis, and automated retention recommendations.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['Python', 'Scikit-Learn', 'Pandas', 'React', 'FastAPI', 'Tailwind CSS'],
        category: 'Data Science & ML',
        featured: true,
        order: 1,
      },
      {
        title: 'Full-Stack Enterprise E-Commerce SaaS',
        description: 'Production-ready MERN e-commerce application with real-time inventory, payment gateways, and admin analytics.',
        longDescription: 'Scalable multi-tenant e-commerce platform built with React 18, Node.js, Express, and MongoDB Atlas. Features JWT authentication, dynamic cart state management, order status webhooks, and executive sales analytics.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
        category: 'Full Stack',
        featured: true,
        order: 2,
      },
      {
        title: 'Real-Time Financial Market & Stock Forecaster',
        description: 'Financial market analysis web app performing time-series forecasting and volatility metrics.',
        longDescription: 'Time-series predictive analytics platform using Prophet and ARIMA algorithms to forecast stock trends. Features live Plotly interactive financial charts, risk metrics, and news sentiment scoring.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['Python', 'Streamlit', 'Prophet', 'Plotly', 'SQL'],
        category: 'Data Analytics',
        featured: true,
        order: 3,
      },
      {
        title: 'Healthcare AI Patient Diagnostic Triage System',
        description: 'Deep learning classification pipeline assisting medical professionals with rapid scan triage.',
        longDescription: 'Convolutional Neural Network (CNN) built with PyTorch to analyze medical scans with high accuracy. Integrated with a REST API backend and responsive React frontend for clinical workflow management.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'OpenCV'],
        category: 'Data Science & ML',
        featured: true,
        order: 4,
      },
      {
        title: 'Collaborative Project SaaS & Workflow Automation',
        description: 'Kanban project management software featuring live Socket.io updates and team analytics.',
        longDescription: 'Real-time task management SaaS providing drag-and-drop boards, activity streams, automated deadline reminders, and team velocity metrics.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        category: 'Full Stack',
        featured: true,
        order: 5,
      },
      {
        title: 'Automated Sales & Revenue KPI Dashboard',
        description: 'Enterprise business intelligence suite tracking monthly revenue, CAC, LTV, and regional sales growth.',
        longDescription: 'Engineered complex PostgreSQL queries and automated ETL pipelines aggregating millions of transaction records into high-impact visual dashboards with automated anomaly reporting.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        liveUrl: 'https://github.com/shivam-srivastava',
        githubUrl: 'https://github.com/shivam-srivastava',
        technologies: ['SQL', 'Power BI', 'Python', 'Pandas', 'PostgreSQL'],
        category: 'Data Analytics',
        featured: true,
        order: 6,
      },
    ];
    await Project.insertMany(projectsData);
    console.log('✅ Projects seeded');

    // 5. Create Experience
    await Experience.create({
      company: 'Enterprise Solutions Tech',
      position: 'Senior Full Stack & Data Engineer',
      location: 'Remote / Hybrid',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Engineering scalable MERN stack web applications, designing SQL/NoSQL data schemas, and deploying ML data pipelines.',
      technologies: ['React', 'Node.js', 'Python', 'SQL', 'MongoDB'],
      order: 1,
    });

    // 6. Create Education
    await Education.create({
      institution: 'Technological University',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Data Science',
      startYear: '2019',
      endYear: '2023',
      current: false,
      description: 'Focused on Full Stack Web Development, Machine Learning, Data Analytics, and Algorithms.',
      grade: 'First Class with Distinction',
      order: 1,
    });

    // 7. Create Socials
    const socialsData = [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/shivam-srivastava', icon: 'FaLinkedinIn', order: 1 },
      { platform: 'GitHub', url: 'https://github.com/shivam-srivastava', icon: 'FaGithub', order: 2 },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter', order: 3 },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram', order: 4 },
    ];
    await Social.insertMany(socialsData);
    console.log('✅ Social links seeded');

    console.log('🎉 All seed data inserted successfully for Shivam Srivastava!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    console.error('📌 Check that your MONGO_URI in server/.env is valid and reachable.');
    process.exit(1);
  }
};

seedData();
