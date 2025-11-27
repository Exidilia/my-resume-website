import React from 'react'
import './AboutMe.css'

function AboutMe({ profile }) {
  if (!profile) return null

  return (
    <section className="about-me" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <p className="about-bio">{profile.bio}</p>
        <div className="about-details">
          {profile.email && (
            <div className="about-detail">
              <span className="detail-icon">📧</span>
              <span className="detail-label">Email:</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          )}
          {profile.phone && (
            <div className="about-detail">
              <span className="detail-icon">📱</span>
              <span className="detail-label">Phone:</span>
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.location && (
            <div className="about-detail">
              <span className="detail-icon">📍</span>
              <span className="detail-label">Location:</span>
              <span>{profile.location}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutMe