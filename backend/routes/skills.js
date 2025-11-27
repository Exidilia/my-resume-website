const express = require('express');
const router = express.Router();

// GET /api/skills - Get all skills grouped by category
router.get('/', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    
    const result = await pool.query(
      'SELECT * FROM skills ORDER BY category, proficiency DESC'
    );

    // Group skills by category
    const groupedSkills = result.rows.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedSkills
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/skills - Add a new skill
router.post('/', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    const { name, category, proficiency } = req.body;

    const result = await pool.query(
      `INSERT INTO skills (name, category, proficiency)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, category, proficiency]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;