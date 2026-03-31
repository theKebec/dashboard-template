<template>
  <div class="flex items-center gap-16px text-16px">
    <span v-if="icon">{{ icon }}</span>
    <span class="type">{{ weather }}</span>
    <span>广东</span>
    <span>湛江</span>
    <span class="temp">{{ temp }}℃</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface WeatherResponse {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

const weather = ref<string>("");
const temp = ref<string>("");
const icon = ref<string>("");

const weatherMap = {
  0: "晴",
  1: "少云",
  2: "多云",
  3: "阴",
  45: "雾",
  51: "小雨",
  61: "中雨",
  71: "小雪",
  95: "雷暴",
};

const weatherIconMap = {
  0: "☀️",
  1: "🌤",
  2: "⛅",
  3: "☁️",
  61: "🌧",
  71: "❄️",
  95: "⛈",
};

const getWeather = async (): Promise<void> => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=21.27&longitude=110.35&current_weather=true",
  );
  const data: WeatherResponse = await res.json();
  const current = data.current_weather;

  temp.value = Math.round(current.temperature).toString();

  weather.value = weatherMap?.[current.weathercode] ?? "未知";

  icon.value = weatherIconMap?.[current.weathercode] ?? "";
};

onMounted(() => {
  getWeather();
  setInterval(getWeather, 1000 * 60 * 30);
});
</script>
