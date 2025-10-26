<template>
  <div class="home">
    <h1>Все курсы</h1>
    <div class="courses">
      <div
        v-for="course in courses"
        :key="course.id"
        class="course-card"
        @click="$router.push(`/courses/${course.id}`)"
      >
        <h3>{{ course.title }}</h3>
        <p>{{ course.description.slice(0, 100) }}...</p>
      </div>
    </div>

    <div class="footer">
      <p>
        Хочешь записаться на новый курс? Свяжись с нами —
        <a href="http://127.0.0.1:8000/contacts/">оставь заявку</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const courses = ref([]);

onMounted(async () => {
  const { data } = await api.get("courses/");
  courses.value = data;
});
</script>

<style scoped>
.home {
  padding: 2rem;
}
.courses {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}
.course-card {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;
}
.course-card:hover {
  transform: translateY(-3px);
}
.footer {
  margin-top: 2rem;
  text-align: center;
}
</style>