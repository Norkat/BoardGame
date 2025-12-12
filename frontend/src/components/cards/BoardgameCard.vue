<template>
  <v-card class="pa-4 mb-4" elevation="4">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <div>
          <h3 class="text-h6 font-weight-bold">{{ game.name }}</h3>
          <p class="text-body-2">{{ game.publisher }} • {{ game.year }}</p>
          <CategoryChip :category="game.category" />
        </div>

        <div class="d-flex align-center" style="gap: 8px">
          <!-- Favorito -->
          <v-btn icon variant="tonal" @click="toggleFavorite">
            <v-icon>{{ isFav ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
          </v-btn>

          <!-- Detalle -->
          <v-btn icon color="primary" @click="goToDetail">
            <v-icon>mdi-eye</v-icon>
          </v-btn>

          <!-- Editar -->
          <v-btn icon color="warning" @click="goToEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <!-- Eliminar -->
          <v-btn icon color="error" @click="openDeleteDialog">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Modal Confirmación -->
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

const props = defineProps({
  game: { type: Object, required: true },
});

const router = useRouter();
const boardgames = useBoardgamesStore();
const favorites = useFavoritesStore();

const dialog = ref(false);

// Ahora sí funcionará correctamente
const isFav = computed(() =>
  favorites.list.some((f) => f.boardgameId === props.game.id)
);

const goToDetail = () => {
  router.push(`/boardgame/${props.game.id}`);
};

const goToEdit = () => {
  router.push(`/boardgame/${props.game.id}/edit`);
};

const openDeleteDialog = () => {
  dialog.value = true;
};

const deleteGame = async () => {
  await boardgames.remove(props.game.id);
};

const toggleFavorite = async () => {
  if (isFav.value) {
    const fav = favorites.list.find((f) => f.boardgameId === props.game.id);
    if (fav) await favorites.remove(fav.id);
  } else {
    await favorites.add(props.game.id);
  }
};
</script>

<style scoped></style>
