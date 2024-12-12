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
        const response = await axios.get("http://localhost:8082/api/user.php");
        this.users = response.data; // Met à jour les utilisateurs dans le store
      } catch (err) {
        this.error = "Impossible de récupérer les utilisateurs."; // Gestion des erreurs
        console.error(err);
      }
    },
    async addUser(user) {
      try {
        const response = await axios.post(
          "http://localhost:8082/api/user.php",
          user
        );
        if (response.data.success) {
          this.users.push(response.data.user); // Ajoute l'utilisateur à la liste
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", err);
      }
    },
    async updateUser(id, updatedData) {
      try {
        const response = await axios.put(
          `http://localhost:8082/api/user.php?id=${id}`,
          updatedData
        );
        if (response.data.success) {
          // Met à jour l'utilisateur dans la liste
          const index = this.users.findIndex((user) => user.id === id);
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedData };
          }
        }
      } catch (err) {
        console.error("Erreur lors de la modification de l'utilisateur:", err);
      }
    },
    async deleteUser(id) {
      try {
        const response = await axios.delete(
          `http://localhost:8082/api/user.php?id=${id}`
        );
        if (response.data.success) {
          // Supprime l'utilisateur de la liste
          this.users = this.users.filter((user) => user.id !== id);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur:", err);
      }
    },
  },
});
