const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/authMiddleware');
const logger = require('../config/logger');

router.post('/', auth, async (req, res) => {
  const { uid } = req.user;
  const { profile_photo, driver_license, identity_card } = req.body;

  try {
    const user = await pool.query(
      'SELECT id FROM users WHERE firebase_uid=$1',
      [uid]
    );

    const userId = user.rows[0].id;

    await pool.query(
      `INSERT INTO driver_kyc(user_id,profile_photo,driver_license,identity_card)
       VALUES($1,$2,$3,$4)`,
      [userId, profile_photo, driver_license, identity_card]
    );

    logger.info(`KYC submitted for user ${uid}`);

    res.json({ success: true });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;