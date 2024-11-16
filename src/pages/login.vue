<template>
  <v-card
    class="mx-auto pa-16 pb-8"
    elevation="8"
    max-width="400"
    rounded="lg"
    width="50%"
  >
    <div class="text-h3 text-center mb-8 font-weight-bold inline">Simple <span class="text-primary">IoT</span></div>
    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <v-text-field
      v-model="username"
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Password
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="passToggle ? 'mdi-eye-off' : 'mdi-eye'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      :type="passToggle ? 'text' : 'password'"
      variant="outlined"
      @click:append-inner="passToggle = !passToggle"
      @keyup.enter="login()"
    />

    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      @click="login()"
    >
      Log In
    </v-btn>

    <v-card-text class="text-center">
      <a class="text-blue text-decoration-none" href="/signup" rel="noopener noreferrer">
        Sign up <v-icon icon="mdi-chevron-right" />
      </a>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'

  const username = ref('')
  const password = ref('')
  const passToggle = ref(false)
  const showAlert = inject('showAlert') as Function

  async function login () {
    if (!username.value || !password.value) {
      showAlert('mdi-alert', 'Username and password are required', 'error')
      return
    }

    const authStore = useAuthStore()

    return authStore.login(username.value, password.value)
      .then(() => showAlert('mdi-check', 'Login successful', 'success'))
      .catch(error => showAlert('mdi-alert', error.message, 'error'))
  }
</script>

<route lang="yaml">
meta:
  layout: welcome
</route>
