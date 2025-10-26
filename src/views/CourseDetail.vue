<template>
  <div v-if="course">
    <h2>{{ course.title }}</h2>
    <p>{{ course.description }}</p>

    <div v-if="auth.user && auth.user.is_student">
      <button v-if="!enrolled" @click="enroll">Записаться на курс</button>
      <button v-else @click="unenroll">Отписаться от курса</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../store/auth";
import { getCourseDetail, enrollCourse, unenrollCourse } from "../api/courses";

const route = useRoute();
const course = ref(null);
const enrolled = ref(false);
const auth = useAuthStore();

onMounted(async () => {
  const { data } = await getCourseDetail(route.params.id);
  course.value = data;

  if (auth.user && auth.user.is_student) {
    const res = await fetch(`http://127.0.0.1:8000/api/courses/${route.params.id}/enroll/`, {
      headers: { Authorization: `Bearer ${auth.access}` },
    });
    const json = await res.json();
    enrolled.value = json.enrolled;
  }
});

async function enroll() {
  await enrollCourse(route.params.id);
  enrolled.value = true;
}

async function unenroll() {
  await unenrollCourse(route.params.id);
  enrolled.value = false;
}
</script>

<style scoped>
button {
  background: #0077cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
</style>