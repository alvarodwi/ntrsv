<script setup lang="ts">
import { onMounted } from 'vue'

import { useThemeStore } from '@/stores/themes'

const theme = useThemeStore()

onMounted(() => {
  theme.initTheme()
})
</script>

<template>
  <router-view />
</template>
