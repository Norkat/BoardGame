<template>
  <!-- Reusable confirmation dialog component -->
  <v-dialog v-model="model" max-width="400px">
    <v-card>
      <!-- Dialog title -->
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>

      <!-- Dialog message -->
      <v-card-text>
        <p>{{ message }}</p>
      </v-card-text>

      <!-- Dialog actions -->
      <v-card-actions class="d-flex justify-end" style="gap: 8px">
        <!-- Cancel button -->
        <v-btn variant="text" @click="close">Cancelar</v-btn>

        <!-- Confirm button -->
        <v-btn color="error" variant="flat" @click="confirm">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";

/**
 * Component props.
 * @property {boolean} modelValue - Controls visibility of the dialog.
 * @property {string} title - Title displayed at the top of the dialog.
 * @property {string} message - Text message shown inside the dialog.
 */
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Confirmar" },
  message: { type: String, default: "¿Estás seguro?" },
});

/**
 * Component emits:
 * @event update:modelValue - Fired when the dialog visibility changes.
 * @event confirm - Fired when the "Accept" button is clicked.
 */
const emit = defineEmits(["update:modelValue", "confirm"]);

/**
 * Computed property used as a v-model binding proxy.
 * Allows the component to emit updates when the dialog opens/closes.
 * @type {import('vue').ComputedRef<boolean>}
 */
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/**
 * Closes the dialog by emitting an update event.
 */
const close = () => {
  emit("update:modelValue", false);
};

/**
 * Confirms the action:
 * - Emits the "confirm" event to notify the parent.
 * - Closes the dialog afterward.
 */
const confirm = () => {
  emit("confirm");
  emit("update:modelValue", false);
};
</script>

<style scoped></style>
