<template>
  <v-card
    class="elevation-3 rounded-lg"
    color="blue-darken-1"
    prepend-icon="mdi-chart-line"
    title="Statistics"
    width="300"
  >
    <v-card-text class="bg-surface pt-4 d-flex flex-wrap ga-4">
      <v-btn
        block
        color="primary"
        readonly
        variant="tonal"
      >
        Total Devices: {{ devicesCount }}
      </v-btn>
      <v-btn
        block
        color="primary"
        readonly
        variant="tonal"
      >
        Total Topics: {{ topicsCount }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { fetchWrapper } from '@/helper/fetch-wrapper'

  const devicesCount = ref(0)
  const topicsCount = ref(0)

  onMounted(() => {
    getDevices()
  })

  const getDevices = async () => {
    devicesCount.value = 0
    topicsCount.value = 0
    const response = await fetchWrapper.get(`/api/devices`)
    devicesCount.value = response.length
    for (const device of response) {
      topicsCount.value += device.topics.length
    }
  }
</script>
