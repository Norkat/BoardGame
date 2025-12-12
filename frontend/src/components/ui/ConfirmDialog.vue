<template>
  <v-dialog v-model="model" max-width="400px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <p>{{ message }}</p>
      </v-card-text>

      <v-card-actions class="d-flex justify-end" style="gap: 8px">
        <v-btn variant="text" @click="close">Cancelar</v-btn>
        <v-btn color="error" variant="flat" @click="confirm">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Confirmar" },
  message: { type: String, default: "¿Estás seguro?" },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => {
  emit("update:modelValue", false);
};

const confirm = () => {
  emit("confirm");
  emit("update:modelValue", false);
};
</script>

<style scoped></style>
