package me.varoa.ntrsv.song

import kotlinx.serialization.json.Json
import me.varoa.ntrsv.generated.resources.Res
import java.io.File

class SongRepository {
    private val json = Json {
        ignoreUnknownKeys = true
        prettyPrint = true
    }

    // Looks for songs.json next to the executable first,
    // then falls back to the bundled resource.
    suspend fun loadSongs(): List<Song> {
        val content = loadExternal() ?: loadBundled()
        return json.decodeFromString(content)
    }

    private fun loadExternal(): String? {
        val searchDir = when {
            // Native packager (dmg/msi/deb)
            System.getProperty("compose.application.resources.dir") != null ->
                File(System.getProperty("compose.application.resources.dir"))

            // Fat JAR — resolve relative to the jar file itself
            else -> runCatching {
                File(
                    SongRepository::class.java
                        .protectionDomain
                        .codeSource
                        .location
                        .toURI()
                ).parentFile
            }.getOrNull()
        } ?: return null

        return searchDir.resolve("songs.json")
            .takeIf { it.exists() }
            ?.readText()
    }

    private suspend fun loadBundled(): String {
        return Res.readBytes("files/songs.json").decodeToString()
    }
}
