import React from 'react'
import './Contact.css'
import ContactForm from './ContactForm'

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Connect!</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, 
            or opportunities to be part of your vision. Feel free to reach out!
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="method-icon">📧</span>
              <span>Email me directly</span>
            </div>
            <div className="contact-method">
              <span className="method-icon">💼</span>
              <span>Connect on LinkedIn</span>
            </div>
            <div className="contact-method">
              <span className="method-icon">💻</span>
              <span>Check my GitHub</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

export default Contact