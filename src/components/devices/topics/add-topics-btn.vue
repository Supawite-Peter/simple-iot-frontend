<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: dialogActivator }">
      <v-tooltip location="top" text="Add Topics">
        <template #activator="{ props: tooltipActivator }">
          <v-btn
            v-bind="mergeProps(dialogActivator, tooltipActivator)"
            color="primary"
            icon="mdi-playlist-plus"
            size="small"
          />
        </template>
      </v-tooltip>
    </template>
    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="py-6 px-4">
          Add Topics for <span class="text-capitalize">[{{ deviceId }}] {{ deviceName }}</span>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="12">
              <v-combobox
                v-model="newTopics"
                chips
                clearable
                :hide-no-data="false"
                hide-selected
                label="Device Topics*"
                multiple
                variant="outlined"
              >
                <template #no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Type topic and press <kbd>enter</kbd> to create a new topic.
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Close"
            @click="isActive.value = false"
          />
          <v-btn
            color="primary"
            text="Add"
            variant="tonal"
            @click="addTopics(deviceId)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { mergeProps, ref } from 'vue'
  import { fetchWrapper } from '@/helper/fetch-wrapper'
  import { useAlertStore } from '@/stores/alert'

  // Ref
  const dialog = ref(false)
  const newTopics = ref([] as string[])
  // Emit
  const emit = defineEmits(['addedTopics'])
  // Props
  defineProps({
    deviceId: Number,
    deviceName: String,
  })
  // Store
  const showAlert = useAlertStore().showAlert

  const addTopics = async (id: number | undefined) => {
    if (!id) return showAlertAndResetDialog('mdi-alert', 'Device ID is required', 'error')

    await fetchWrapper.post(`/api/devices/${id}/topics`, {
      topics: newTopics.value,
    }).then(() => {
      showAlertAndResetDialog('mdi-check', 'Topics added successfully', 'success')
      emit('addedTopics')
    }).catch(errorMessages => {
      showAlertAndResetDialog('mdi-alert', errorMessages, 'error')
    })
  }

  const showAlertAndResetDialog = (icon: string, message: string, type: 'info' | 'success' | 'warning' | 'error'): void => {
    dialog.value = false
    newTopics.value = []
    showAlert(icon, message, type)
  }

</script>
