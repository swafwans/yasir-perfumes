const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Assumes firebase-admin is initialized elsewhere in your app
// e.g., admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// --- Admin Login Route ---
// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const adminRef = db.collection('admins').doc(username);
    const doc = await adminRef.get();

    if (!doc.exists) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const adminData = doc.data();

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, adminData.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Passwords match, create a JWT
    const token = jwt.sign(
      { username: adminData.username, role: 'admin' },
      process.env.JWT_SECRET, // Make sure to set this in your environment variables!
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ token });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// You would need a secure way to create an admin user.
// This is a conceptual script you could run once from your machine.
/*
async function createAdminUser(username, password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  await db.collection('admins').doc(username).set({ username, passwordHash });
  console.log(`Admin user ${username} created.`);
}
*/

module.exports = router;