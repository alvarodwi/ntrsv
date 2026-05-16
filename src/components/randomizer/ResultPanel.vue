<script setup lang="ts">
import { useLaneSync } from "@/composables/useLaneSync";

const lane = useLaneSync();
</script>

<template>
    <section class="flex h-full flex-col gap-4 rounded border p-4 items-center justify-center">

    <!-- EMPTY STATE -->
    <div v-if="!lane.selected.value" class="text-center text-slate-500">
      Hit Randomize
    </div>

    <!-- RESULT STATE -->
    <div
      v-else
      class="flex w-full max-w-xl flex-col items-center gap-6 text-center"
    >
      <!-- ───────────────────── -->
      <!-- Song Info -->
      <!-- ───────────────────── -->
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">
          {{ lane.selected.value?.song.title }}
        </h1>

        <p class="text-sm text-slate-400">
          {{ lane.selected.value?.song.artists.join(", ") }}
          |
          {{ lane.selected.value?.song.album.name }}
        </p>
      </div>

      <!-- ───────────────────── -->
      <!-- Difficulty Grid -->
      <!-- ───────────────────── -->
      <div class="grid w-full grid-cols-4 gap-3">
        <div
          v-for="(rating, diff) in lane.selected.value?.song.maps"
          :key="diff"
          class="flex flex-col items-center gap-2 rounded border p-3"
          :class="
            diff === lane.selected.value?.difficulty
              ? 'border-amber-600 bg-amber-600 text-white'
              : 'border-slate'
          "
        >
          <div class="text-sm opacity-70">
            {{ diff }}
          </div>

          <div class="text-3xl font-bold">
            {{ rating }}
          </div>

          <div class="text-xs">
            {{ diff === lane.selected.value?.difficulty ? "selected" : "" }}
          </div>
        </div>
      </div>
    </div>
    </section>
</template>
