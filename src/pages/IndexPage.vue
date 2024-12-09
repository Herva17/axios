<template>
  <div v-for="utilisateur in mes_users" :key="utilisateur.id" class="q-mt-lg shadow-10">
    {{ utilisateur.username }}
  </div>
  <div>

  </div>
</template>

<script setup>
import { useUserStore } from "src/stores/userStore";
import { computed, onMounted } from "vue";

const useS = useUserStore();
const mes_users = computed(() => useS.getuser);
onMounted(() => {
  useS.fetchUsers().then();
});
</script>

<style lang="scss" scoped></style>
