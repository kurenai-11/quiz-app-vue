<script setup lang="ts">
import { ref } from "vue";
import type { QuizQuestion } from "./HomeView.vue";
const emit = defineEmits<{ (e: "answer", answeredPoint: number): void }>();
const { question } = defineProps<{ question?: QuizQuestion }>();
const chosenPoint = ref(-1);
const submitHandler = () => {
  if (chosenPoint.value === -1) {
    return;
  }
  emit("answer", chosenPoint.value);
  chosenPoint.value = -1;
};
</script>
<template>
  <div v-if="question" class="question-container">
    <div class="question-text">{{ question.text }}</div>
    <div class="options-container">
      <ul>
        <li v-for="option of question.options" :key="option.id">
          <div
            class="option-circle"
            :class="chosenPoint !== -1 && chosenPoint === option.id && 'chosen'"
            @click="chosenPoint = option.id"
          ></div>
          <span>{{ option.text }}</span>
        </li>
        <button @click="submitHandler" class="submit-button">
          Submit answer
        </button>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/theme";
.question-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  .question-text {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .options-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ul {
    padding: 0;
    button {
      margin-top: 10px;
      font-size: inherit;
      color: inherit;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      list-style: none;
      .option-circle {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: lighten($color: $color-background, $amount: 10);
        border: 3px solid lighten($color: $color-background, $amount: 20);
        transition: background-color 100ms;
        &.chosen {
          background-color: lighten($color: $color-background, $amount: 50);
        }
      }
    }
  }
}
</style>
