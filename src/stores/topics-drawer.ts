import { defineStore } from 'pinia'

export const useTopicDrawerStore = defineStore('topics-drawer', {
  state: () => ({
    show: false,
    deviceName: 'Device Name',
    topic: 'Topic',
  }),
  actions: {
    openDrawer (deviceName: string, topic: string) {
      this.deviceName = deviceName
      this.topic = topic
      this.show = true
    },

    closeDrawer () {
      this.show = false
    },
  },
})
