<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: dialogActivator }">
      <v-tooltip location="top" text="Remove Topics">
        <template #activator="{ props: tooltipActivator }">
          <v-btn
            v-bind="mergeProps(dialogActivator, tooltipActivator)"
            class="mx-2"
            color="red-darken-2"
            icon="mdi-playlist-remove"
            size="small"
          />
        </template>
      </v-tooltip>
    </template>
    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="py-6 px-4">
          Remove Topics for <span class="text-capitalize">[{{ deviceId }}] {{ deviceName }}</span>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="12">
              <v-autocomplete
                v-model="topicsToDelete"
                chips
                :items="deviceTopics"
                label="Topics to Remove"
                multiple
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Close"
            @click="isActive.value = false"
          />
          <v-btn
            color="red"
            text="Remove"
            variant="tonal"
            @click="deleteTopics(deviceId)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { mergeProps, PropType, ref } from 'vue'
  import { fetchWrapper } from '@/helper/fetch-wrapper'
  import { useAlertStore } from '@/stores/alert'

  // Ref
  const dialog = ref(false)
  const topicsToDelete = ref([] as string[])
  // Props
  defineProps({
    deviceId: {
      type: Number,
      required: true,
    },
    deviceName: {
      type: String,
      default: 'Unknown',
    },
    deviceTopics: {
      type: Array as PropType<Array<String>>,
      required: true,
    },
  })
  // Emit
  const emit = defineEmits(['deletedTopics'])
  // Store
  const showAlert = useAlertStore().showAlert

  const deleteTopics = async (id: number) => {
    if (!id) return showAlertAndResetDialog('mdi-alert', 'Device ID is required', 'error')
    await fetchWrapper.delete(`/api/devices/${id}/topics`, {
      topics: topicsToDelete.value,
    }).then(() => {
      showAlertAndResetDialog('mdi-check', 'Topics removed successfully', 'success')
      emit('deletedTopics')
    }).catch(errorMessages => {
      showAlertAndResetDialog('mdi-alert', errorMessages, 'error')
    })
  }

  const showAlertAndResetDialog = (
    icon: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error'
  ): void => {
    dialog.value = false
    topicsToDelete.value = []
    showAlert(icon, message, type)
  }

</script>
