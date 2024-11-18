<template>
  <v-sheet class="fill-height pa-6">
    <v-container>
      <v-chip
        class="text-h5 font-weight-bold elevation-2"
        color="primary"
        size="x-large"
        text="DEVICES"
      />
    </v-container>
    <div class="py-2">
      <v-data-table
        :headers="deviceHeaders"
        :items="devices"
      >
        <template #item.device_topics="{ value: topics }">
          <v-chip
            v-for="topic in topics"
            :key="topic"
            class="mx-1"
            :text="topic"
          />
        </template>

        <template #item.actions="{ item }">
          <AddTopicsBtn
            :device-id="item.device_id"
            :device-name="item.device_name"
            @added-topics="getDevices"
          />
          <DeleteTopicsBtn
            :device-id="item.device_id"
            :device-name="item.device_name"
            :device-topics="item.device_topics"
            @deleted-topics="getDevices"
          />
          <DeleteDeviceBtn
            :device-id="item.device_id"
            :device-name="item.device_name"
            @deleted-device="getDevices"
          />
        </template>
      </v-data-table>
    </div>
    <AddDeviceFab @added-device="getDevices" />
  </v-sheet>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { fetchWrapper } from '@/helper/fetch-wrapper'

  // Ref
  const devices = ref([] as any[])
  const dialogActions = ref({} as any)
  const deviceHeaders = reactive([
    {
      title: 'ID',
      key: 'device_id',
    },
    {
      title: 'Name',
      key: 'device_name',
    },
    {
      title: 'Topics',
      key: 'device_topics',
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ])

  onMounted(() => {
    getDevices()
  })

  const getDevices = async () => {
    const response = await fetchWrapper.get(`/api/devices`)
    dialogActions.value = {}
    for (const device of response) {
      dialogActions.value[device.device_id] = { show: { addTopics: false, removeTopics: false, removeDevice: false }, topics: [], removeTopics: [] }
    }
    devices.value = response
  }

</script>
