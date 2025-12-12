<template>
  <v-container class="mt-6" fluid>
    <h2 class="text-h6 mb-4">Lista de Juegos de Mesa</h2>

    <!-- Filtro por categoría -->
    <v-select
      v-model="selectedCategory"
      :items="categoryOptionsWithAll"
      label="Filtrar por categoría"
      item-title="label"
      item-value="value"
      class="mb-6"
    />

    <!-- Grid de tarjetas -->
    <v-row>
      <v-col
        v-for="game in filteredList"
        :key="game.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
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

const boardgames = useBoardgamesStore();

const selectedCategory = ref("all");

const categoryOptionsWithAll = [
  { value: "all", label: "Todas" },
  ...Object.entries(categories).map(([value, label]) => ({ value, label })),
];

onMounted(() => {
  boardgames.fetchAll();
});

const filteredList = computed(() => {
  if (selectedCategory.value === "all") return boardgames.list;
  return boardgames.list.filter(
    (g) => String(g.category) === String(selectedCategory.value)
  );
});
</script>

<style scoped></style>
