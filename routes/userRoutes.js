const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, async (req, res) => {
  const { uid } = req.user;

  const result = await pool.query(
    'SELECT * FROM users WHERE firebase_uid=$1',
    [uid]
  );

  res.json(result.rows[0]);
});

router.get('/driver-area', auth, async (req, res) => {
  const { uid } = req.user;

  const result = await pool.query(
    'SELECT role,status FROM users WHERE firebase_uid=$1',
    [uid]
  );

  const user = result.rows[0];

  if (user.role === 'driver' && user.status !== 'approved') {
    return res.status(403).json({ message: 'Waiting approval' });
  }

  res.json({ message: 'Welcome driver' });
});

module.exports = router;