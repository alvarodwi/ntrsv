import type { Song } from '@/types/song'

const CUSTOM_SONGS_KEY = 'ntrsv-songs-json-override'

function slugify(value: string): string {
    return value
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function generateSongId(song: any, usedIds: Set<string>): string {
    const titleSlug = slugify(String(song.title ?? ''))
    if (!titleSlug) {
        const fallback = crypto.randomUUID()
        usedIds.add(fallback)
        return fallback
    }

    let id = titleSlug
    if (usedIds.has(id)) {
        const artist = Array.isArray(song.artists)
            ? song.artists[0]
            : song.artists ?? ''
        const artistSlug = slugify(String(artist)) || 'artist'
        id = `${titleSlug}-${artistSlug}`
        let suffix = 1

        while (usedIds.has(id)) {
            id = `${titleSlug}-${artistSlug}-${suffix}`
            suffix += 1
        }
    }

    usedIds.add(id)
    return id
}

function normalizeSongs(raw: any): Song[] {
    const usedIds = new Set<string>()

    if (!Array.isArray(raw)) {
        throw new Error('Song data must be an array.')
    }

    return raw.map((song: any) => {
        const id = typeof song.id === 'string' && song.id && !usedIds.has(song.id)
            ? song.id
            : generateSongId(song, usedIds)

        return {
            ...song,
            id,
        }
    })
}

function loadCustomSongData(): any[] | null {
    if (typeof window === 'undefined') return null

    const raw = window.localStorage.getItem(CUSTOM_SONGS_KEY)
    if (!raw) return null

    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : null
    } catch {
        return null
    }
}

export function hasCustomSongs(): boolean {
    return typeof window !== 'undefined' && window.localStorage.getItem(CUSTOM_SONGS_KEY) !== null
}

export async function loadSongs(): Promise<Song[]> {
    const override = loadCustomSongData()
    if (override) {
        return normalizeSongs(override)
    }

    const res = await fetch(import.meta.env.BASE_URL + 'songs.json')
    const raw = await res.json()
    return normalizeSongs(raw)
}

export async function loadSongsFromFile(file: File): Promise<Song[]> {
    const text = await file.text()
    const raw = JSON.parse(text)

    if (!Array.isArray(raw)) {
        throw new Error('Uploaded JSON must be an array of songs.')
    }

    saveCustomSongs(raw)
    return normalizeSongs(raw)
}

export function saveCustomSongs(raw: any[]): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(CUSTOM_SONGS_KEY, JSON.stringify(raw))
}

export function clearCustomSongs(): void {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(CUSTOM_SONGS_KEY)
}
