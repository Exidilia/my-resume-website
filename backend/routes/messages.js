const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Validation rules for contact form
const messageValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(), // Sanitize to prevent XSS
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must be less than 200 characters')
    .escape(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
    .escape()
];

// POST /api/messages - Submit contact form
router.post('/', messageValidation, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const pool = req.app.get('db');
    const { name, email, subject, message } = req.body;

    const result = await pool.query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [name, email, subject || 'No Subject', message]
    );

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: result.rows[0].id,
        created_at: result.rows[0].created_at
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/messages - Get all messages (admin only - add auth in production)
router.get('/', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/messages/:id/read - Mark message as read
router.put('/:id/read', async (req, res, next) => {
  try {
    const pool = req.app.get('db');
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE messages SET is_read = TRUE WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;