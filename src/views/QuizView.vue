<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import q from "../data/data.json";
export type Answer = {
  questionId: number;
  answeredOption: number;
  correctOption: number;
};
const route = useRoute();
const router = useRouter();
const thisQuiz = q.find((val) => val.id === Number(route.params.id));
if (!thisQuiz) {
  router.push({ name: "home" });
}
const start = ref(route.params.questionId ? true : false);
const end = ref(false);
let currentQuestion = route.params.questionId
  ? Number(route.params.questionId)
  : 0;
const maxQuestion = thisQuiz?.questions.length;
const answers = ref<Answer[]>([]);
const startHandler = () => {
  start.value = true;
  router.push(`/quiz/${thisQuiz!.id}/q-${currentQuestion}`);
};
const answerHandler = (answeredPoint: number) => {
  answers.value.push({
    questionId: currentQuestion,
    answeredOption: answeredPoint - 1,
    correctOption:
      // find a correct value and then getting its id(which starts from 1)
      // so we substract it === index of the correct option
      (thisQuiz?.questions[currentQuestion].options.reduce((prev, cur) => {
        return prev.isCorrect === true ? prev : cur;
      }).id as number) - 1,
  });
  if (currentQuestion !== maxQuestion! - 1) {
    currentQuestion++;
    router.push(`/quiz/${thisQuiz!.id}/q-${currentQuestion}`);
  } else {
    end.value = true;
    router.push(`/quiz/${thisQuiz!.id}/result`);
  }
};
</script>
<template>
  <div class="quiz-container" v-if="thisQuiz">
    <h1 class="title">Quiz about {{ thisQuiz.name }}</h1>
    <button v-if="!start && !end" class="start" @click="startHandler">
      Start
    </button>
    <!-- quiz question view -->
    <router-view
      v-if="start && !end"
      @answer="answerHandler"
      :question="thisQuiz.questions[currentQuestion]"
    />
    <!-- results view -->
    <router-view v-if="end" :answers="answers" />
  </div>
</template>
<style scoped lang="scss">
@import "../assets/theme";
.quiz-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .start {
    margin-top: 5px;
  }
}
</style>
