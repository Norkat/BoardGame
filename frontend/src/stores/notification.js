import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Store for managing global UI notifications.
 * Controls message text, color style, and visibility state.
 */
export const useNotificationStore = defineStore("notification", () => {
  /** @type {import('vue').Ref<boolean>} Whether the notification is visible */
  const show = ref(false);

  /** @type {import('vue').Ref<string>} Notification color (e.g., 'success', 'error') */
  const color = ref("success");

  /** @type {import('vue').Ref<string>} Notification message text */
  const message = ref("");

  /**
   * Displays a notification with a message and optional type.
   * Automatically hides the notification after 2500 ms.
   * @param {string} msg - Text to be shown in the notification.
   * @param {string} [type='success'] - Visual style category for the notification.
   */
  const notify = (msg, type = "success") => {
    message.value = msg;
    color.value = type;
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 2500);
  };

  return { show, color, message, notify };
});
