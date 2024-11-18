<template>
  <v-alert
    v-show="alertStore.show"
    class="mt-2 mr-2"
    closable
    density="comfortable"
    :icon="alertStore.icon"
    location="top right"
    position="fixed"
    :text="alertStore.text"
    :type="alertStore.type"
  />
</template>

<script lang="ts" setup>
  import { useAlertStore } from '@/stores/alert'

  const alertStore = useAlertStore()
</script>
