<template>
  <!-- Main container for the game detail view -->
  <v-container class="mt-6" fluid>
    <!-- Card displayed only if the game data is available -->
    <v-card v-if="game" class="pa-6" elevation="6">
      <!-- Game title -->
      <h2 class="text-h5 font-weight-bold mb-4">{{ game.name }}</h2>

      <v-row>
        <!-- Left column: basic game information -->
        <v-col cols="12" md="6">
          <p><strong>Publisher:</strong> {{ game.publisher }}</p>
          <p><strong>Año:</strong> {{ game.year }}</p>

          <!-- Category with visual chip -->
          <p>
            <strong>Categoría:</strong>
            <CategoryChip :category="game.category" />
          </p>
        </v-col>

        <!-- Right column: description -->
        <v-col cols="12" md="6">
          <p><strong>Descripción:</strong></p>
          <p>{{ game.description || "Sin descripción." }}</p>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <!-- Action buttons: navigation, edit, delete -->
      <div class="d-flex" style="gap: 12px">
        <v-btn color="primary" @click="goBack">Volver</v-btn>
        <v-btn color="warning" @click="goToEdit">Editar</v-btn>
        <v-btn color="error" @click="openDeleteDialog">Eliminar</v-btn>
      </div>
    </v-card>

    <!-- Confirmation dialog for deletion -->
    <ConfirmDialog
      v-model="dialog"
      title="Eliminar juego"
      message="¿Seguro que deseas eliminar este juego de mesa?"
      @confirm="deleteGame"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBoardgamesStore } from "@/stores/boardgames";
import CategoryChip from "@/components/ui/CategoryChip.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

/**
 * Current active route object used to access route params.
 */
const route = useRoute();

/**
 * Router instance used for navigation.
 */
const router = useRouter();

/**
 * Store that manages boardgame data.
 */
const boardgames = useBoardgamesStore();

/**
 * Controls visibility of the delete confirmation dialog.
 * @type {import('vue').Ref<boolean>}
 */
const dialog = ref(false);

/**
 * Fetches the game data when the component mounts.
 */
onMounted(async () => {
  await boardgames.fetchById(route.params.id);
});

/**
 * Computed reference to the currently selected game.
 * @type {import('vue').ComputedRef<Object|null>}
 */
const game = computed(() => boardgames.current);

/**
 * Navigates back to the boardgames list page.
 * @returns {void}
 */
const goBack = () => {
  router.push("/boardgames");
};

/**
 * Navigates to the edit form for the current game.
 * @returns {void}
 */
const goToEdit = () => {
  router.push(`/boardgame/${route.params.id}/edit`);
};

/**
 * Opens the delete confirmation dialog.
 * @returns {void}
 */
const openDeleteDialog = () => {
  dialog.value = true;
};

/**
 * Deletes the current game from the store and redirects to the list.
 * @returns {Promise<void>}
 */
const deleteGame = async () => {
  await boardgames.remove(route.params.id);
  router.push("/boardgames");
};
</script>

<style scoped></style>
