<template>
  <div>
    <!-- Tableau des utilisateurs -->
    <q-table :rows="mes_users" :columns="columns" row-key="id" flat bordered>
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          icon="edit"
          color="blue"
          @click="openEditUserModal(props.row)"
        />
        <q-btn
          flat
          icon="delete"
          color="red"
          @click="deleteUser(props.row.id)"
        />
      </template>
    </q-table>

    <!-- Bouton pour ouvrir le formulaire d'ajout -->
    <q-btn
      flat
      color="primary"
      icon="add"
      label="Ajouter un utilisateur"
      @click="openAddUserModal"
    />

    <!-- Modal pour ajouter ou modifier un utilisateur -->
    <q-dialog v-model="isUserModalOpen">
      <q-card>
        <q-card-section>
          <h3>
            {{
              isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"
            }}
          </h3>
          <q-input v-model="currentUser.username" label="Nom d'utilisateur" />
          <q-input v-model="currentUser.email" label="Email" />
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Annuler" @click="closeUserModal" />
          <q-btn
            flat
            :label="isEditing ? 'Modifier' : 'Ajouter'"
            color="primary"
            @click="submitUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Notification de succès -->
    <q-notify v-model="notification.message" :color="notification.color" />
  </div>
</template>
<script setup>
import { useUserStore } from "src/stores/userStore";
import { computed, ref, onMounted } from "vue";

const useS = useUserStore();

// Récupération des utilisateurs depuis le store
const mes_users = computed(() => useS.getuser);

// États pour le formulaire et les notifications
const isUserModalOpen = ref(false);
const isEditing = ref(false);
const currentUser = ref({ id: null, username: "", email: "" });
const notification = ref({ message: "", color: "" });

// Charger les utilisateurs au montage du composant
onMounted(() => {
  useS.fetchUsers();
});

// Ouvrir le modal pour ajouter un utilisateur
const openAddUserModal = () => {
  isEditing.value = false;
  currentUser.value = { id: null, username: "", email: "" };
  isUserModalOpen.value = true;
};

// Ouvrir le modal pour modifier un utilisateur
const openEditUserModal = (user) => {
  isEditing.value = true;
  currentUser.value = { ...user };
  isUserModalOpen.value = true;
};

// Fermer le modal
const closeUserModal = () => {
  isUserModalOpen.value = false;
};

// Ajouter ou modifier un utilisateur
const submitUser = async () => {
  if (isEditing.value) {
    await useS.updateUser(currentUser.value.id, {
      username: currentUser.value.username,
      email: currentUser.value.email,
    });
    notification.value = {
      message: "Utilisateur modifié avec succès.",
      color: "blue",
    };
  } else {
    await useS.addUser({
      username: currentUser.value.username,
      email: currentUser.value.email,
    });
    notification.value = {
      message: "Utilisateur ajouté avec succès.",
      color: "green",
    };
  }
  isUserModalOpen.value = false;
  setTimeout(() => {
    notification.value.message = ""; // Réinitialise la notification
  }, 3000);
};

// Supprimer un utilisateur
const deleteUser = async (id) => {
  await useS.deleteUser(id);
  notification.value = {
    message: "Utilisateur supprimé avec succès.",
    color: "red",
  };
  setTimeout(() => {
    notification.value.message = ""; // Réinitialise la notification
  }, 3000);
};

// Colonnes pour le tableau
const columns = [
  { name: "id", label: "ID", align: "left", field: "id" },
  { name: "username", label: "USERS", align: "left", field: "username" },
  { name: "email", label: "EMAIL", align: "left", field: "email" },
  { name: "actions", label: "Actions", align: "center", field: "actions" },
];
</script>
<style lang="scss" scoped>
.q-table {
  margin: 20px 0;
}
</style>
