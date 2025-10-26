import api from "./axios";

export const getCourses = () => api.get("courses/");

export const getMyCourses = () => api.get("courses/?mine=true");

export const getCourseDetail = (id) => api.get(`courses/${id}/`);

export const enrollCourse = (id) => api.post(`courses/${id}/enroll/`);

export const unenrollCourse = (id) => api.delete(`courses/${id}/enroll/`);