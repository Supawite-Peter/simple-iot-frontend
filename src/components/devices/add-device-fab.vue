<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: dialogActivator }">
      <v-tooltip text="Add a Device">
        <template #activator="{ props: tooltipActivator }">
          <v-fab
            v-bind="mergeProps(dialogActivator, tooltipActivator)"
            absolute
            app
            appear
            class="mb-1 mr-2"
            color="primary"
            icon="mdi-plus"
            location="bottom end"
            size="large"
          />
        </template>
      </v-tooltip>
    </template>
    <template #default="{ isActive }">
      <v-card title="Add a Device">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="newName"
                hint="Name of the device"
                label="Device Name*"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newSerial"
                label="Serial Number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="newTopics"
                chips
                clearable
                :hide-no-data="false"
                hide-selected
                label="Device Topics"
                multiple
                variant="outlined"
              >
                <template #chip="{ props }">
                  <v-chip
                    class="text-uppercase font-weight-bold elevation-2"
                    v-bind="props"
                    color="primary"
                  />
                </template>
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
            @click="addDevice"
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
  const newName = ref('')
  const newSerial = ref('')
  const newTopics = ref([] as string[])
  // Emit
  const emit = defineEmits(['addedDevice'])
  // Store
  const showAlert = useAlertStore().showAlert

  const addDevice = async () => {
    if (!newName.value) return showAlertAndResetDialog('mdi-alert', 'Device name is required', 'error')

    fetchWrapper.post(`/api/devices`, {
      name: newName.value,
      topics: newTopics.value,
    }).then(() => {
      showAlertAndResetDialog('mdi-check', 'Device added successfully', 'success')
      emit('addedDevice')
    }).catch(errorMessages => {
      showAlertAndResetDialog('mdi-alert', errorMessages, 'error')
    })
  }

  const resetDialog = () => {
    dialog.value = false
    newName.value = ''
    newSerial.value = ''
    newTopics.value = []
  }

  const showAlertAndResetDialog = (
    icon: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error'
  ) => {
    resetDialog()
    showAlert(icon, message, type)
  }
</script>
