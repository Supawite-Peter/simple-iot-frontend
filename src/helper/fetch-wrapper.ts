import { useAuthStore } from '@/stores/auth'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}

function request (method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  return async (url: string, body?: any, headers?: any) => {
    const requestOptions = {
      method,
      headers: headers || {},
      body,
    }
    // JSON body
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    // Return fetch promise
    return fetch(url, requestOptions)
      .then(response => handleResponse(response, requestOptions))
  }
}

// Helper functions
async function handleResponse (response: Response, requestOptions?: any) {
  return response.text().then(async (text: string) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      // Auto try to refresh access token on 401 and 403 responses
      const { user, logout, refresh } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
        try {
          // Try to refresh access token
          await refresh()
          // Retry original request
          return fetch(response.url, requestOptions)
            .then(r => r.text())
            .then(text => text && JSON.parse(text))
        } catch {
          // If refresh access token fails,
          // logout to get both new tokens
          logout()
        }
      }
      // Return error for other responses
      return Promise.reject((data && data.message) || response.statusText)
    }
    // Return data for 200 responses
    return data
  })
}
