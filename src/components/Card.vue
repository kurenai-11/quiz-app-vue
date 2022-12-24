<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Quiz } from "../views/HomeView.vue";

const { quiz } = defineProps<{ quiz: Quiz }>();
const router = useRouter();
</script>

<template>
  <div class="card" @click="router.push(`/quiz/${quiz.id}`)">
    <img :src="quiz.img" alt="" />
    <div class="card-text">
      <h2>{{ quiz.name }}</h2>
      <p>{{ quiz.questions.length }} questions</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/theme";
.card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 250px;
  padding: 10px;
  border-radius: 10px;
  $card-background-color: lighten(
    $color:
      saturate(
        $color: $color-background,
        $amount: 40,
      ),
    $amount: 10,
  );
  background-color: $card-background-color;
  transition: background-color 100ms;
  &:hover {
    background-color: saturate(
      $color: lighten($color: $card-background-color, $amount: 10),
      $amount: 10
    );
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .card-text {
    text-align: center;
  }
}
</style>
