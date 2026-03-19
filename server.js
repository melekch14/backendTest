const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const kycRoutes = require('./routes/kycRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Logging middleware
 */
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

/**
 * Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/kyc', kycRoutes);

app.get('/', (req, res) => {
  res.send('API Running on port 4000');
});

/**
 * START SERVER
 */
const PORT = 4000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});