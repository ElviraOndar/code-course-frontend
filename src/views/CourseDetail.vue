<template>
  <div v-if="course" class="course-detail">
    <h2>{{ course.title }}</h2>
    <p>{{ course.description }}</p>
    <p><strong>Преподаватель:</strong> {{ course.teacher.first_name }} {{ course.teacher.last_name }}</p>
    <p><strong>Количество студентов:</strong> {{ course.num_students }}</p>

    <div v-if="auth.user && auth.user.is_student" class="enroll-buttons">
      <button v-if="!enrolled" @click="enroll">Записаться на курс</button>
      <button v-else @click="unenroll">Отписаться от курса</button>
    </div>

    <div v-if="course.lessons.length" class="lessons">
      <h3>Ближайшие занятия</h3>
      <ul>
        <li v-for="lesson in course.lessons" :key="lesson.id" class="lesson-item">
          <strong>{{ formatDate(lesson.start_time) }}</strong> — {{ lesson.title }} 
          ({{ lesson.teacher.first_name }} {{ lesson.teacher.last_name }})
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Ближайших занятий пока нет.</p>
    </div>
  </div>

  <div v-else>
    <p>Загрузка курса...</p>
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

function formatDate(datetime) {
  return new Date(datetime).toLocaleString();
}

onMounted(async () => {
  try {
    // Получаем данные курса
    const { data } = await getCourseDetail(route.params.id);
    course.value = data;

    // Проверяем, записан ли студент на курс
    if (auth.user && auth.user.is_student) {
      const res = await fetch(
        `http://127.0.0.1:8000/api/courses/${route.params.id}/enroll/`,
        {
          headers: { Authorization: `Bearer ${auth.access}` },
        }
      );
      const json = await res.json();
      enrolled.value = json.enrolled;
    }
  } catch (err) {
    console.error("Ошибка при загрузке курса:", err);
  }
});

async function enroll() {
  try {
    await enrollCourse(route.params.id);
    enrolled.value = true;
  } catch (err) {
    console.error("Ошибка при записи на курс:", err);
  }
}

async function unenroll() {
  try {
    await unenrollCourse(route.params.id);
    enrolled.value = false;
  } catch (err) {
    console.error("Ошибка при отписке от курса:", err);
  }
}
</script>

<style scoped>
.course-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.enroll-buttons {
  margin: 1rem 0;
}

button {
  background: #0077cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-right: 1rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.lessons {
  margin-top: 2rem;
}

.lesson-item {
  margin-bottom: 0.5rem;
}
</style>
