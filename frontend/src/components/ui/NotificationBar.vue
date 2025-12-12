<template>
  <v-snackbar
    v-model="notification.show"
    :color="notification.color"
    timeout="2500"
    location="top right"
    multi-line
    elevation="6"
  >
    {{ notification.message }}

    <template #actions>
      <v-btn variant="text" @click="notification.show = false"> Cerrar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification";

const notification = useNotificationStore();
</script>

<style scoped></style>
