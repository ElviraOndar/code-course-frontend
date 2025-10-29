import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import MyCourses from "../views/MyCourses.vue";
import CourseDetail from "../views/CourseDetail.vue";
import TokenPage from "../views/TokenPage.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Главная | CodeCourse" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Вход | CodeCourse" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true, title: "Мой профиль | CodeCourse" },
  },
  {
    path: "/my-courses",
    name: "MyCourses",
    component: MyCourses,
    meta: { requiresAuth: true, title: "Мои курсы | CodeCourse" },
  },
  {
    path: "/courses/:id",
    name: "CourseDetail",
    component: CourseDetail,
    meta: { title: "Детали курса | CodeCourse" },
  },
  {
    path: "/token",
    name: "TokenPage",
    component: TokenPage,
    meta: { requiresAuth: true, title: "Токен | CodeCourse" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Проверка авторизации
router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.access) {
    return { name: "Login" };
  }
});

// Меняем title после перехода
router.afterEach((to) => {
  const defaultTitle = "CodeCourse";
  document.title = to.meta.title || defaultTitle;
});

export default router;