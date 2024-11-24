<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: dialogActivator }">
      <v-tooltip location="top" text="Remove Device">
        <template #activator="{ props: tooltipActivator }">
          <v-btn
            v-bind="mergeProps(dialogActivator, tooltipActivator)"
            color="red-darken-2"
            icon="mdi-minus"
            size="small"
          />
        </template>
      </v-tooltip>
    </template>
    <template #default="{ isActive }">
      <v-card title="Remove Device">
        <v-card-text>
          <p>Are you sure you want to remove this device?</p>
          <v-chip class="mt-4">[{{ deviceId }}] {{ deviceName }}</v-chip>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Cancle"
            @click="isActive.value = false"
          />
          <v-btn
            color="red"
            text="Remove"
            variant="tonal"
            @click="removeDevice(deviceId)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { mergeProps } from 'vue'
  import { fetchWrapper } from '@/helper/fetch-wrapper'
  import { useAlertStore } from '@/stores/alert'

  // Ref
  const dialog = ref(false)
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
  })
  // Emit
  const emit = defineEmits(['deletedDevice'])
  // Store
  const showAlert = useAlertStore().showAlert

  const removeDevice = async (id: number) => {
    if (!id) return showAlertAndResetDialog('mdi-alert', 'Device id is required', 'error')

    fetchWrapper.delete(`/api/devices/`, {
      id,
    }).then(() => {
      showAlertAndResetDialog('mdi-check', 'Device removed successfully', 'success')
      emit('deletedDevice')
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
    showAlert(icon, message, type)
  }

</script>
