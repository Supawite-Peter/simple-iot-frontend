<template>
  <v-sheet class="text-no-wrap float-right">
    <v-btn
      border="black thin"
      class="text-capitalize border-opacity-25"
      color="primary"
      elevation="3"
      min-width="0"
      readonly
      rounded="s-pill"
      :text="buttonText"
      variant="tonal"
    />
    <v-menu>
      <template #activator="{ props : menuActivator }">
        <v-btn
          v-bind="menuActivator"
          append-icon="mdi-arrow-down-drop-circle-outline"
          border="black thin"
          class="text-lowercase"
          color="primary"
          min-width="0"
          rounded="e-pill"
        >
          {{ selection }}
        </v-btn>
      </template>
      <v-list class="bg-primary">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="updateSelection(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-sheet>
</template>

<script lang="ts" setup>
  // Prop
  const props = defineProps({
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    iniSelection: {
      type: String,
      required: true,
    },
  })
  // Ref
  const selection = ref(props.iniSelection)
  // Emit
  const emit = defineEmits(['updateSelection'])

  const updateSelection = (item: string) => {
    selection.value = item
    emit('updateSelection', item)
  }
</script>
