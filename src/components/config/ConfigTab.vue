<script setup lang="ts">
import SongsPreviewPanel from '@/components/config/SongPreviewPanel.vue'
import SongsUploadPanel from '@/components/config/SongUploadPanel.vue'
</script>

<template>
  <div class="flex h-full flex-col gap-5">
    <!-- header -->
    <div class="flex flex-col gap-1">
      <div class="text-purple text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
        Configuration
      </div>

      <h1 class="text-charcoal text-3xl font-black dark:text-white">Song Database</h1>

      <p class="text-charcoal/60 max-w-xl text-sm leading-relaxed dark:text-white/60">
        Upload, preview, and manage your local song data used by the randomizer.
      </p>
    </div>

    <!-- panels -->
    <div class="grid flex-1 grid-cols-1 gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <!-- upload -->
      <SongsUploadPanel />
      <!-- preview -->
      <SongsPreviewPanel />
    </div>
  </div>
</template>
