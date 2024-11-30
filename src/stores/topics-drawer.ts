import { defineStore } from 'pinia'

export const useTopicDrawerStore = defineStore('topics-drawer', {
  state: () => ({
    show: false,
    deviceId: 0,
    deviceName: 'Device Name',
    topic: 'Topic',
  }),
  actions: {
    openDrawer (deviceId: number, deviceName: string, topic: string) {
      this.deviceId = deviceId
      this.deviceName = deviceName
      this.topic = topic
      this.show = true
    },

    closeDrawer () {
      this.show = false
    },
  },
})
