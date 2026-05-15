package me.varoa.ntrsv

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import me.varoa.ntrsv.randomizer.RandomizerService
import me.varoa.ntrsv.song.Album
import me.varoa.ntrsv.song.Difficulty
import me.varoa.ntrsv.song.Song
import me.varoa.ntrsv.song.SongRepository
import kotlin.math.roundToInt

@OptIn(ExperimentalFoundationApi::class, ExperimentalMaterial3Api::class)
@Composable
fun App() {
    val repository = remember { SongRepository() }
    val randomizer = remember { RandomizerService() }

    var songs by remember { mutableStateOf<List<Song>>(emptyList()) }

    LaunchedEffect(Unit) {
        songs = repository.loadSongs()
    }

    val allTags = remember(songs) {
        songs.flatMap { it.tags }.distinct().sorted()
    }

    val allAlbums = remember(songs) {
        songs.map { it.album }.distinctBy { it.code }.sortedBy { it.name }
    }

    var selectedSong by remember { mutableStateOf<Song?>(null) }
    var selectedDifficulty by remember { mutableStateOf<Difficulty?>(null) }
    var selectedTags by remember { mutableStateOf(setOf<String>()) }
    var selectedAlbums by remember { mutableStateOf(setOf<Album>()) }
    var selectedDifficulties by remember { mutableStateOf(setOf<Difficulty>()) }
    var minRating by remember { mutableIntStateOf(1) }
    var maxRating by remember { mutableIntStateOf(19) }

    MaterialTheme(
        typography = Typography(
            headlineSmall = MaterialTheme.typography.headlineSmall.copy(fontSize = 18.sp),
            titleLarge = MaterialTheme.typography.titleLarge.copy(fontSize = 15.sp),
            bodyMedium = MaterialTheme.typography.bodyMedium.copy(fontSize = 12.sp),
            bodySmall = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            labelMedium = MaterialTheme.typography.labelMedium.copy(fontSize = 11.sp),
            labelLarge = MaterialTheme.typography.labelLarge.copy(fontSize = 12.sp),
            displaySmall = MaterialTheme.typography.displaySmall.copy(fontSize = 28.sp),
        )
    ) {
        Surface(modifier = Modifier.fillMaxSize()) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                // ── LEFT PANEL: Filters ──────────────────────────────────────
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                ) {
                    // Difficulty
                    FilterSection(title = "Difficulty") {
                        FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Difficulty.entries.forEach { difficulty ->
                                val selected = difficulty in selectedDifficulties
                                FilterChip(
                                    selected = selected,
                                    onClick = {
                                        selectedDifficulties = if (selected)
                                            selectedDifficulties - difficulty
                                        else
                                            selectedDifficulties + difficulty
                                    },
                                    label = { Text(difficulty.name) },
                                )
                            }
                        }
                    }

                    // Rating range slider
                    FilterSection(title = "Rating: $minRating – $maxRating") {
                        RangeSlider(
                            value = minRating.toFloat()..maxRating.toFloat(),
                            onValueChange = { range ->
                                minRating = range.start.roundToInt()
                                maxRating = range.endInclusive.roundToInt()
                            },
                            valueRange = 1f..19f,
                            steps = 17, // 19 values → 17 interior steps
                        )
                    }

                    // Tags
                    FilterSection(title = "Tags") {
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp),
                        ) {
                            allTags.forEach { tag ->
                                val selected = tag in selectedTags
                                FilterChip(
                                    selected = selected,
                                    onClick = {
                                        selectedTags = if (selected)
                                            selectedTags - tag
                                        else
                                            selectedTags + tag
                                    },
                                    label = { Text(tag) },
                                )
                            }
                        }
                    }

                    // Albums
                    FilterSection(title = "Albums") {
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp),
                        ) {
                            allAlbums.forEach { album ->
                                val selected = album in selectedAlbums
                                TooltipArea(
                                    tooltip = {
                                        Surface(tonalElevation = 4.dp) {
                                            Text(
                                                text = album.name,
                                                modifier = Modifier.padding(6.dp),
                                            )
                                        }
                                    },
                                    delayMillis = 300,
                                    tooltipPlacement = TooltipPlacement.CursorPoint(),
                                ) {
                                    FilterChip(
                                        selected = selected,
                                        onClick = {
                                            selectedAlbums = if (selected)
                                                selectedAlbums - album
                                            else
                                                selectedAlbums + album
                                        },
                                        label = { Text(album.code) },
                                    )
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.weight(1f))

                    Button(
                        onClick = {
                            val result = randomizer.randomSong(
                                songs = songs,
                                albums = selectedAlbums,
                                tags = selectedTags,
                                difficulties = selectedDifficulties,
                                minDifficulty = minRating,
                                maxDifficulty = maxRating,
                            )
                            selectedSong = result?.first
                            selectedDifficulty = result?.second
                        },
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        Text("Randomize")
                    }
                }

                // ── RIGHT PANEL: Result ──────────────────────────────────────
                Surface(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight(),
                    shape = MaterialTheme.shapes.medium,
                    tonalElevation = 1.dp,
                ) {
                    if (selectedSong == null) {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center,
                        ) {
                            Text(
                                text = "Hit Randomize to pick a song",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    } else {
                        SongResultPanel(
                            song = selectedSong!!,
                            pickedDifficulty = selectedDifficulty,
                        )
                    }
                }
            }
        }
    }
}

// ── Filter section wrapper ───────────────────────────────────────────────────

@Composable
private fun FilterSection(
    title: String,
    content: @Composable ColumnScope.() -> Unit,
) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(text = title, style = MaterialTheme.typography.labelMedium)
        content()
    }
}

// ── Result panel ─────────────────────────────────────────────────────────────

@Composable
private fun SongResultPanel(
    song: Song,
    pickedDifficulty: Difficulty?,
) {
    val pickedRating = pickedDifficulty?.let { song.maps[it] }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        // Title + artists
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = song.title,
                style = MaterialTheme.typography.headlineSmall,
            )
            Text(
                text = song.artists.joinToString(),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        HorizontalDivider()

        // Picked difficulty + rating (the big numbers)
        if (pickedDifficulty != null && pickedRating != null) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(24.dp),
                verticalAlignment = Alignment.Bottom,
            ) {
                Column {
                    Text(
                        text = pickedRating.toString(),
                        style = MaterialTheme.typography.displaySmall,
                    )
                    Text(
                        text = "/ 19",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                Column {
                    Text(
                        text = pickedDifficulty.name,
                        style = MaterialTheme.typography.titleLarge,
                    )
                    Text(
                        text = "selected difficulty",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            HorizontalDivider()
        }

        // Album + tags
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(6.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            AssistChip(
                onClick = {},
                label = { Text(song.album.code) },
            )
            song.tags.forEach { tag ->
                SuggestionChip(
                    onClick = {},
                    label = { Text(tag) },
                )
            }
        }

        HorizontalDivider()

        // All charts (informational)
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(
                text = "All charts",
                style = MaterialTheme.typography.labelMedium,
            )
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                song.maps.entries
                    .sortedBy { it.value }
                    .forEach { (difficulty, rating) ->
                        val isPickedChart = difficulty == pickedDifficulty
                        FilterChip(
                            selected = isPickedChart,
                            onClick = {},
                            enabled = false,
                            label = { Text("${difficulty.name} · $rating") },
                        )
                    }
            }
        }
    }
}
