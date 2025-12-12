<template>
  <!-- Main container for the boardgames listing page -->
  <v-container class="mt-6" fluid>
    <!-- Section title -->
    <h2 class="text-h6 mb-4">Lista de Juegos de Mesa</h2>

    <!-- Category filter dropdown -->
    <v-select
      v-model="selectedCategory"
      :items="categoryOptionsWithAll"
      label="Filtrar por categoría"
      item-title="label"
      item-value="value"
      class="mb-6"
    />

    <!-- Grid of boardgame cards -->
    <v-row>
      <v-col
        v-for="game in filteredList"
        :key="game.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <!-- Card component displaying individual game details -->
        <BoardgameCard :game="game" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBoardgamesStore } from "@/stores/boardgames";
import { categories } from "@/utils/categories";
import BoardgameCard from "@/components/cards/BoardgameCard.vue";

/**
 * Store instance used to access boardgame data and actions.
 */
const boardgames = useBoardgamesStore();

/**
 * Currently selected category used to filter the boardgame list.
 * @type {import('vue').Ref<string>}
 */
const selectedCategory = ref("all");

/**
 * Array of category options including an "all" option.
 * Used to populate the v-select filter component.
 * @type {Array<{ value: string, label: string }>}
 */
const categoryOptionsWithAll = [
  { value: "all", label: "Todas" },
  ...Object.entries(categories).map(([value, label]) => ({ value, label })),
];

/**
 * Fetches all boardgames when the component is mounted.
 */
onMounted(() => {
  boardgames.fetchAll();
});

/**
 * Computed list of boardgames filtered by the selected category.
 * Returns the full list if "all" is selected.
 * @type {import('vue').ComputedRef<Array<Object>>}
 */
const filteredList = computed(() => {
  if (selectedCategory.value === "all") return boardgames.list;
  return boardgames.list.filter(
    (g) => String(g.category) === String(selectedCategory.value)
  );
});
</script>

<style scoped></style>
