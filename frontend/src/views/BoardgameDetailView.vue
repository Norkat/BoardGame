<template>
  <v-container class="mt-6" fluid>
    <v-card v-if="game" class="pa-6" elevation="6">
      <h2 class="text-h5 font-weight-bold mb-4">{{ game.name }}</h2>

      <v-row>
        <v-col cols="12" md="6">
          <p><strong>Publisher:</strong> {{ game.publisher }}</p>
          <p><strong>Año:</strong> {{ game.year }}</p>
          <p>
            <strong>Categoría:</strong>
            <CategoryChip :category="game.category" />
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p><strong>Descripción:</strong></p>
          <p>{{ game.description || "Sin descripción." }}</p>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <div class="d-flex" style="gap: 12px">
        <v-btn color="primary" @click="goBack">Volver</v-btn>
        <v-btn color="warning" @click="goToEdit">Editar</v-btn>
        <v-btn color="error" @click="openDeleteDialog">Eliminar</v-btn>
      </div>
    </v-card>

    <!-- Modal Confirmación -->
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

const route = useRoute();
const router = useRouter();
const boardgames = useBoardgamesStore();

const dialog = ref(false);

onMounted(async () => {
  await boardgames.fetchById(route.params.id);
});

const game = computed(() => boardgames.current);

const goBack = () => {
  router.push("/boardgames");
};

const goToEdit = () => {
  router.push(`/boardgame/${route.params.id}/edit`);
};

const openDeleteDialog = () => {
  dialog.value = true;
};

const deleteGame = async () => {
  await boardgames.remove(route.params.id);
  router.push("/boardgames");
};
</script>

<style scoped></style>
