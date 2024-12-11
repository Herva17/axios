<template>
  <div>
    <!-- Affichage des utilisateurs -->
    <div
      v-for="utilisateur in mes_users"
      :key="utilisateur.id"
      class="q-mt-lg shadow-10"
    >
      nom :{{ utilisateur.username }} email :{{ utilisateur.email }}
    </div>

    <!-- Gestion des erreurs -->
    <div v-if="error" class="text-red">Erreur : {{ error }}</div>
  </div>
</template>

<script setup>
import { useUserStore } from "src/stores/userStore";
import { computed, onMounted } from "vue";

// Charger le store utilisateur
const useS = useUserStore();

// Définir les données
const mes_users = computed(() => useS.getuser); // Liste des utilisateurs depuis le store
const error = computed(() => useS.error); // Gestion des erreurs

// Récupérer les utilisateurs au montage du composant
onMounted(() => {
  useS.fetchUsers();
});
</script>

<style lang="scss" scoped></style>
