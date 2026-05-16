<script setup lang="ts">
import SongsPreviewPanel from '@/components/config/SongPreviewPanel.vue';
import SongsUploadPanel from '@/components/config/SongUploadPanel.vue';
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-56px)] overflow-auto">
        <SongsUploadPanel />
        <SongsPreviewPanel />
    </div>
</template>