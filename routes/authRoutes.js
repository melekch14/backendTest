const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/authMiddleware');
const logger = require('../config/logger');

router.post('/', auth, async (req, res) => {
  const { uid, phone_number } = req.user;
  const { email, role } = req.body;

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE firebase_uid=$1',
      [uid]
    );

    if (existing.rows.length === 0) {
      await pool.query(
        `INSERT INTO users(firebase_uid,email,phone,role,status)
         VALUES($1,$2,$3,$4,$5)`,
        [
          uid,
          email,
          phone_number,
          role,
          role === 'driver' ? 'pending' : 'approved',
        ]
      );

      logger.info(`User created: ${uid}`);
    }

    res.json({ success: true });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;