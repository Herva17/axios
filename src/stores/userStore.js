import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [], // Liste des utilisateurs
  }),
  getters: {
    getuser: (state) => state.users, // Retourne la liste des utilisateurs
  },
  actions: {
    async fetchUsers() {
      try {
        // Appel API pour récupérer les utilisateurs
        const response = await axios.get("http://localhost:8082/api/user.php");
        this.users = response.data; // Met à jour les utilisateurs dans le store
      } catch (err) {
        this.error = "Impossible de récupérer les utilisateurs."; // Gestion des erreurs
        console.error(err);
      }
    },
  },
});
