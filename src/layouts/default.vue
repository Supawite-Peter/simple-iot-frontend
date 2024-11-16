<template>
  <v-app id="inspire">
    <v-navigation-drawer
      expand-on-hover
      :mini-variant="mini"
      permanent
      rail
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        />
      </v-list>

      <template #append>
        <v-list-item
          nav
          prepend-icon="mdi-logout"
          title="Logout"
          @click="useAuthStore().logout()"
        />
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'

  const items = ref([
    { title: 'Home', icon: 'mdi-view-dashboard', to: '/home' },
    { title: 'Placeholder', icon: 'mdi-image', to: '/placeholder' },
  ])
  const mini = ref(true)
</script>
