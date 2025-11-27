-- Create tables for the resume website

-- Profile table (stores your personal info)
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(100),
    linkedin VARCHAR(200),
    github VARCHAR(200),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    github_url VARCHAR(200),
    live_url VARCHAR(200),
    image_url VARCHAR(200),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample profile data
INSERT INTO profile (name, title, email, phone, location, linkedin, github, bio)
VALUES (
    'Your Name',
    'Full Stack Developer | Cybersecurity Enthusiast',
    'your.email@example.com',
    '+1 234 567 8900',
    'Your City, Country',
    'https://linkedin.com/in/yourprofile',
    'https://github.com/yourprofile',
    'I am a passionate developer with expertise in web development and cybersecurity. I love building secure, scalable applications and continuously learning new technologies.'
);

-- Insert sample experience data
INSERT INTO experience (company, position, start_date, end_date, is_current, description, achievements)
VALUES 
(
    'Tech Company A',
    'Senior Full Stack Developer',
    '2023-01-01',
    NULL,
    TRUE,
    'Leading development of web applications using React, Node.js, and PostgreSQL.',
    ARRAY['Increased application performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
),
(
    'Tech Company B',
    'Security Analyst',
    '2021-06-01',
    '2022-12-31',
    FALSE,
    'Conducted security assessments and penetration testing.',
    ARRAY['Identified 50+ critical vulnerabilities', 'Developed security training program', 'Reduced security incidents by 60%']
),
(
    'Startup Inc',
    'Junior Developer',
    '2020-01-01',
    '2021-05-31',
    FALSE,
    'Developed and maintained web applications.',
    ARRAY['Built 10+ client websites', 'Learned React and Node.js', 'Participated in agile development']
);

-- Insert sample projects data
INSERT INTO projects (name, description, technologies, github_url, live_url, featured)
VALUES 
(
    'Resume Website',
    'A full-stack resume website built with React, Node.js, and PostgreSQL, all containerized with Docker.',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker', 'NGINX'],
    'https://github.com/yourprofile/resume-website',
    'https://yourwebsite.com',
    TRUE
),
(
    'Security Scanner',
    'An automated security scanning tool for web applications.',
    ARRAY['Python', 'Docker', 'Linux', 'Security'],
    'https://github.com/yourprofile/security-scanner',
    NULL,
    TRUE
),
(
    'Task Management App',
    'A collaborative task management application with real-time updates.',
    ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'],
    'https://github.com/yourprofile/task-app',
    'https://tasks.yourwebsite.com',
    FALSE
);

-- Insert sample skills data
INSERT INTO skills (name, category, proficiency)
VALUES 
('React', 'Frontend', 90),
('JavaScript', 'Frontend', 95),
('HTML/CSS', 'Frontend', 95),
('Node.js', 'Backend', 85),
('Express', 'Backend', 85),
('PostgreSQL', 'Database', 80),
('MongoDB', 'Database', 75),
('Docker', 'DevOps', 85),
('Linux', 'DevOps', 80),
('Git', 'DevOps', 90),
('Python', 'Languages', 80),
('Penetration Testing', 'Security', 75),
('Network Security', 'Security', 70);