<template>
  <v-card
    class="mx-auto pa-16 pb-8"
    elevation="8"
    max-width="400"
    rounded="lg"
    width="50%"
  >
    <div class="text-h3 text-center mb-8 font-weight-bold inline">Sign <span class="text-primary">Up</span></div>
    <div class="text-subtitle-1 text-medium-emphasis">
      Username
      <v-tooltip text="Username must be at least 6 characters">
        <template #activator="{ props }">
          <v-icon v-bind="props" icon="mdi-help-circle-outline" size="small" />
        </template>
      </v-tooltip>
    </div>

    <v-text-field
      v-model="username"
      autocomplete="null"
      density="compact"
      placeholder="Please enter your username"
      :rules="[rules.required, rules.usernameLength]"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Password
      <v-tooltip>
        <template #activator="{ props }">
          <v-icon v-bind="props" icon="mdi-help-circle-outline" size="small" />
        </template>
        <p>Password must follow all of these rules:</p>
        <p>&#x2022; At least 8 characters</p>
        <p>&#x2022; At least one lowercase letter</p>
        <p>&#x2022; At least one uppercase letter</p>
        <p>&#x2022; At least one number</p>
        <p>&#x2022; At least one special character</p>
      </v-tooltip>
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      autocomplete="new-password"
      class="mb-3"
      density="compact"
      hide-details="auto"
      placeholder="Please enter your password"
      :rules="[rules.required, rules.passwordLength, rules.passwordStrength]"
      :type="visible ? 'text' : 'password'"
      variant="outlined"
      @click:append-inner="visible = !visible"
    />

    <v-text-field
      v-model="passwordRepeat"
      autocomplete="new-password"
      class="mb-5"
      density="compact"
      hide-details="auto"
      placeholder="Please repeat your password"
      :rules="[rules.required, rules.repeatCheck]"
      :type="visible ? 'text' : 'password'"
      variant="outlined"
    />

    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      @click="register()"
    >
      Sign up
    </v-btn>

    <v-card-text class="text-center">
      <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
        Already have an account? Sign in <v-icon icon="mdi-chevron-right" />
      </a>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useAlertStore } from '@/stores/alert'
  import { fetchWrapper } from '@/helper/fetch-wrapper'

  // Ref
  const visible = ref(false)
  const username = ref('')
  const password = ref('')
  const passwordRepeat = ref('')
  const rules = reactive({
    usernameLength: (value: string) => value.length >= 6 || 'Username must be at least 6 characters.',
    repeatCheck: (value: string) => value === password.value || 'Password does not match.',
    required: (value: string) => !!value || 'Required.',
    passwordLength: (value: string) => value.length >= 8 || 'Password must be at least 8 characters.',
    passwordStrength: (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*\d)/.test(value) || 'Password is too weak.',
  })
  // Store
  const showAlert = useAlertStore().showAlert

  const register = async () => {
    if (!username.value || !password.value) {
      return showAlert('mdi-alert', 'Username and password are required', 'error')
    }

    if (password.value !== passwordRepeat.value) {
      return showAlert('mdi-alert', 'Passwords do not match', 'error')
    }

    fetchWrapper.post(`/api/users`, {
      username: username.value,
      password: password.value,
    }).then(() => {
      showAlert(
        'mdi-check',
        'Registration successful. Redirecting to login page in 3s...',
        'success',
        3000,
        '/login'
      )
    }).catch(error => {
      showAlert('mdi-alert', error.message, 'error')
    })
  }
</script>
