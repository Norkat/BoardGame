<template>
  <v-card class="pa-6" elevation="6">
    <h2 class="text-h6 mb-4">Editar Juego de Mesa</h2>

    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field v-model="form.id" label="ID" disabled />

      <v-text-field v-model="form.name" label="Nombre" disabled />

      <v-text-field
        v-model="form.publisher"
        label="Publisher"
        :counter="60"
        required
      />

      <v-textarea
        v-model="form.description"
        label="Descripción"
        :counter="200"
        auto-grow
      />

      <v-select
        v-model="form.category"
        :items="categoryOptions"
        label="Categoría"
        item-title="label"
        item-value="value"
        required
      />

      <v-text-field
        v-model="form.year"
        label="Año"
        type="number"
        :counter="4"
      />

      <v-btn type="submit" color="primary" class="mt-4" block
        >Guardar Cambios</v-btn
      >
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBoardgamesStore } from "@/stores/boardgames";
import { categories } from "@/utils/categories";

const boardgames = useBoardgamesStore();
const route = useRoute();

const formRef = ref(null);
const form = ref({
  id: "",
  name: "",
  publisher: "",
  description: "",
  category: null,
  year: "",
});

const categoryOptions = Object.entries(categories).map(([value, label]) => ({
  value,
  label,
}));

onMounted(async () => {
  await boardgames.fetchById(route.params.id);
  if (boardgames.current) {
    form.value = {
      id: boardgames.current.id,
      name: boardgames.current.name,
      publisher: boardgames.current.publisher,
      description: boardgames.current.description,
      category: String(boardgames.current.category),
      year: boardgames.current.year,
    };
  }
});

const submitForm = async () => {
  const id = route.params.id;
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
