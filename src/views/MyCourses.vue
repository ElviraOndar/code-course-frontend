<template>
  <div class="my-courses">
    <h2>Мои курсы</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="courses.length === 0">У вас пока нет курсов.</div>

    <div v-else class="course-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <h3 @click="$router.push(`/courses/${course.id}`)">{{ course.title }}</h3>
        <!-- Кнопка отписки видна только студентам -->
        <button 
          v-if="user?.is_student" 
          @click="unenroll(course.id)"
        >
          Отписаться от курса
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const courses = ref([]);
const loading = ref(true);
const error = ref(null);
const user = ref(null); // сюда сохраняем профиль пользователя

const accessToken = localStorage.getItem("access");

async function fetchUser() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/me/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Не удалось получить профиль пользователя");
    user.value = await res.json();
  } catch (err) {
    console.error(err);
  }
}

async function fetchMyCourses() {
  loading.value = true;
  error.value = null;
  try {
    await fetchUser(); // получаем профиль
    const response = await fetch("http://127.0.0.1:8000/api/courses/?mine=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    courses.value = await response.json();
  } catch (err) {
    console.error("Ошибка при загрузке курсов:", err);
    error.value = "Не удалось загрузить курсы.";
  } finally {
    loading.value = false;
  }
}

async function unenroll(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/enroll/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Ошибка отписки ${response.status}`);
    courses.value = courses.value.filter(c => c.id !== id);
  } catch (err) {
    console.error("Ошибка при отписке:", err);
    error.value = "Не удалось отписаться от курса.";
  }
}

onMounted(fetchMyCourses);
</script>

<style scoped>
.course-card {
  background: #f3f3f3;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
button {
  margin-top: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
</style>

<!-- <template>
  <div class="my-courses">
    <h2>Мои курсы</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="courses.length === 0">У вас пока нет курсов.</div>
    <div v-else class="course-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <h3 @click="$router.push(`/courses/${course.id}`)">{{ course.title }}</h3>
        <button @click="unenroll(course.id)">Отписаться от курса</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const courses = ref([]);
const loading = ref(true);

// Здесь нужно указать ваш JWT access токен
// Можно его взять из localStorage
const accessToken = localStorage.getItem("access");

async function fetchMyCourses() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/courses/?mine=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }

    const data = await response.json();
    console.log("Мои курсы через fetch:", data); // для дебага
    courses.value = data;
  } catch (err) {
    console.error("Ошибка при загрузке курсов:", err);
  } finally {
    loading.value = false;
  }
}

async function unenroll(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/enroll/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка отписки ${response.status}`);
    }

    courses.value = courses.value.filter(c => c.id !== id);
  } catch (err) {
    console.error("Ошибка при отписке:", err);
  }
}

onMounted(fetchMyCourses);
</script>

<style scoped>
.course-card {
  background: #f3f3f3;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
button {
  margin-top: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
</style> -->


<!-- <template>
  <div class="my-courses">
    <h2>Мои курсы</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="courses.length === 0">У вас пока нет курсов.</div>
    <div v-else class="course-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <h3 @click="$router.push(`/courses/${course.id}`)">{{ course.title }}</h3>
        <button v-if="isStudent" @click="unenroll(course.id)">Отписаться от курса</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMyCourses, unenrollCourse } from "../api/courses";
import { useAuthStore } from "../store/auth";

const courses = ref([]);
const loading = ref(true);
const auth = useAuthStore();

// Проверка роли
const isStudent = ref(false);

async function fetchCourses() {
  try {
    // Если профиль ещё не загружен, загружаем
    if (!auth.user) {
      await auth.fetchUser();  // <--- должно быть в auth store
    }
    isStudent.value = auth.user.is_student;

    // Получаем свои курсы
    const { data } = await getMyCourses();
    console.log("Мои курсы:", data);
    courses.value = data;
  } catch (err) {
    console.error("Ошибка при загрузке курсов:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCourses);

async function unenroll(id) {
  try {
    await unenrollCourse(id);
    courses.value = courses.value.filter(c => c.id !== id);
  } catch (err) {
    console.error("Ошибка при отписке:", err);
  }
}
</script>

<style scoped>
.course-card {
  background: #f3f3f3;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
button {
  margin-top: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  opacity: 0.9;
}
</style> -->