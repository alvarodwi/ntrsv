<script setup lang="ts">
import { useThemeStore } from "@/stores/themes";
import { onMounted } from "vue";

const theme = useThemeStore();

onMounted(() => {
  theme.initTheme();
});
</script>

<template>
  <router-view />
</template>
