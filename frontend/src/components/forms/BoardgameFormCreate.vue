<template>
  <v-card class="pa-6" elevation="6">
    <h2 class="text-h6 mb-4">Agregar Juego de Mesa</h2>

    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field v-model="form.name" label="Nombre" :counter="80" required />

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

      <v-btn type="submit" color="primary" class="mt-4" block>Agregar</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useBoardgamesStore } from "@/stores/boardgames";
import { categories } from "@/utils/categories";

const boardgames = useBoardgamesStore();

const formRef = ref(null);

const form = ref({
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

const submitForm = async () => {
  await boardgames.create({ ...form.value });
};
</script>

<style scoped></style>
