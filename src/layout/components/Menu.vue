<template>
  <div class="flex items-center gap-12px">
    <div
      class="text-50px font-pmzd"
      v-for="(item, index) in menus"
      :key="index"
      @click="goPage(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const path = computed(() => route.path);

interface Menu {
  path: string;
  name: string;
}

const menus = ref<Menu[]>([
  {
    path: "/dashboard",
    name: "首页",
  },
]);

const goPage = (menu: Menu) => {
  if (menu.path === path.value) return;
  router.replace(menu.path);
};
</script>
