<template>
  <VScaleScreen width="1920" height="1080">
    <div id="container">
      <router-view />
    </div>
  </VScaleScreen>
</template>

<script setup lang="ts">
import VScaleScreen from "v-scale-screen";
</script>

<style lang="scss">
html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

html {
  background-color: black;
  color: white;
  font-size: 100px;
}

#container {
  width: 1920px;
  height: 1080px;
}
</style>
