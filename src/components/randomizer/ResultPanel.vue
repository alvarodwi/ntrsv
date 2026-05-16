<script setup lang="ts">
import { computed } from 'vue'
import { useRandomizerStore } from '@/stores/randomizerStore'
import { useLaneSync } from '@/composables/useLaneSync'


const randomizer = useRandomizerStore()
const selected = computed(() => randomizer.selected)

useLaneSync(selected)
</script>

<template>

    <div class="w-1/2 p-4 border rounded overflow-auto">
        <div v-if="!randomizer.selected">
            Hit Randomize
        </div>

        <div v-else>
            <h1 class="text-xl">{{ randomizer.selected.song.title }}</h1>
            <p>{{ randomizer.selected.song.artists.join(', ') }}</p>
            <p>
                {{ randomizer.selected.difficulty }}
                · {{ randomizer.selected.song.maps[randomizer.selected.difficulty] }}
            </p>
        </div>
    </div>

</template>