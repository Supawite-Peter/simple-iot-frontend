<template>
  <v-sheet class="fill-height pa-6">
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <v-divider
            color="primary"
            opacity="0.75"
            thickness="4"
          />
        </v-col>
        <v-col class="ma-auto" lg="3" xl="2">
          <p class="text-h2 font-weight-black text-primary text-center">DEVICES</p>
        </v-col>
        <v-col>
          <v-divider
            color="primary"
            opacity="1"
            thickness="4"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        class="elevation-10 rounded-lg"
        :headers="deviceHeaders"
        :items="devices"
      >
        <template #item.topics="{ value: topics, item }">
          <topic-detail-btn
            v-for="topic in topics"
            :key="topic"
            :device-id="item.id"
            :device-name="item.name"
            :topic="topic"
          />
        </template>

        <template #item.actions="{ item }">
          <add-topics-btn
            :device-id="item.id"
            :device-name="item.name"
            @added-topics="getDevices"
          />
          <delete-topics-btn
            :device-id="item.id"
            :device-name="item.name"
            :device-topics="item.topics"
            @deleted-topics="getDevices"
          />
          <delete-device-btn
            :device-id="item.id"
            :device-name="item.name"
            @deleted-device="getDevices"
          />
        </template>
      </v-data-table>
    </v-container>
    <topic-detail-drawer />
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
      key: 'id',
    },
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Topics',
      key: 'topics',
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
      devices.value = []
    })
  }

</script>
