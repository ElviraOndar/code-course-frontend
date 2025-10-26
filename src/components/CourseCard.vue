<template>
  <div class="course-card" @click="$router.push(`/courses/${course.id}`)">
    <h3>{{ course.title }}</h3>
    <p>{{ course.description.slice(0, 100) }}...</p>
  </div>
</template>

<script setup>
defineProps({
  course: Object
});
</script>

<style scoped>
.course-card {
  background: #f3f3f3;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.course-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>