<template>
  <v-sheet class="fill-height bg-grey-darken-3">
    <div class="d-flex flex-wrap pa-6 ga-4">
      <v-card>
        <v-card-title>Total Devices</v-card-title>
        <v-card-text>{{ devicesCount }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>Total Topics</v-card-title>
        <v-card-text>{{ topicsCount }}</v-card-text>
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
