const express = require('express');
const router = express.Router();
const User = require('../../model/User'); // User model
const verifyJWT = require('../../middleware/verifyJWT'); // Middleware to verify token

// Route to fetch logged-in user information
router.get('/', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token by middleware
    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
