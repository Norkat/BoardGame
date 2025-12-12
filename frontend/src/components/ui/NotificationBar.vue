<template>
  <!-- Global notification snackbar -->
  <v-snackbar
    v-model="notification.show"
    :color="notification.color"
    timeout="2500"
    location="top right"
    multi-line
    elevation="6"
  >
    <!-- Display notification message -->
    {{ notification.message }}

    <!-- Snackbar action buttons -->
    <template #actions>
      <!-- Close button -->
      <v-btn variant="text" @click="notification.show = false"> Cerrar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification";

/**
 * Access the global notification store.
 * This store exposes reactive properties such as:
 *  - show: Whether the snackbar is visible.
 *  - message: Text displayed inside the snackbar.
 *  - color: Visual color of the snackbar (e.g., "success", "error").
 */
const notification = useNotificationStore();
</script>

<style scoped></style>
