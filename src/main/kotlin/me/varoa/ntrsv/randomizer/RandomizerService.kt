package me.varoa.ntrsv.randomizer

import me.varoa.ntrsv.song.Album
import me.varoa.ntrsv.song.Difficulty
import me.varoa.ntrsv.song.Song

class RandomizerService {
    fun randomSong(
        songs: List<Song>,
        albums: Set<Album> = emptySet(),
        tags: Set<String> = emptySet(),
        difficulties: Set<Difficulty> = emptySet(),
        minDifficulty: Int = 1,
        maxDifficulty: Int = 19,
    ): Pair<Song, Difficulty>? {
        data class Candidate(val song: Song, val difficulty: Difficulty)

        val candidates = songs.flatMap { song ->
            val tagPass =
                tags.isEmpty() ||
                    tags.any { it in song.tags }

            val albumPass =
                albums.isEmpty() ||
                    song.album in albums

            if (!tagPass || !albumPass) return@flatMap emptyList()

            song.maps
                .filter { (difficulty, rating) ->
                    val diffPass = difficulties.isEmpty() || difficulty in difficulties
                    val ratingPass = rating in minDifficulty..maxDifficulty
                    diffPass && ratingPass
                }
                .map { (difficulty, _) -> Candidate(song, difficulty) }
        }

        if (candidates.isEmpty()) return null

        val picked = candidates.random()
        return picked.song to picked.difficulty
    }
}
