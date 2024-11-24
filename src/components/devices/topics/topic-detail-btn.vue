<template>
  <v-btn
    class="mx-1 elevation-1"
    color="primary"
    rounded="pill"
    size="small"
    :text="topic"
    variant="tonal"
    @click="openDrawer(deviceName, topic)"
  />
</template>

<script lang="ts" setup>
  import { useTopicDrawerStore } from '@/stores/topics-drawer'

  // Props
  defineProps({
    topic: {
      type: String,
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    deviceId: {
      type: Number,
      required: true,
    },
  })
  // Store
  const openDrawer = useTopicDrawerStore().openDrawer
</script>
