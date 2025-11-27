const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Helper function for API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, mergedOptions)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong')
    }

    return data
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

// Get profile data (includes experience and projects)
export async function getProfile() {
  return fetchAPI('/profile')
}

// Get skills grouped by category
export async function getSkills() {
  return fetchAPI('/skills')
}

// Submit contact form
export async function submitContactForm(formData) {
  return fetchAPI('/messages', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}

// Health check
export async function checkHealth() {
  return fetchAPI('/health')
}