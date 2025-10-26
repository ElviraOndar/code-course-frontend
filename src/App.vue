<template>
  <div id="app">
    <!-- Навигационная панель -->
    <Navbar />

    <!-- Основной контент страниц -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
/* Общие стили для App */
#app {
  font-family: "Inter", sans-serif;
  background-color: #fafafa;
  color: #333;
  min-height: 100vh;
}

/* Контент страницы */
main {
  padding: 2rem;
}
</style>
