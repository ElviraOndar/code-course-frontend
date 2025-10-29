<template>
  <div id="app">
    <Navbar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
#app {
  font-family: "Inter", sans-serif;
  background-color: #fafafa;
  color: #333;
  min-height: 100vh;
}

main {
  padding: 2rem;
}
</style>
