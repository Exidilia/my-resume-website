import React from 'react'
import './Experience.css'

function Experience({ experience }) {
  if (!experience || experience.length === 0) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map((job, index) => (
          <div key={job.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="job-header">
                <h3 className="job-position">{job.position}</h3>
                <span className="job-company">{job.company}</span>
              </div>
              <div className="job-duration">
                {formatDate(job.start_date)} - {job.is_current ? 'Present' : formatDate(job.end_date)}
                {job.is_current && <span className="current-badge">Current</span>}
              </div>
              {job.description && (
                <p className="job-description">{job.description}</p>
              )}
              {job.achievements && job.achievements.length > 0 && (
                <ul className="job-achievements">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience