import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    show: false,
    icon: 'mdi-alert',
    text: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error' | undefined,
  }),
  actions: {
    showAlert (
      alertIconState: string,
      alertTextState: string,
      alertTypeState: 'info' | 'success' | 'warning' | 'error' | undefined,
      alertTimeout: number = 3000,
      redirect: string = ''
    ) {
      this.show = true
      this.icon = alertIconState
      this.text = alertTextState
      this.type = alertTypeState
      window.setTimeout(() => {
        this.show = false
        if (redirect) {
          window.location.href = redirect
        }
      }, alertTimeout)
    },
  },
})
