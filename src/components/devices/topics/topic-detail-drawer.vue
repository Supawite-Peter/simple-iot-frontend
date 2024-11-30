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
      height="200"
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
            :ini-selection="refreshTimerString"
            :items="refreshTimerItems"
            @update-selection="updateRefreshTimer"
          />
          <dropdown-btn
            button-text="Last"
            :ini-selection="getLastString"
            :items="getLastItems"
            @update-selection="updateLast"
          />
        </v-sheet>
      </v-row>
    </v-container>
    <v-container>
      <v-sheet class="bg-surface ma-3 pa-6 elevation-3 border-thin rounded-lg" height="375">
        <Line id="myChart" class="h-100" :data="data" :options="options" />
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
  import { ref, shallowReactive } from 'vue'
  import { useTopicDrawerStore } from '@/stores/topics-drawer'
  import { Line } from 'vue-chartjs'
  import { Chart, registerables } from 'chart.js'
  import { fetchWrapper } from '@/helper/fetch-wrapper'
  import ms from 'ms'
  import 'chartjs-adapter-date-fns'

  Chart.register(...registerables)

  // Store
  const topicDrawerStore = useTopicDrawerStore()
  // Ref
  const refreshTimerItems = ref(['1s', '5s', '10s', '30s', '1m', '5m', '10m', '30m'])
  const refreshTimerString = ref('5s')
  const refreshTimerTimestamp = ref(ms(refreshTimerString.value))
  const refreshInterval = ref(0)
  const getLastItems = ref(['1m', '5m', '10m', '30m', '1h', '6h', '12h', '1d'])
  const getLastString = ref('5m')
  const getLastTimestamp = ref(Date.now() - ms(getLastString.value))
  // Shallow reactive (for chart data)
  const data = shallowReactive({
    datasets: [
      {
        data: [] as any,
      },
    ],
  })
  const options = shallowReactive({
    scales: {
      x: {
        type: 'time' as 'timeseries',
      },
    },
  })

  watch(() => topicDrawerStore.show, () => {
    clearInterval(refreshInterval.value)
    if (topicDrawerStore.show) {
      updateGraph()
      refreshInterval.value = setInterval(updateGraph, refreshTimerTimestamp.value)
    }
  })

  const updateRefreshTimer = (value : string) => {
    refreshTimerString.value = value
    refreshTimerTimestamp.value = ms(value)
    clearInterval(refreshInterval.value)
    refreshInterval.value = setInterval(updateGraph, refreshTimerTimestamp.value)
    updateGraph()
  }
  const updateLast = (value : string) => {
    getLastString.value = value
    getLastTimestamp.value = Date.now() - ms(value)
    updateGraph()
  }

  const updateGraph = async () => {
    try {
      const reponseData:[{timestamp: number, value: number}] = await fetchPeriodicData()
      updateData(reponseData.map(d => ({ x: d.timestamp, y: d.value })))
    } catch {
      updateData([])
    }
  }

  const fetchPeriodicData = async () => {
    const from = getLastTimestamp.value
    const to = Date.now()
    return fetchWrapper.get(
      `/api/devices/${topicDrawerStore.deviceId}/${topicDrawerStore.topic}/periodic?from=${from}&to=${to}&unix=true`
    )
  }

  const updateData = (data: any) => {
    const chart = Chart.getChart('myChart') as Chart
    chart.data.datasets[0].data = data
    chart.data.datasets[0].label = topicDrawerStore.topic.toUpperCase()
    chart.options = {
      scales: {
        x: {
          type: 'time' as 'timeseries',
          max: Date.now(),
          min: getLastTimestamp.value,
        },
      },
    }
    chart.update()
  }
</script>
