<template>
  <v-navigation-drawer
    v-model:rail="mini"
    color="blue-grey-darken-4"
    expand-on-hover
    permanent
    width="200"
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-account-circle"
        :subtitle="useAuthStore()?.user?.username || ''"
        title="Username"
      />
    </v-list>

    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
      />
    </v-list>

    <template #append>
      <v-list
        density="compact"
        nav
      >
        <v-list-item
          base-color="red"
          prepend-icon="mdi-logout"
          variant="tonal"
          @click="useAuthStore().logout()"
        >
          <v-list-item-title
            class="font-weight-bold"
          >
            LOGOUT
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'

  // Ref
  const items = ref([
    { title: 'Home', icon: 'mdi-home', to: '/home' },
    { title: 'Devices', icon: 'mdi-devices', to: '/devices' },
    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  ])
  const mini = ref(true)
</script>
