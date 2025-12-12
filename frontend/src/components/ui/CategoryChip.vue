<template>
  <!-- Chip displaying a category label with a color based on its type -->
  <v-chip
    :color="chipColor"
    class="text-white font-weight-medium"
    size="small"
    label
  >
    {{ categoryLabel }}
  </v-chip>
</template>

<script setup>
import { computed } from "vue";
import { categories } from "@/utils/categories";

/**
 * Component props.
 * @property {string|number} category - Category ID associated with the chip.
 */
const props = defineProps({
  category: {
    type: [String, Number],
    required: true,
  },
});

/**
 * Computes the visible text for the category chip.
 * Falls back to "Unknown" if the category ID does not exist.
 */
const categoryLabel = computed(() => categories[props.category] || "Unknown");

/**
 * Computes the chip color based on predefined mappings for each category.
 * Defaults to grey when the category does not match any defined ID.
 */
const chipColor = computed(() => {
  const colors = {
    11: "deep-purple", // Adventure
    12: "indigo", // Puzzle
    13: "green", // Strategy
    14: "pink", // Fantasy
    15: "orange", // Civilization
  };
  return colors[props.category] || "grey";
});
</script>

<style scoped></style>
