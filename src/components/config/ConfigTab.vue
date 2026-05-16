<script setup lang="ts">
import SongsPreviewPanel from "@/components/config/SongPreviewPanel.vue";
import SongsUploadPanel from "@/components/config/SongUploadPanel.vue";
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="grid flex-1 grid-cols-1 gap-4 overflow-auto lg:grid-cols-2">
      <SongsUploadPanel />
      <SongsPreviewPanel />
    </div>
  </div>
</template>
