<template>
  <v-card class="pa-6" elevation="6">
    <h2 class="text-h6 mb-4">Agregar Juego de Mesa</h2>

    <!-- Form for creating a new board game -->
    <v-form @submit.prevent="submitForm" ref="formRef">
      <!-- Game name input -->
      <v-text-field v-model="form.name" label="Nombre" :counter="80" required />

      <!-- Publisher input -->
      <v-text-field
        v-model="form.publisher"
        label="Publisher"
        :counter="60"
        required
      />

      <!-- Description textarea -->
      <v-textarea
        v-model="form.description"
        label="Descripción"
        :counter="200"
        auto-grow
      />

      <!-- Category selector -->
      <v-select
        v-model="form.category"
        :items="categoryOptions"
        label="Categoría"
        item-title="label"
        item-value="value"
        required
      />

      <!-- Year input -->
      <v-text-field
        v-model="form.year"
        label="Año"
        type="number"
        :counter="4"
      />

      <!-- Submit button -->
      <v-btn type="submit" color="primary" class="mt-4" block>Agregar</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useBoardgamesStore } from "@/stores/boardgames";
import { categories } from "@/utils/categories";

// Access the boardgames store for CRUD actions
const boardgames = useBoardgamesStore();

/**
 * Reference to the form element or component.
 * Can be used for manual validation or resetting the form.
 * @type {import('vue').Ref<HTMLElement|null>}
 */
const formRef = ref(null);

/**
 * Reactive object containing the fields for creating a new game.
 * @type {import('vue').Ref<{
 *   name: string,
 *   publisher: string,
 *   description: string,
 *   category: string|null,
 *   year: string|number
 * }>}
 */
const form = ref({
  name: "",
  publisher: "",
  description: "",
  category: null,
  year: "",
});

/**
 * Converts the categories constant into an array of select options.
 * Each category becomes an object with `value` and `label` keys.
 * @type {Array<{ value: string, label: string }>}
 */
const categoryOptions = Object.entries(categories).map(([value, label]) => ({
  value,
  label,
}));

/**
 * Handles submission of the creation form.
 * Sends a new game object to the boardgames store.
 * @async
 * @returns {Promise<void>}
 */
const submitForm = async () => {
  // Spread the reactive form into a new plain object
  await boardgames.create({ ...form.value });
};
</script>

<style scoped></style>
