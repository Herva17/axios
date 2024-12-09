import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [], // Liste des utilisateurs
  }),
  getters: {
      getuser: (state) => state.users,
  },
  actions: {
    async fetchUsers() {
      // Réinitialiser les erreurs

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data; // Enregistrer les utilisateurs
      } catch (err) {
        this.error = "Impossible de récupérer les utilisateurs."; // Capturer l'erreur
      }
    },
  },
});
