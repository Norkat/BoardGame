<template>
  <v-card elevation="6" class="pa-4">
    <h2 class="text-h6 mb-4">Juegos Favoritos</h2>

    <!-- Filtro por categoría -->
    <v-select
      v-model="selectedCategory"
      :items="categoryOptionsWithAll"
      label="Filtrar por categoría"
      item-title="label"
      item-value="value"
      class="mb-4"
    />

    <!-- Tabla -->
    <v-data-table
      :headers="headers"
      :items="filteredFavorites"
      class="elevation-2"
    >
      <!-- Categoría -->
      <template #item.category="{ item }">
        <CategoryChip :category="item.game.category" />
      </template>

      <!-- Acciones -->
      <template #item.actions="{ item }">
        <v-btn icon size="small" color="error" @click="removeFavorite(item)">
          <v-icon>mdi-heart-off</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import CategoryChip from "@/components/ui/CategoryChip.vue";
import { categories } from "@/utils/categories";

const favorites = useFavoritesStore();

const selectedCategory = ref("all");

const headers = [
  { title: "Nombre", key: "game.name" },
  { title: "Publisher", key: "game.publisher" },
  { title: "Categoría", key: "category" },
  { title: "Año", key: "game.year" },
  { title: "Acciones", key: "actions", sortable: false },
];

const categoryOptionsWithAll = [
  { value: "all", label: "Todas" },
  ...Object.entries(categories).map(([value, label]) => ({
    value,
    label,
  })),
];

// Return clean array of games for the table
const filteredFavorites = computed(() => {
  const list = favorites.list;

  if (selectedCategory.value === "all") return list;

  return list.filter(
    (f) => String(f.game.category) === String(selectedCategory.value)
  );
});

const removeFavorite = async (item) => {
  await favorites.remove(item.id);
};

onMounted(() => {
  favorites.fetchFavorites();
});
</script>

<style scoped></style>
