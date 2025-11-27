import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import AboutMe from './components/AboutMe'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { getProfile, getSkills } from './services/api'

function App() {
  const [profileData, setProfileData] = useState(null)
  const [skillsData, setSkillsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [profileResponse, skillsResponse] = await Promise.all([
          getProfile(),
          getSkills()
        ])

        if (profileResponse.success) {
          setProfileData(profileResponse.data)
        }

        if (skillsResponse.success) {
          setSkillsData(skillsResponse.data)
        }

        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  const { profile, experience, projects } = profileData || {}

  return (
    <div className="App">
      <Header profile={profile} />
      <main>
        <AboutMe profile={profile} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Skills skills={skillsData} />
        <Contact />
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} {profile?.name || 'Your Name'}. All rights reserved.</p>
        <p>Built with React, Node.js, PostgreSQL & Docker</p>
      </footer>
    </div>
  )
}

export default App