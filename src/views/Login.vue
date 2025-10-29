<template>
  <div class="login">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Имя пользователя:</label>
        <input v-model="username" required />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref(null);

const auth = useAuthStore();
const router = useRouter();

async function handleLogin() {
  error.value = null; 
  try {
    await auth.login(username.value, password.value);
    // После успешного логина перенаправляем на профиль
    router.push("/profile");
  } catch (err) {
    // Если DRF вернул ошибку авторизации
    if (err.response && err.response.data.detail) {
      error.value = err.response.data.detail;
    } else {
      error.value = "Произошла ошибка при авторизации";
    }
    console.error(err);
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
form div {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background: #0077cc;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>