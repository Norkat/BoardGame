<template>
  <!-- Root layout container for the application -->
  <v-app>
    <!-- Top navigation bar -->
    <v-app-bar color="primary" dark elevation="4">
      <!-- Application title displayed in the app bar -->
      <v-app-bar-title>Board Game System</v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Navigation buttons for main routes -->
      <v-btn to="/" variant="text" class="text-white">Inicio</v-btn>
      <v-btn to="/boardgames" variant="text" class="text-white">Juegos</v-btn>
      <v-btn to="/boardgame/create" variant="text" class="text-white">
        Agregar
      </v-btn>
    </v-app-bar>

    <!-- Main content section where routed components are rendered -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Global notification component -->
    <NotificationBar />
  </v-app>
</template>

<script setup>
// Imports the global notification component used to display system messages
import NotificationBar from "@/components/ui/NotificationBar.vue";
</script>

<style>
/* Ensures full height layout for proper Vuetify rendering */
html,
body,
#app {
  height: 100%;
}
</style>
