<template>
  <v-card class="pa-4 mb-4" elevation="4">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <div>
          <!-- Game title -->
          <h3 class="text-h6 font-weight-bold">{{ game.name }}</h3>

          <!-- Publisher and year -->
          <p class="text-body-2">{{ game.publisher }} • {{ game.year }}</p>

          <!-- Category chip displaying the game's category -->
          <CategoryChip :category="game.category" />
        </div>

        <!-- Action buttons -->
        <div class="d-flex align-center" style="gap: 8px">
          <!-- Toggle favorite button -->
          <v-btn icon variant="tonal" @click="toggleFavorite">
            <v-icon>{{ isFav ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
          </v-btn>

          <!-- Navigate to detailed view -->
          <v-btn icon color="primary" @click="goToDetail">
            <v-icon>mdi-eye</v-icon>
          </v-btn>

          <!-- Navigate to edit view -->
          <v-btn icon color="warning" @click="goToEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <!-- Open delete confirmation dialog -->
          <v-btn icon color="error" @click="openDeleteDialog">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Confirmation dialog for deletion -->
    <ConfirmDialog
      v-model="dialog"
      title="Eliminar juego"
      message="¿Seguro que deseas eliminar este juego de mesa?"
      @confirm="deleteGame"
    />
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useBoardgamesStore } from "@/stores/boardgames";
import { useFavoritesStore } from "@/stores/favorites";
import CategoryChip from "@/components/ui/CategoryChip.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

/**
 * Component properties.
 * Contains the boardgame object with relevant information.
 * @property {Object} game - The boardgame data object.
 */
const props = defineProps({
  game: { type: Object, required: true },
});

// Initialize router and Pinia stores
const router = useRouter();
const boardgames = useBoardgamesStore();
const favorites = useFavoritesStore();

/**
 * Boolean controlling visibility of the delete confirmation dialog.
 * @type {import('vue').Ref<boolean>}
 */
const dialog = ref(false);

/**
 * Computes whether the current game is marked as a favorite.
 * It checks the favorites list in the store reactively.
 * @type {import('vue').ComputedRef<boolean>}
 */
const isFav = computed(() =>
  favorites.list.some((f) => f.boardgameId === props.game.id)
);

/**
 * Navigates to the details page of the current game.
 */
const goToDetail = () => {
  router.push(`/boardgame/${props.game.id}`);
};

/**
 * Navigates to the edit page for the current game.
 */
const goToEdit = () => {
  router.push(`/boardgame/${props.game.id}/edit`);
};

/**
 * Opens the delete confirmation dialog.
 */
const openDeleteDialog = () => {
  dialog.value = true;
};

/**
 * Deletes the current game from the store.
 * Triggered when the ConfirmDialog emits the confirm event.
 * @async
 * @returns {Promise<void>}
 */
const deleteGame = async () => {
  await boardgames.remove(props.game.id);
};

/**
 * Toggles favorite status for the current game.
 * If already favorite → remove it.
 * If not favorite → add it to the store.
 * @async
 * @returns {Promise<void>}
 */
const toggleFavorite = async () => {
  if (isFav.value) {
    // Find the matching favorite entry
    const fav = favorites.list.find((f) => f.boardgameId === props.game.id);
    if (fav) await favorites.remove(fav.id);
  } else {
    // Add new favorite entry
    await favorites.add(props.game.id);
  }
};
</script>

<style scoped></style>
