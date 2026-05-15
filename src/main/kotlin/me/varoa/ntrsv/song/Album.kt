package me.varoa.ntrsv.song

import kotlinx.serialization.Serializable

@Serializable
data class Album(
    val name: String,
    val code: String,
)
