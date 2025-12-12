<template>
  <v-card elevation="6" class="pa-4">
    <h2 class="text-h6 mb-4">Juegos Favoritos</h2>

    <!-- Category filter dropdown -->
    <v-select
      v-model="selectedCategory"
      :items="categoryOptionsWithAll"
      label="Filtrar por categoría"
      item-title="label"
      item-value="value"
      class="mb-4"
    />

    <!-- Table displaying favorite games -->
    <v-data-table
      :headers="headers"
      :items="filteredFavorites"
      class="elevation-2"
    >
      <!-- Category column formatting -->
      <template #item.category="{ item }">
        <CategoryChip :category="item.game.category" />
      </template>

      <!-- Actions column (remove favorite) -->
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

/** Store managing favorite games */
const favorites = useFavoritesStore();

/** @type {import('vue').Ref<string>} Selected category filter */
const selectedCategory = ref("all");

/** Table headers configuration */
const headers = [
  { title: "Nombre", key: "game.name" },
  { title: "Publisher", key: "game.publisher" },
  { title: "Categoría", key: "category" },
  { title: "Año", key: "game.year" },
  { title: "Acciones", key: "actions", sortable: false },
];

/** Category filter options including "all" */
const categoryOptionsWithAll = [
  { value: "all", label: "Todas" },
  // Map category entries into selectable options
  ...Object.entries(categories).map(([value, label]) => ({
    value,
    label,
  })),
];

/**
 * Computed list of favorite games filtered by category.
 * Returns the complete list when "all" is selected.
 * @type {import('vue').ComputedRef<Array>}
 */
const filteredFavorites = computed(() => {
  const list = favorites.list;

  // Return all favorites when no specific category is selected
  if (selectedCategory.value === "all") return list;

  // Filter favorites by selected category
  return list.filter(
    (f) => String(f.game.category) === String(selectedCategory.value)
  );
});

/**
 * Removes a favorite item from the store.
 * @async
 * @param {Object} item - Favorite item to remove
 * @returns {Promise<void>}
 */
const removeFavorite = async (item) => {
  await favorites.remove(item.id);
};

// Fetch stored favorites on component mount
onMounted(() => {
  favorites.fetchFavorites();
});
</script>

<style scoped></style>
