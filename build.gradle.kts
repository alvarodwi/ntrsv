import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    kotlin("jvm")
    kotlin("plugin.serialization")

    id("org.jetbrains.compose")
    id("org.jetbrains.kotlin.plugin.compose")
    id("org.jetbrains.compose.hot-reload")

    id("org.jmailen.kotlinter")
}

group = "me.varoa"
version = "1.0.0"

compose.desktop {
    application {
        mainClass = "me.varoa.ntrsv.MainKt"
        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "ntrsv"
            packageVersion = "1.0.0"
        }
    }
}

repositories {
    google()
    mavenCentral()
}

dependencies {
    implementation(compose.desktop.currentOs)

    implementation(KotlinX.serialization.json)
    implementation("org.jetbrains.compose.material3:material3:_")
    implementation("org.jetbrains.compose.components:components-resources:_")
    implementation(KotlinX.coroutines.swing)
}

kotlinter {
    ignoreFormatFailures = true
    ignoreLintFailures = true
}

kotlin {
    jvmToolchain(21)
    sourceSets.main {
        kotlin.srcDir("build/generated/compose/resourceGenerator/kotlin")
    }
}
