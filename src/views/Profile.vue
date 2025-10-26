<template>
  <div class="profile">
    <h2 v-if="auth.user">
      Добро пожаловать, {{ auth.user.first_name }} {{ auth.user.last_name }}!
    </h2>

    <div class="links">
      <router-link to="/my-courses">Мои курсы</router-link>
      <br /><br />
      <router-link to="/token">Мой токен авторизации</router-link>
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();
const loading = ref(false);
const error = ref(null);

async function fetchUser() {
  loading.value = true;
  error.value = null;
  try {
    await auth.fetchUser(); // загрузка данных пользователя
  } catch (err) {
    console.error("Ошибка при загрузке профиля:", err);
    error.value = "Не удалось загрузить данные профиля.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUser);
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.links {
  margin-top: 1.5rem;
}

a {
  color: #0077cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

<!-- <template>
  <div class="profile">
    <h1>Мои курсы</h1>
    <router-link to="/my-courses">Перейти к списку курсов</router-link>
    <br /><br />
    <router-link to="/token">Мой токен авторизации</router-link>
  </div>
</template> -->