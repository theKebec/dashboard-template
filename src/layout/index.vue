<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </Layout>
</template>

<script setup>
import Layout from "./components/Layout.vue";
</script>
