<template>
  <header class="relative w-full h-full">
    <div class="absolute top-28px left-0">
      <Weather />
    </div>

    <div
      class="absolute top-12px left-1/2 -translate-x-1/2 flex items-center gap-8px"
    >
      <img class="w-114px h-40px" src="@image/logo.svg" alt="" />
      <span
        class="text-46px tracking-3px font-400 font-pmzd bg-gradient-to-b from-white via-[#e6f7ff] to-[#cff1ff] bg-clip-text text-transparent"
      >
        标题
      </span>
    </div>

    <div class="absolute top-28px right-0">
      <CurrentTime />
    </div>
  </header>
</template>

<script setup lang="ts">
import CurrentTime from "./CurrentTime.vue";
import Weather from "./Weather.vue";
</script>
