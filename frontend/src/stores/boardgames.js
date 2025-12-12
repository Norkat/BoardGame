import { defineStore } from "pinia";
import { ref } from "vue";
import { useNotificationStore } from "./notification";

/**
 * Store for managing board game data, including CRUD operations
 * and communication with the backend API.
 */
export const useBoardgamesStore = defineStore("boardgames", () => {
  const notification = useNotificationStore(); // Notification system

  /** @type {import('vue').Ref<Array>} List of all board games */
  const list = ref([]);

  /** @type {import('vue').Ref<Object|null>} Currently selected board game */
  const current = ref(null);

  /** @type {import('vue').Ref<boolean>} Loading state for async operations */
  const loading = ref(false);

  /** Base URL of the backend API */
  const API = "http://localhost:3001";

  /**
   * Fetches all board games from the backend and updates the store list.
   * Displays an error notification if the request fails.
   * @returns {Promise<void>}
   */
  const fetchAll = async () => {
    loading.value = true;
    try {
      const res = await fetch(`${API}/boardgame`);
      const json = await res.json();
      list.value = json.data || [];
    } catch (err) {
      notification.notify("Error al cargar juegos", "error");
    }
    loading.value = false;
  };

  /**
   * Fetches a single board game by its ID and stores it as the current item.
   * Displays an error notification if the request fails.
   * @param {number|string} id - Identifier of the board game.
   * @returns {Promise<void>}
   */
  const fetchById = async (id) => {
    try {
      const res = await fetch(`${API}/boardgame/${id}`);
      const json = await res.json();
      current.value = json.data || null;
    } catch (err) {
      notification.notify("Error al cargar juego", "error");
    }
  };

  /**
   * Creates a new board game record using backend API.
   * Converts category and year to numbers before sending.
   * Displays success or error notifications depending on the result.
   * @param {Object} data - Board game data to be created.
   * @returns {Promise<void>}
   */
  const create = async (data) => {
    data.category = Number(data.category);
    data.year = Number(data.year);
    try {
      const res = await fetch(`${API}/boardgame`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      await fetchAll();
      notification.notify("Juego agregado correctamente");
    } catch (err) {
      notification.notify("Error al agregar juego", "error");
    }
  };

  /**
   * Updates an existing board game record in the backend.
   * Displays success or error notifications depending on the result.
   * @param {number|string} id - Board game ID.
   * @param {Object} data - Updated board game data.
   * @returns {Promise<void>}
   */
  const update = async (id, data) => {
    data.category = Number(data.category);
    data.year = Number(data.year);
    try {
      const res = await fetch(`${API}/boardgame/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      await fetchAll();
      notification.notify("Juego actualizado correctamente");
    } catch (err) {
      notification.notify("Error al actualizar juego", "error");
    }
  };

  /**
   * Deletes a board game by its ID from the backend.
   * Displays success or error notifications depending on the result.
   * @param {number|string} id - Board game ID to delete.
   * @returns {Promise<void>}
   */
  const remove = async (id) => {
    try {
      const res = await fetch(`${API}/boardgame/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      await fetchAll();
      notification.notify("Juego eliminado");
    } catch (err) {
      notification.notify("Error al eliminar juego", "error");
    }
  };

  return {
    list,
    current,
    loading,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
});
