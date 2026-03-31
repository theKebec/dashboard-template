<template>
  <div class="relative w-full h-full">
    <header class="absolute top-0 w-full h-110px">
      <Header />
    </header>

    <main class="absolute top-110px bottom-0 w-full overflow-hidden">
      <slot />
    </main>

    <footer class="absolute bottom-6 left-1/2 -translate-x-1/2">
      <Menu />
    </footer>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Menu from "./Menu.vue";
</script>

<style lang="scss" scoped></style>
