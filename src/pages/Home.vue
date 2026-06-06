<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'

import ConfigTab from '@/components/config/ConfigTab.vue'
import RandomizerTab from '@/components/randomizer/RandomizerTab.vue'
import { useThemeStore } from '@/stores/themes'

const activeTab = ref<'randomizer' | 'config'>('randomizer')

function openLaneCover() {
  const width = 640
  const height = 160

  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + 84

  window.open(
    import.meta.env.BASE_URL + '#/lane',
    'lane-cover',
    `width=${width},height=${height},left=${left},top=${top}`,
  )
}

const version = __APP_VERSION__
const theme = useThemeStore()
</script>

<template>
  <div class="bg-cream dark:bg-charcoal relative flex min-h-dvh flex-col overflow-hidden">
    <motion.div
      :animate="{
        x: [0, 18, -10, 0],
        y: [0, -10, 6, 0],
        scale: [1, 1.08, 1],
        opacity: [0.24, 0.34, 0.24],
      }"
      :transition="{
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      }"
      class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_65%,#f4cb8f_0%,transparent_72%)]"
    />

    <button
      class="bg-charcoal/90 dark:text-charcoal fixed right-4 bottom-4 z-100 rounded-xl p-2 text-white shadow-lg backdrop-blur-md transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] md:p-4 dark:bg-white/90 dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
      @click="theme.toggleTheme()"
    >
      <div v-if="theme.theme === 'light'" class="i-ph-sun text-lg" />
      <div v-else class="i-ph-moon text-lg" />
    </button>

    <header class="font-display relative z-20">
      <div
        class="absolute top-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-4 md:flex"
      >
        <h1 class="sr-only">NIKKE Tracing the Stars Random Selector (NTRSV)</h1>

        <button
          class="border-purple/20 bg-purple/10 text-charcoal hover:bg-purple/20 hover:border-purple/40 rounded-full border px-5 py-2 text-sm font-semibold tracking-wide uppercase backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5 dark:text-white/75"
          @click="openLaneCover"
        >
          Use Lane Cover
        </button>

        <div
          class="border-charcoal/5 dark:bg-charcoal/60 flex items-center gap-2 rounded-full border bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-white/8 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        >
          <button
            class="rounded-full px-5 py-2 text-sm tracking-wide uppercase transition-all duration-150"
            :class="
              activeTab === 'randomizer'
                ? 'bg-gold text-charcoal dark:bg-gold/40 shadow-sm dark:text-white'
                : `text-charcoal/50 hover:bg-gold/20 hover:text-charcoal dark:hover:bg-gold/15 dark:text-white/45 dark:hover:text-white`
            "
            @click="activeTab = 'randomizer'"
          >
            Randomizer
          </button>

          <button
            class="rounded-full px-5 py-2 text-sm tracking-wide uppercase transition-all duration-150"
            :class="
              activeTab === 'config'
                ? 'bg-purple/20 text-charcoal dark:bg-purple:40 shadow-sm dark:text-white'
                : 'text-charcoal/50 hover:bg-purple/10 hover:text-purple dark:hover:bg-purple/15 dark:text-white/45 dark:hover:text-white'
            "
            @click="activeTab = 'config'"
          >
            Config
          </button>
        </div>
      </div>

      <div
        class="border-charcoal/5 dark:bg-charcoal/55 flex w-full flex-col items-center border-b bg-white/30 py-4 backdrop-blur-md md:hidden dark:border-white/8"
      >
        <h1 class="text-charcoal text-xl font-bold tracking-[0.2em] uppercase dark:text-white">
          NTRSV
        </h1>

        <p class="text-charcoal/60 mt-1 text-center text-sm leading-relaxed dark:text-white/55">
          Nikke Tracing the Stars <br />
          Random Selector <span class="text-purple">v1.2.0</span>
        </p>
      </div>
    </header>
    <main class="font-ui relative z-10 flex flex-1 items-center justify-center px-6 py-6 md:py-24">
      <div
        class="border-charcoal/8 dark:bg-charcoal/55 w-full max-w-6xl rounded-[28px] border bg-white/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-8 dark:border-white/8 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.35)]"
      >
        <RandomizerTab v-if="activeTab === 'randomizer'" />
        <ConfigTab v-else />
      </div>
    </main>
    <footer class="font-display relative z-10">
      <div
        class="text-charcoal/35 flex flex-wrap items-center justify-center gap-2 pb-6 text-center text-xs dark:text-white/35"
      >
        <span>Nikke Tracing the Stars Random Selector v{{ version }}</span>
      </div>
    </footer>
  </div>
</template>
