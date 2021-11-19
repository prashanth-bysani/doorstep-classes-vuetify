import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { isAuthRequired: false }
  },
  {
    path: "/admin/addstudents",
    name: "AddStudents",
    component: () => import("@/views/admin/AddStudentsData.vue"),
    meta: { isAuthRequired: true }
  },
  {
    path: "/admin/addquestion",
    name: "AddQuestions",
    component: () => import("@/views/admin/practice/AddQuestions.vue"),
    meta: { isAuthRequired: true }
  },
  {
    path: "/master/classes",
    name: "ClassMaster",
    component: () => import("@/views/master/ClassMaster.vue"),
    meta: { isAuthRequired: true }
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { isAuthRequired: false }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
