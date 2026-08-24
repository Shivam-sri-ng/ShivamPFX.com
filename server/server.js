const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration (supports production domain & local dev)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Allow client connection
      }
    },
    credentials: true,
  })
);

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'API is running cleanly',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/skills', require('./routes/skillsRoutes'));
app.use('/api/projects', require('./routes/projectsRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/certificates', require('./routes/certificatesRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/visitors', require('./routes/visitorsRoutes'));

// Note: Frontend is deployed separately on Vercel.
// Static file serving is NOT needed here on Render.


// 404 & Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
