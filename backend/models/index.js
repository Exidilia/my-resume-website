// Database models and queries
// This file can be expanded for more complex applications

const queries = {
  profile: {
    getOne: 'SELECT * FROM profile LIMIT 1',
    update: `UPDATE profile SET name = $1, title = $2, email = $3, 
             phone = $4, location = $5, linkedin = $6, github = $7, bio = $8,
             updated_at = CURRENT_TIMESTAMP WHERE id = 1 RETURNING *`
  },
  experience: {
    getAll: 'SELECT * FROM experience ORDER BY start_date DESC',
    create: `INSERT INTO experience (company, position, start_date, end_date, is_current, description, achievements)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    delete: 'DELETE FROM experience WHERE id = $1 RETURNING *'
  },
  projects: {
    getAll: 'SELECT * FROM projects ORDER BY featured DESC, created_at DESC',
    getFeatured: 'SELECT * FROM projects WHERE featured = TRUE ORDER BY created_at DESC',
    create: `INSERT INTO projects (name, description, technologies, github_url, live_url, featured)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
  },
  skills: {
    getAll: 'SELECT * FROM skills ORDER BY category, proficiency DESC',
    create: 'INSERT INTO skills (name, category, proficiency) VALUES ($1, $2, $3) RETURNING *'
  },
  messages: {
    getAll: 'SELECT * FROM messages ORDER BY created_at DESC',
    create: 'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
    markRead: 'UPDATE messages SET is_read = TRUE WHERE id = $1 RETURNING *'
  }
};

module.exports = queries;