import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user') as string),
    returnUrl: null as string | null,
  }),
  actions: {
    async login (username: string, password: string) {
      // Send login request
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      // Check for login errors
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      // Update pinia state
      this.user = await response.json()
      // Store jwt in local storage
      localStorage.setItem('user', JSON.stringify(this.user))
      // Redirect to previous url or default to home page
      router.push(this.returnUrl || '/home')
    },
    logout () {
      this.user = null
      localStorage.removeItem('user')
      router.push('/login')
    },
  },
})
