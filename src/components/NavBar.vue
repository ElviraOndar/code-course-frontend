<template>
  <nav class="navbar">
    <div class="left">
      <router-link to="/" class="logo">CodeCourse</router-link>
      <router-link to="/" class="link">Главная</router-link>
      <!-- Ссылка на профиль, если пользователь авторизован -->
      <router-link v-if="auth.user" to="/profile" class="link">Мой профиль</router-link>
    </div>
   

    <div class="right">
      <span v-if="auth.user" class="welcome">
        Добро пожаловать, {{ auth.user.first_name }} {{ auth.user.last_name }}!
      </span>

      <router-link v-if="!auth.user" to="/login" class="link">Войти</router-link>
      <button v-else @click="auth.logout()" class="logout-button">Выйти</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #0077cc;
  color: white;
  border-radius: 0 0 10px 10px;
}

.navbar .left,
.navbar .right {
  display: flex;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1.5rem;
  color: white;
  text-decoration: none;
}

.link {
  margin-right: 1rem;
  color: white;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.welcome {
  margin-right: 1rem;
}

.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}

.logout-button:hover {
  opacity: 0.9;
}
</style>