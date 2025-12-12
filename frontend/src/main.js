/**
 * Entry point of the Vue application.
 * Initializes and mounts the root app with Pinia, Vue Router, and Vuetify.
 */

import { createApp } from "vue"; // Creates a new Vue application instance
import App from "./App.vue"; // Root Vue component
import router from "./router"; // Application router instance
import { createPinia } from "pinia"; // Pinia store manager

import "vuetify/styles"; // Global Vuetify styles
import { createVuetify } from "vuetify"; // Creates a Vuetify instance
import * as components from "vuetify/components"; // Vuetify UI components
import * as directives from "vuetify/directives"; // Vuetify directives

import "@mdi/font/css/materialdesignicons.css"; // Icon set used by Vuetify

/** Pinia store instance */
const pinia = createPinia();

/**
 * Vuetify instance configured with all components and directives.
 */
const vuetify = createVuetify({
  components,
  directives,
});

// Creates the Vue app, registers Pinia, Router, and Vuetify, and mounts it to the DOM
createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
