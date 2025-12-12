import { defineStore } from "pinia";
import { ref } from "vue";
import { useNotificationStore } from "./notification";

/**
 * Store for managing user favorite board games.
 * Handles fetching, adding, and removing favorites from the backend API.
 */
export const useFavoritesStore = defineStore("favorites", () => {
  const notification = useNotificationStore(); // Notification handler

  /** List of favorites already normalized */
  const list = ref([]);

  /** Loading state */
  const loading = ref(false);

  /** Backend base URL */
  const API = "http://localhost:3001";

  /**
   * Convert backend Sequelize flat format into a clean object
   * Example input:
   * {
   *   id: 17,
   *   idBoardgame: 3,
   *   "boardgame.name": "Catan",
   *   "boardgame.publisher": "Devir",
   *   "boardgame.category": 15,
   *   "boardgame.year": 1995
   * }
   *
   * Returns:
   * {
   *   id: 17,
   *   boardgameId: 3,
   *   game: {
   *     name: "Catan",
   *     publisher: "Devir",
   *     category: 15,
   *     year: 1995
   *   }
   * }
   */
  const normalizeFavorite = (raw) => {
    return {
      id: raw.id,
      boardgameId: raw.idBoardgame,
      game: {
        name: raw["boardgame.name"],
        publisher: raw["boardgame.publisher"],
        category: raw["boardgame.category"],
        year: raw["boardgame.year"],
      },
    };
  };

  /**
   * Fetch favorites from backend
   */
  const fetchFavorites = async () => {
    loading.value = true;

    try {
      const res = await fetch(`${API}/favorites`);
      const json = await res.json();

      if (!res.ok) {
        notification.notify(json.error || "Error al cargar favoritos", "error");
        loading.value = false;
        return;
      }

      // Normalize items
      list.value = json.data.map(normalizeFavorite);
    } catch (err) {
      notification.notify("Error de conexión al cargar favoritos", "error");
    }

    loading.value = false;
  };

  /**
   * Check if a boardgame is marked as favorite
   */
  const isFavorite = (boardgameId) => {
    return list.value.some((f) => f.boardgameId === boardgameId);
  };

  /**
   * Add to favorites
   */
  const add = async (boardgameId) => {
    try {
      const res = await fetch(`${API}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idBoardgame: boardgameId }),
      });

      const data = await res.json();

      if (!res.ok) {
        notification.notify(
          data.error || "Error al agregar a favoritos",
          "error"
        );
        return;
      }

      await fetchFavorites();
      notification.notify("Agregado a favoritos");
    } catch (err) {
      notification.notify("Error al agregar a favoritos", "error");
    }
  };

  /**
   * Remove a favorite by its favorite ID
   */
  const remove = async (id) => {
    try {
      const res = await fetch(`${API}/favorites/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        notification.notify(
          data.error || "Error al eliminar favorito",
          "error"
        );
        return;
      }

      await fetchFavorites();
      notification.notify("Eliminado de favoritos");
    } catch (err) {
      notification.notify("Error al eliminar favorito", "error");
    }
  };

  return { list, loading, fetchFavorites, add, remove, isFavorite };
});
