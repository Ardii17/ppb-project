const express = require("express");
const cors = require("cors");
const classRoutes = require("./src/routes/classRoutes");
const assignmentRoutes = require("./src/routes/assignRoutes");
const materiRoutes = require("./src/routes/materiRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*', // Lebih aman untuk mendefinisikan origin yang diizinkan
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' })); // Menambahkan limit untuk keamanan
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (opsional, untuk debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Error handling untuk JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      message: 'Invalid JSON format',
      error: err.message 
    });
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use("/api", classRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
