package me.varoa.ntrsv.song

import kotlinx.serialization.Serializable
import java.util.*

@Serializable
data class Song(
    val id: String = UUID.randomUUID().toString(),
    val title: String,
    val artists: List<String>,
    val album: Album,
    val maps: Map<Difficulty, Int>,
    val sortNumber: Int,
    val tags: List<String>,
)
