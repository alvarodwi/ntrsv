package me.varoa.ntrsv

import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState

fun main(): Unit =
    application {
        Window(
            onCloseRequest = ::exitApplication,
            title = "ntrsv",
            state = rememberWindowState(
                width = 900.dp,
                height = 680.dp,
            ),
        ) {
            App()
        }
    }
