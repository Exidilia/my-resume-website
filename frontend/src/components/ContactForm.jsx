import React, { useState } from 'react'
import './ContactForm.css'
import { submitContactForm } from '../services/api'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'loading'
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await submitContactForm(formData)
      
      if (response.success) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully.' 
        })
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ 
          type: 'error', 
          message: response.error || 'Failed to send message. Please try again.' 
        })
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again later.' 
      })
    }

    // Clear status message after 5 seconds
    setTimeout(() => {
      setStatus({ type: '', message: '' })
    }, 5000)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your message here..."
          rows={6}
          minLength={10}
          maxLength={5000}
        />
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={status.type === 'loading'}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status.message && (
        <div className={`form-status ${status.type}`}>
          {status.message}
        </div>
      )}
    </form>
  )
}

export default ContactForm