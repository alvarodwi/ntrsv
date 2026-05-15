package me.varoa.ntrsv.song

import kotlinx.serialization.Serializable

@Serializable
enum class Difficulty {
    CASUAL,
    NORMAL,
    HARD,
    EXPERT,
}
