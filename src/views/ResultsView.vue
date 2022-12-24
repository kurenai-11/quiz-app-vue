<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Answer } from "./QuizView.vue";

const router = useRouter();
const { answers } = defineProps<{ answers: Answer[] }>();
let correctAnswers = 0;
for (const answer of answers) {
  answer.answeredOption === answer.correctOption && correctAnswers++;
}
</script>
<template>
  <div>
    <div class="info-container">
      <div class="info">
        There were
        <span class="correct-answers">{{ correctAnswers }}</span> correct
        answer/answers out of
        <span class="questions-number">{{ answers.length }}</span> questions.
      </div>
      <button @click="router.push('/')">Go back?</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/theme";
.correct-answers,
.questions-number {
  font-weight: bold;
  color: adjust-hue($color: $color-accent, $degrees: 180);
}
.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.info {
  text-align: center;
  font-size: 20px;
}

button {
  margin-top: 10px;
}
</style>
