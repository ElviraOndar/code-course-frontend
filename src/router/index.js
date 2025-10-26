import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import MyCourses from "../views/MyCourses.vue";
import CourseDetail from "../views/CourseDetail.vue";
import TokenPage from "../views/TokenPage.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-courses",
    name: "MyCourses",
    component: MyCourses,
    meta: { requiresAuth: true },
  },
  {
    path: "/courses/:id",
    name: "CourseDetail",
    component: CourseDetail,
  },
  {
    path: "/token",
    name: "TokenPage",
    component: TokenPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.access) {
    return { name: "Login" };
  }
});

export default router;