<template>
  <v-sheet class="fill-height pa-6">
    <v-container>
      <v-chip
        class="text-h5 font-weight-bold elevation-5"
        color="primary"
        size="x-large"
        text="DEVICES"
      />
    </v-container>
    <div class="py-2">
      <v-data-table
        class="elevation-10 rounded-lg"
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
          <add-topics-btn
            :device-id="item.device_id"
            :device-name="item.device_name"
            @added-topics="getDevices"
          />
          <delete-topics-btn
            :device-id="item.device_id"
            :device-name="item.device_name"
            :device-topics="item.device_topics"
            @deleted-topics="getDevices"
          />
          <delete-device-btn
            :device-id="item.device_id"
            :device-name="item.device_name"
            @deleted-device="getDevices"
          />
        </template>
      </v-data-table>
    </div>
    <add-device-fab @added-device="getDevices" />
  </v-sheet>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useAlertStore } from '@/stores/alert'
  import { fetchWrapper } from '@/helper/fetch-wrapper'

  // Ref
  const devices = ref([] as any[])
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
  // Store
  const showAlert = useAlertStore().showAlert

  onMounted(() => {
    getDevices()
  })

  const getDevices = async () => {
    fetchWrapper.get(`/api/devices`).then(response => {
      devices.value = response
    }).catch(errorMessages => {
      showAlert('mdi-alert', errorMessages, 'error')
    })
  }

</script>
