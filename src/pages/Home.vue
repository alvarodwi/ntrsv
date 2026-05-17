<script setup lang="ts">
import { ref } from "vue";
import RandomizerTab from "@/components/randomizer/RandomizerTab.vue";
import ConfigTab from "@/components/config/ConfigTab.vue";

const activeTab = ref<"randomizer" | "config">("randomizer");

function openLaneCover() {
  window.open(
    import.meta.env.BASE_URL + "#/lane",
    "lane-cover",
    "width=640,height=160",
  );
}

const version = __APP_VERSION__;
</script>

<template>
  <div class="bg-cream relative min-h-screen overflow-hidden">
    <!-- background -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#fde28b_0%,transparent_70%)] opacity-40"
    />

    <div class="relative z-10 flex min-h-screen flex-col">
      <header class="font-display relative z-20">
        <!-- desktop -->
        <div
          class="absolute top-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-4 md:flex"
        >
          <!-- lane cover -->
          <button
            class="border-purple/20 bg-purple/10 text-charcoal hover:bg-purple/20 hover:border-purple/40 rounded-full border px-5 py-2 text-sm font-semibold tracking-wide uppercase backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5"
            @click="openLaneCover"
          >
            Use Lane Cover
          </button>

          <!-- nav -->
          <div
            class="border-charcoal/5 flex items-center gap-2 rounded-full border bg-white/70 p-1 shadow-sm backdrop-blur-md"
          >
            <!-- randomizer -->
            <button
              class="rounded-full px-5 py-2 text-sm tracking-wide uppercase transition-all duration-150"
              :class="
                activeTab === 'randomizer'
                  ? 'bg-gold text-charcoal shadow-sm'
                  : 'text-charcoal/50 hover:bg-gold/20 hover:text-charcoal'
              "
              @click="activeTab = 'randomizer'"
            >
              Randomizer
            </button>

            <!-- config -->
            <button
              class="rounded-full px-5 py-2 text-sm tracking-wide uppercase transition-all duration-150"
              :class="
                activeTab === 'config'
                  ? 'bg-purple/20 text-charcoal shadow-sm'
                  : 'text-charcoal/50 hover:bg-purple/10 hover:text-purple'
              "
              @click="activeTab = 'config'"
            >
              Config
            </button>
          </div>
        </div>

        <!-- mobile -->
        <div
          class="border-charcoal/5 flex w-full flex-col items-center border-b bg-white/30 py-4 backdrop-blur-md md:hidden"
        >
          <h1 class="text-charcoal text-xl font-bold tracking-[0.2em]">
            ntrsv
          </h1>

          <p class="text-charcoal/60 mt-1 text-center text-sm leading-relaxed">
            [n]ikke [t]racing the stars <br />
            [r]andom [s]elector
            <span class="text-purple">[v]</span>
          </p>
        </div>
      </header>
      <main class="font-ui flex flex-1 items-center justify-center px-6 py-6 md:py-24">
        <div
          class="border-charcoal/8 w-full max-w-6xl rounded-[28px] border bg-white/55 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-8"
        >
          <RandomizerTab v-if="activeTab === 'randomizer'" />
          <ConfigTab v-else class="hidden md:block" />
        </div>
      </main>
      <footer class="text-charcoal/35 pb-6 text-center text-xs">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span
            >[n]ikke [t]racing the stars [r]andom [s]elector [v{{
              version
            }}]</span
          >
        </div>
      </footer>
    </div>
  </div>
</template>
