<template>
  <div class="flex gap-16px text-white text-16px">
    <span>{{ date }}</span>
    <span>{{ clock }}</span>
    <span>{{ week }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

const date = ref<string>("");
const clock = ref<string>("");
const week = ref<string>("");

let timer: ReturnType<typeof setInterval> | null = null;

const updateTime = (): void => {
  const now = dayjs();

  date.value = now.format("YYYY-MM-DD");
  clock.value = now.format("HH:mm:ss");
  week.value = now.format("dddd");
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>
