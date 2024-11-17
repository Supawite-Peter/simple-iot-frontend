<template>
  <v-sheet class="fill-height bg-grey-darken-3">
    <div class="d-flex flex-wrap pa-6 ga-4">
      <v-card color="blue-darken-1" width="380">
        <v-card-title>
          <v-icon
            class="mr-2"
            icon="mdi-chart-line"
            size="small"
          />
          <span>Statistics</span>
        </v-card-title>
        <v-card-text class="bg-grey-darken-2 pt-4 d-flex flex-wrap ga-4">
          <v-btn block readonly variant="tonal">Total Devices: {{ devicesCount }}</v-btn>
          <v-btn block readonly variant="tonal">Total Topics: {{ topicsCount }}</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-sheet>
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
      topicsCount.value += device.device_topics.length
    }
  }
</script>
