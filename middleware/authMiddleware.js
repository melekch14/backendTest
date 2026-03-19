const admin = require('../config/firebase');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = header.split(' ')[1];

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};