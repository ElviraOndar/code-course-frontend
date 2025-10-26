import { defineStore } from "pinia";
import api from "../api/axios";
import router from "../router"; // ← импорт роутера

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
  }),
  actions: {
    async login(username, password) {
      const { data } = await api.post("token/", { username, password });
      this.access = data.access;
      this.refresh = data.refresh;
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      await this.fetchUser();
    },
    async fetchUser() {
      const { data } = await api.get("me/");
      this.user = data;
    },
    logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;
      localStorage.clear();
      router.push("/"); // ← редирект на главную после выхода
    },
  },
});

// import { defineStore } from "pinia";
// import api from "../api/axios";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: null,
//     access: localStorage.getItem("access") || null,
//     refresh: localStorage.getItem("refresh") || null,
//   }),
//   actions: {
//     async login(username, password) {
//       const { data } = await api.post("token/", { username, password });
//       this.access = data.access;
//       this.refresh = data.refresh;
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       await this.fetchUser();
//     },
//     async fetchUser() {
//       const { data } = await api.get("me/");
//       this.user = data;
//     },
//     logout() {
//       this.user = null;
//       this.access = null;
//       this.refresh = null;
//       localStorage.clear();
//     },
//   },
// });