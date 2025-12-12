<template>
  <!-- Main container for the Favorites view -->
  <v-container class="mt-6" fluid>
    <!-- Renders the FavoritesTable component -->
    <FavoritesTable />
  </v-container>
</template>

<script setup>
/**
 * Imports the FavoritesTable component.
 * This component is responsible for displaying
 * the list or table of user favorites.
 */
import FavoritesTable from "@/components/tables/FavoritesTable.vue";
</script>

<style scoped></style>
