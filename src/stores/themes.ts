import { defineStore } from 'pinia'

import { ref } from 'vue'
type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<Theme>('light')

    function applyTheme(value: Theme) {
        theme.value = value

        document.documentElement.classList.toggle(
            'dark',
            value === 'dark',
        )
        localStorage.setItem('theme', value)
    }

    function toggleTheme() {
        applyTheme(
            theme.value === 'dark'
                ? 'light'
                : 'dark',
        )
    }

    function initTheme() {
        const saved = localStorage.getItem('theme') as Theme | null
        if (saved) {
            applyTheme(saved)
            return
        }

        // optional system preference fallback
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches

        applyTheme(prefersDark ? 'dark' : 'light')
    }

    return {
        theme,
        toggleTheme,
        applyTheme,
        initTheme,
    }
})