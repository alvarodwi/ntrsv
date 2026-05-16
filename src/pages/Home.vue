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
</script>

<template>
  <div class="font-ui flex min-h-screen flex-col">
    <!-- Always visible -->
    <div class="mx-auto hidden w-1/2 md:block">
      <button class="w-full underline" @click="openLaneCover">
        Open Lane Cover
      </button>
    </div>
    <!-- ───────────────────────────────────────────── -->
    <!-- Top Bar -->
    <!-- ───────────────────────────────────────────── -->
    <header class="flex gap-0">
      <!-- Desktop-only tab switcher -->
      <div class="left-4 hidden flex-col md:flex w-[12vw] gap-2">
        <button
          class="bg-orange w-full p-2 text-left"
          @click="activeTab = 'randomizer'"
        >
          Randomizer
        </button>

        <button
          class="bg-orange w-full p-2 text-left"
          @click="activeTab = 'config'"
        >
          Config
        </button>
      </div>

      <!-- Mobile title -->
      <div class="text-center md:hidden">
        <h1>ntrsv</h1>
        <p class="text-sm opacity-70">
          [n]ikke [t]racing the stars <br />[r]andom [s]elector
          <span class="underline">[v]</span>
        </p>
      </div>
    </header>

    <!-- ───────────────────────────────────────────── -->
    <!-- Main Content -->
    <!-- ───────────────────────────────────────────── -->
    <main class="flex flex-1 items-center justify-center p-4">
      <!-- Card container -->
      <div class="w-full max-w-7xl">
        <!-- Mobile: randomizer only -->
        <RandomizerTab v-if="activeTab === 'randomizer'" />

        <!-- Desktop-only config -->
        <ConfigTab v-else class="hidden md:block" />
      </div>
    </main>
  </div>
</template>
