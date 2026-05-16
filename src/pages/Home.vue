<script setup lang="ts">
import { ref } from 'vue'
import RandomizerTab from '@/components/randomizer/RandomizerTab.vue'
import ConfigTab from '@/components/config/ConfigTab.vue'

const activeTab = ref<'randomizer' | 'config'>('randomizer')

function openLaneCover() {
  window.open(
    '/lane',
    'lane-cover',
    'width=640,height=160'
  )
}
</script>

<template>
  <div class="p-4 h-screen">
    <div class="flex gap-2 mb-4">
      <button @click="activeTab = 'randomizer'">
        Randomizer
      </button>

      <button @click="activeTab = 'config'">
        Songs Config
      </button>
    </div>

    <div>
      <button class="bg-slate-700 text-white p-2 rounded" @click="openLaneCover">
        Open Lane Cover
      </button>
    </div>

    <RandomizerTab v-if="activeTab === 'randomizer'" />
    <ConfigTab v-else />
  </div>
</template>