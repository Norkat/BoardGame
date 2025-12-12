import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import BoardgamesListView from "@/views/BoardgamesListView.vue";
import BoardgameDetailView from "@/views/BoardgameDetailView.vue";
import BoardgameCreateView from "@/views/BoardgameCreateView.vue";
import BoardgameEditView from "@/views/BoardgameEditView.vue";

/**
 * Application route definitions for navigation between views.
 * Each route maps a URL path to a corresponding component.
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView, // Home page view
  },
  {
    path: "/boardgames",
    name: "boardgames-list",
    component: BoardgamesListView, // List of all board games
  },
  {
    path: "/boardgame/create",
    name: "boardgame-create",
    component: BoardgameCreateView, // Form for creating a new board game
  },
  {
    path: "/boardgame/:id",
    name: "boardgame-detail",
    component: BoardgameDetailView, // Details of a specific board game
    props: true, // Pass route params as component props
  },
  {
    path: "/boardgame/:id/edit",
    name: "boardgame-edit",
    component: BoardgameEditView, // Form for editing an existing board game
    props: true, // Pass route params as component props
  },
];

/**
 * Router instance using HTML5 history mode.
 * Handles client-side navigation for the app.
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
