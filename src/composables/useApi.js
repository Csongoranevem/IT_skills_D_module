import { ref } from 'vue'

const API_BASE = '/api'
const TOKEN_KEY = 'api_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function useApi() {
  const error = ref(null)
  const showTokenPrompt = ref(false)

  async function request(path, options = {}) {
    error.value = null
    const token = getToken()
    const headers = { ...(options.headers || {}) }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    let res
    try {
      res = await fetch(`${API_BASE}${path}`, { ...options, headers })
    } catch (e) {
      error.value = 'Network error. Please check your connection.'
      throw e
    }

    if (res.ok) return res

    if (res.status === 400) {
      const body = await res.json().catch(() => ({}))
      error.value = body.message || 'Invalid data. Please check your input.'
      throw new Error(error.value)
    }
    if (res.status === 401) {
      error.value = 'Invalid API token. Please enter a valid token.'
      clearToken()
      showTokenPrompt.value = true
      throw new Error(error.value)
    }
    if (res.status === 403) {
      error.value = 'Billing quota exceeded. Please wait until next month or increase your quota.'
      throw new Error(error.value)
    }
    if (res.status === 503) {
      error.value = 'Service temporarily unavailable. Please try again later.'
      throw new Error(error.value)
    }

    const body = await res.json().catch(() => ({}))
    error.value = body.message || `Unexpected error (${res.status}).`
    throw new Error(error.value)
  }

  return { error, showTokenPrompt, request }
}
