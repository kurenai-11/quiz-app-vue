<script setup lang="ts">
import Card from "../components/Card.vue";
import { ref, watch } from "vue";
import q from "../data/data.json";
export type Quiz = typeof q[0];
export type QuizQuestion = typeof q[0]["questions"][0];
export type QuizOption = typeof q[0]["questions"][0]["options"][0];

const quizzes = ref(q);
const search = ref("");
watch(search, () => {
  quizzes.value = q.filter((quiz) =>
    quiz.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
<template>
  <div class="container">
    <header>
      <h1>Quizzes</h1>
      <input type="text" v-model="search" />
    </header>
    <div class="options-container">
      <Card v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/theme";

h1 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 20px;
  .options-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 90%;
  }
}

input {
  text-align: center;
  background-color: lighten($color: $color-background, $amount: 10);
  font-size: inherit;
  outline: none;
  color: $color-text;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 20px;
}
</style>
