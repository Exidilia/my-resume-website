const express = require('express');
const router = express.Router();

// GET /api/profile - Get profile information
router.get('/', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    
    // Get profile
    const profileResult = await pool.query('SELECT * FROM profile LIMIT 1');
    const profile = profileResult.rows[0];

    // Get experience
    const experienceResult = await pool.query(
      'SELECT * FROM experience ORDER BY start_date DESC'
    );

    // Get projects
    const projectsResult = await pool.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );

    res.json({
      success: true,
      data: {
        profile,
        experience: experienceResult.rows,
        projects: projectsResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/profile - Update profile (for admin use)
router.put('/', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    const { name, title, email, phone, location, linkedin, github, bio } = req.body;

    const result = await pool.query(
      `UPDATE profile 
       SET name = $1, title = $2, email = $3, phone = $4, 
           location = $5, linkedin = $6, github = $7, bio = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = 1
       RETURNING *`,
      [name, title, email, phone, location, linkedin, github, bio]
    );

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;