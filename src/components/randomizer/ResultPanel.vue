<script setup lang="ts">
import { useLaneSync } from '@/composables/useLaneSync';
import { useRandomizerStore } from '@/stores/randomizerStore'


const lane = useLaneSync()
</script>

<template>
    <div class="h-full flex items-center justify-center p-4">
        <!-- EMPTY STATE -->
        <div v-if="!lane.selected" class="text-center text-slate-500">
            Hit Randomize
        </div>

        <!-- RESULT STATE -->
        <div v-else class="w-full max-w-xl flex flex-col items-center gap-6 text-center">
            <!-- ───────────────────── -->
            <!-- Song Info -->
            <!-- ───────────────────── -->
            <div class="flex flex-col gap-1">
                <h1 class="text-2xl font-bold">
                    {{ lane.selected.value?.song.title }}
                </h1>

                <p class="text-sm text-slate-400">
                    {{ lane.selected.value?.song.artists.join(', ') }}
                    |
                    {{ lane.selected.value?.song.album.name }}
                </p>
            </div>

            <!-- ───────────────────── -->
            <!-- Difficulty Grid -->
            <!-- ───────────────────── -->
            <div class="grid grid-cols-4 gap-3 w-full">
                <div v-for="(rating, diff) in lane.selected.value?.song.maps" :key="diff"
                    class="border rounded p-3 flex flex-col items-center gap-2"
                    :class="diff === lane.selected.value?.difficulty ? 'border-blue-400' : 'border-slate-700'">
                    <div class="text-sm opacity-70">
                        {{ diff }}
                    </div>

                    <div class="text-3xl font-bold">
                        {{ rating }}
                    </div>

                    <div class="text-xs">
                        {{ diff === lane.selected.value?.difficulty ? 'selected' : '' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>