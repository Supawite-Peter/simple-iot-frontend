<template>
  <v-app>
    <v-main>
      <v-alert
        v-show="alertConfig.show"
        class="mt-2 mr-2"
        closable
        density="comfortable"
        :icon="alertConfig.icon"
        location="top right"
        position="fixed"
        :text="alertConfig.text"
        :type="alertConfig.type"
      />
      <v-container class="align-center justify-center fluid fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  const alertConfig = reactive({
    show: false,
    icon: 'mdi-alert',
    text: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error' | undefined,
  })

  function showAlert (
    alertIconState: string,
    alertTextState: string,
    alertTypeState: 'info' | 'success' | 'warning' | 'error' | undefined,
    alertTimeout: number = 3000,
    redirect: string = ''
  ) {
    alertConfig.show = true
    alertConfig.icon = alertIconState
    alertConfig.text = alertTextState
    alertConfig.type = alertTypeState
    window.setTimeout(() => {
      alertConfig.show = false
      if (redirect) {
        window.location.href = redirect
      }
    }, alertTimeout)
  }

  provide('showAlert', showAlert)
</script>
