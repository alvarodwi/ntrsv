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
        // Resolves to the directory containing the .jar / executable
        val externalFile = File(
            System.getProperty("compose.application.resources.dir")
                ?: System.getProperty("user.dir")
        ).resolve("songs.json")

        return if (externalFile.exists()) externalFile.readText() else null
    }

    private suspend fun loadBundled(): String {
        return Res.readBytes("files/songs.json").decodeToString()
    }
}
