# Full-Stack MERN Portfolio Website & Admin Dashboard

A complete, modern, production-ready MERN Stack (MongoDB, Express.js, React.js, Node.js) Portfolio website with an integrated secure Admin Dashboard, dark purple aesthetic, Framer Motion animations, JWT authentication, and Cloudinary image upload support.

---

## 🌟 Key Features

### Public Portfolio Website
- **Hero Section**: Animated dynamic headline with glowing avatar, typing texts, and social links.
- **About Me Section**: Full biography, skills highlight, location, contact details, and downloadable resume.
- **My Skills**: Interactive grid of technology badges (HTML, CSS, JavaScript, React, Tailwind CSS, Git, Figma, Node, MongoDB).
- **My Projects**: Showcase cards with live preview links, GitHub repository links, and tech stack tags.
- **Contact Form**: Interactive form with real-time field validation, toast notifications, and automatic backend database persistence.
- **Dark Theme Aesthetics**: Deep dark background (`#09090e`), glowing purple accents, glassmorphism cards, and smooth scrollbar.

### Admin Dashboard (`/admin/dashboard`)
- **Secure Authentication**: JWT-based auth with bcrypt password hashing and token expiration.
- **Admin Key Login**: Secondary quick login method using a secure environment master key.
- **Analytics Overview**: Interactive Area Chart for tracking monthly visitor statistics & total message counters.
- **Content Management (CRUD)**:
  - Edit **About Me** information, profile avatar, and resume URL.
  - Add / Edit / Delete **Skills**.
  - Add / Edit / Delete **Projects** with image upload support.
  - Add / Edit / Delete **Experience** & **Education** history.
  - Add / Edit / Delete **Social Links**.
  - Read, filter (New/Read/Replied), and delete **Contact Form Messages**.
  - Update Admin **Account Credentials & Password**.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite), Tailwind CSS v4, Framer Motion, Recharts, React Router v6, React Hot Toast, React Icons, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ORM, JWT, bcryptjs, Multer, Cloudinary, Dotenv.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB instance or free MongoDB Atlas cluster.
- **Cloudinary Account**: Free account for storing uploaded project images.

### 2. Environment Configuration

#### Backend Setup
```bash
cd server
cp .env.example .env
```

Fill in your `.env` variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Master Admin Key (alternative login)
ADMIN_KEY=adminkey123

# Initial Admin User Credentials
DEFAULT_ADMIN_EMAIL=admin@portfolio.com
DEFAULT_ADMIN_PASSWORD=Admin@12345

CLIENT_URL=http://localhost:5173
```

### 3. Database Seeding

Run the seed script to automatically populate your MongoDB database with default data matching the design screenshots:

```bash
cd server
npm run seed
```

### 4. Running the Development Servers

#### Terminal 1 — Start Express Backend:
```bash
cd server
npm run dev
```
*(Server will start on `http://localhost:5000`)*

#### Terminal 2 — Start Vite React Frontend:
```bash
cd client
npm run dev
```
*(Frontend will start on `http://localhost:5173`)*

---

## 📁 Project Structure

```
personal portfolio/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── api/                 # Axios configuration with JWT interceptors
│   │   ├── components/
│   │   │   ├── admin/           # Sidebar, Header, StatCards
│   │   │   ├── common/          # Navbar, Footer, Loader, ScrollToTop
│   │   │   └── portfolio/       # Hero, About, Skills, Projects, Contact
│   │   ├── context/             # AuthContext for admin state
│   │   ├── pages/               # Home, Login, AdminLogin, Dashboard, CRUD pages
│   │   ├── routes/              # ProtectedRoute wrapper
│   │   ├── App.jsx
│   │   └── index.css            # Custom glassmorphism & dark theme styles
│   └── vite.config.js
└── server/                      # Express Backend
    ├── config/                  # MongoDB & Cloudinary configuration
    ├── controllers/             # Auth, About, Skills, Projects, Contact controllers
    ├── middleware/              # JWT verification, upload & error handlers
    ├── models/                  # Mongoose Schemas (Admin, About, Skill, Project, Contact, etc.)
    ├── routes/                  # RESTful API route definitions
    ├── utils/                   # Seed script & token generators
    └── server.js                # Server entry point
```

---

## 🌐 Deployment Instructions

### 1. Backend Deployment (Render.com / Railway)
1. Push your code repository to GitHub.
2. Log into **Render.com** and create a new **Web Service**.
3. Select your repository and configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add all environment variables from `.env` in Render's Environment settings.
5. Deploy service. Copy your Render backend URL (e.g. `https://your-api.onrender.com`).

### 2. Frontend Deployment (Vercel)
1. Log into **Vercel** and import your GitHub repository.
2. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_URL` pointing to your deployed Render API backend.
4. Click **Deploy**.

---

## 🔒 Security Best Practices
- Passwords are strictly hashed with `bcryptjs` using 12 salt rounds before database insertion.
- JWT tokens are verified on all sensitive admin routes via the `protect` middleware.
- Input validation sanitizes contact form fields to prevent XSS and injection attacks.
- Sensitive credentials reside purely in `.env` files and are excluded from git.
