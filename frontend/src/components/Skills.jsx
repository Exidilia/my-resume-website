import React from 'react'
import './Skills.css'

function Skills({ skills }) {
  if (!skills || Object.keys(skills).length === 0) return null

  return (
    <section className="skills" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-container">
        {Object.entries(skills).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h3 className="category-title">{category}</h3>
            <div className="skills-list">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.proficiency}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills