import React from 'react'
import './Header.css'

function Header({ profile }) {
  if (!profile) return null

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-name">{profile.name}</h1>
        <p className="header-title">{profile.title}</p>
        <div className="header-links">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="header-link">
              📧 Email
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="header-link">
              💼 LinkedIn
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="header-link">
              💻 GitHub
            </a>
          )}
          {profile.location && (
            <span className="header-location">📍 {profile.location}</span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header