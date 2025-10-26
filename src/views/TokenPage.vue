<template>
  <div class="token-page">
    <h2>Мой токен авторизации</h2>
    <p><b>Access Token:</b> {{ access }}</p>
    <p><b>Refresh Token:</b> {{ refresh }}</p>
    <button @click="refreshToken">Обновить токен</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import api from "../api/axios";

const auth = useAuthStore();
const access = auth.access;
const refresh = auth.refresh;

async function refreshToken() {
  const { data } = await api.post("token/refresh/", { refresh });
  auth.access = data.access;
  localStorage.setItem("access", data.access);
  alert("Токен обновлён!");
}
</script>