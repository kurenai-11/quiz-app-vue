const QuizView = () => import("@/views/QuizView.vue");
const QuizQuestionView = () => import("@/views/QuizQuestionView.vue");
const HomeView = () => import("@/views/HomeView.vue");
const ResultsView = () => import("@/views/ResultsView.vue");
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quiz/:id",
      name: "quiz",
      component: QuizView,
      children: [
        {
          path: "result",
          name: "result",
          component: ResultsView,
        },
        {
          path: "q-:questionId(.*)",
          name: "question",
          component: QuizQuestionView,
        },
      ],
    },
  ],
});

export default router;
