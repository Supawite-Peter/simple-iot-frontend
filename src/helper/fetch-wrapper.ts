import { useAuthStore } from '@/stores/auth'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}

function request (method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  return (url: string, body?: any) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
      body,
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse)
  }
}

// helper functions

function authHeader (url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.accessToken
  const isApiUrl = url.startsWith('/api')
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.accessToken}` } as any
  } else {
    return {} as any
  }
}

function handleResponse (response: { text: () => Promise<string>; ok: any; status: number; statusText: any; }) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const { user, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
        // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
