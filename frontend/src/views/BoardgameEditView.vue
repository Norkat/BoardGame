<template>
  <!-- Main container wrapping the edit boardgame form -->
  <v-container class="mt-6" fluid>
    <!-- Component responsible for editing an existing boardgame -->
    <BoardgameFormEdit />
  </v-container>
</template>

<script setup>
/**
 * Imports the form component used for editing an existing boardgame.
 */
import BoardgameFormEdit from "@/components/forms/BoardgameFormEdit.vue";
</script>

<style scoped></style>
