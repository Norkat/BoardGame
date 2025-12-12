<template>
  <v-card class="pa-6" elevation="6">
    <h2 class="text-h6 mb-4">Editar Juego de Mesa</h2>

    <!-- Form for editing board game information -->
    <v-form @submit.prevent="submitForm" ref="formRef">
      <!-- Game ID (read-only) -->
      <v-text-field v-model="form.id" label="ID" disabled />

      <!-- Game name (read-only) -->
      <v-text-field v-model="form.name" label="Nombre" disabled />

      <!-- Publisher field -->
      <v-text-field
        v-model="form.publisher"
        label="Publisher"
        :counter="60"
        required
      />

      <!-- Description field -->
      <v-textarea
        v-model="form.description"
        label="Descripción"
        :counter="200"
        auto-grow
      />

      <!-- Category dropdown -->
      <v-select
        v-model="form.category"
        :items="categoryOptions"
        label="Categoría"
        item-title="label"
        item-value="value"
        required
      />

      <!-- Year field -->
      <v-text-field
        v-model="form.year"
        label="Año"
        type="number"
        :counter="4"
      />

      <!-- Submit button -->
      <v-btn type="submit" color="primary" class="mt-4" block>
        Guardar Cambios
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBoardgamesStore } from "@/stores/boardgames";
import { categories } from "@/utils/categories";

// Initialize store and route composables
const boardgames = useBoardgamesStore();
const route = useRoute();

/**
 * Reference to the v-form component instance.
 * Used to interact with validation or programmatic behaviors.
 * @type {import('vue').Ref<HTMLElement|null>}
 */
const formRef = ref(null);

/**
 * Reactive object containing the form fields.
 * Represents the editable state of the selected board game.
 * @type {import('vue').Ref<{
 *   id: string,
 *   name: string,
 *   publisher: string,
 *   description: string,
 *   category: string|null,
 *   year: string|number
 * }>}
 */
const form = ref({
  id: "",
  name: "",
  publisher: "",
  description: "",
  category: null,
  year: "",
});

/**
 * List of category options derived from the categories object.
 * Used to populate the category select input.
 * @type {Array<{ value: string, label: string }>}
 */
const categoryOptions = Object.entries(categories).map(([value, label]) => ({
  value,
  label,
}));

/**
 * Lifecycle hook executed once the component is mounted.
 * Fetches the game data based on the route ID and assigns it to the form state.
 */
onMounted(async () => {
  await boardgames.fetchById(route.params.id);

  // Map the fetched game data into the form fields if available
  if (boardgames.current) {
    form.value = {
      id: boardgames.current.id,
      name: boardgames.current.name,
      publisher: boardgames.current.publisher,
      description: boardgames.current.description,
      // Converted to string for v-select compatibility
      category: String(boardgames.current.category),
      year: boardgames.current.year,
    };
  }
});

/**
 * Handles the form submission and triggers a store update.
 * Only editable fields are included in the update payload.
 * @async
 * @returns {Promise<void>}
 */
const submitForm = async () => {
  const id = route.params.id;

  // Extract only editable fields to update
  const data = {
    publisher: form.value.publisher,
    description: form.value.description,
    category: form.value.category,
    year: form.value.year,
  };

  await boardgames.update(id, data);
};
</script>

<style scoped></style>
