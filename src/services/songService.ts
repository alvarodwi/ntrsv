import type { Song } from '@/types/song'

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

export async function loadSongs(): Promise<Song[]> {
    const res = await fetch('/songs.json')
    const raw = await res.json()
    const usedIds = new Set<string>()

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