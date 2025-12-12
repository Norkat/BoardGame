<template>
  <!-- Main container for the Boardgame creation view -->
  <v-container class="mt-6" fluid>
    <!-- Component that renders the boardgame creation form -->
    <BoardgameFormCreate />
  </v-container>
</template>

<script setup>
/**
 * Imports the BoardgameFormCreate component.
 * This component contains the form used to create
 * a new board game entry in the system.
 */
import BoardgameFormCreate from "@/components/forms/BoardgameFormCreate.vue";
</script>

<style scoped></style>
