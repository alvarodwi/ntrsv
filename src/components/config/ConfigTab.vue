<script setup lang="ts">
import SongsPreviewPanel from '@/components/config/SongPreviewPanel.vue';
import SongsUploadPanel from '@/components/config/SongUploadPanel.vue';
</script>

<template>
    <div class="flex flex-col h-full gap-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-auto">
            <SongsUploadPanel />
            <SongsPreviewPanel />
        </div>
    </div>
</template>