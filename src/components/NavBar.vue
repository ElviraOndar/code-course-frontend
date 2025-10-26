<template>
  <nav class="navbar">
    <div class="logo">Учебная платформа CodeCourse</div>
    <div class="links">
      <router-link to="/">Главная</router-link>
      <router-link to="/my-courses" v-if="auth.user">Мои курсы</router-link>
      <router-link to="/token" v-if="auth.user">Мой токен</router-link>
      <router-link to="/login" v-if="!auth.user">Войти</router-link>
      <button v-if="auth.user" @click="logout">Выйти</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
const auth = useAuthStore();

function logout() {
  auth.logout();
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2d3e50;
  color: white;
  padding: 1rem 2rem;
}
.links {
  display: flex;
  gap: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>