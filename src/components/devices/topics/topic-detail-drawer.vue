<template>
  <v-navigation-drawer
    v-model="topicDrawerStore.show"
    floating
    location="right"
    temporary
    width="800"
  >
    <v-sheet
      color="primary-lighten-1"
      height="240"
    >
      <v-container
        class="mx-4"
        height="100%"
      >
        <v-row
          align="center"
          justify="start"
          style="height: 100%"
        >
          <v-sheet color="primary-lighten-1">
            <h3
              class="text-h3 text-variant mt-10"
            >
              {{ topicDrawerStore.deviceName }} > <a class="text-uppercase">{{ topicDrawerStore.topic }}</a>
            </h3>
            <v-divider
              class="mt-1 mb-2 border-opacity-75"
              :thickness="2"
            />
            <a class="text-variant-lighten-1 text-h6 font-weight-regular">Topic Detail</a>
          </v-sheet>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container class="mt-5">
      <v-row justify="end">
        <v-sheet class="d-flex ga-3 mr-3 float-right">
          <dropdown-btn
            button-text="Refresh"
            :ini-selection="refreshTimer"
            :items="refreshTimerItems"
            @update-selection="updateRefreshTimer"
          />
          <dropdown-btn
            button-text="Last"
            :ini-selection="last"
            :items="lastItems"
            @update-selection="updateLast"
          />
        </v-sheet>
      </v-row>
    </v-container>
    <v-container>
      <v-sheet class="bg-surface ma-3 pa-6 elevation-3 border-thin rounded-lg">
        <line-chart :chart-data="data" />
      </v-sheet>
    </v-container>
    <template #append>
      <v-container class="d-flex justify-end">
        <v-btn
          color="red-darken-1"
          elevation="2"
          rounded="pill"
          text="Close"
          @click="topicDrawerStore.closeDrawer()"
        />
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useTopicDrawerStore } from '@/stores/topics-drawer'
  import { LineChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'

  Chart.register(...registerables)

  // Ref
  const refreshTimerItems = ref(['1s', '5s', '10s', '30s', '1m', '5m', '10m', '30m'])
  const refreshTimer = ref('5s')
  const lastItems = ref(['1m', '5m', '10m', '30m', '1h', '6h', '12h', '1d'])
  const last = ref('5m')
  const data = reactive({
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  watch(refreshTimer, () => {
    console.log(refreshTimer.value)
  })

  watch(last, () => {
    console.log(last.value)
  })

  // Store
  const topicDrawerStore = useTopicDrawerStore()

  const updateRefreshTimer = (value : string) => {
    refreshTimer.value = value
  }
  const updateLast = (value : string) => {
    last.value = value
  }
</script>
