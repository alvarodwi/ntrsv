<script setup lang="ts">
import { ref } from 'vue'
import RandomizerTab from '@/components/randomizer/RandomizerTab.vue'
import ConfigTab from '@/components/config/ConfigTab.vue'

const activeTab = ref<'randomizer' | 'config'>('randomizer')

function openLaneCover() {
  window.open(
    import.meta.env.BASE_URL + '#/lane',
    'lane-cover',
    'width=640,height=160'
  )
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- ───────────────────────────────────────────── -->
    <!-- Top Bar -->
    <!-- ───────────────────────────────────────────── -->
    <header class="relative flex items-center justify-center p-4">
      <!-- Desktop-only tab switcher -->
      <div class="hidden md:flex absolute left-4 gap-2">
        <button
          @click="activeTab = 'randomizer'"
        >
          Randomizer
        </button>

        <button
          @click="activeTab = 'config'"
        >
          Songs Config
        </button>
      </div>

      <!-- Always visible -->
      <div class="hidden md:block">
        <button
          @click="openLaneCover"
        >
          Open Lane Cover
        </button>
      </div>

      <!-- Mobile title -->
      <div class="md:hidden">
        <h1>
          ntrsv
        </h1>
      </div>
    </header>

    <!-- ───────────────────────────────────────────── -->
    <!-- Main Content -->
    <!-- ───────────────────────────────────────────── -->
    <main class="flex-1 flex items-center justify-center p-4">
      <!-- Card container -->
      <div class="w-full max-w-7xl">
        <!-- Mobile: randomizer only -->
        <RandomizerTab
          v-if="activeTab === 'randomizer'"
        />

        <!-- Desktop-only config -->
        <ConfigTab
          v-else
          class="hidden md:block"
        />
      </div>
    </main>
  </div>
</template>