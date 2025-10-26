import { defineStore } from "pinia";
import api from "../api/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async fetchProfile() {
      const { data } = await api.get("me/");
      this.profile = data;
    },
  },
});