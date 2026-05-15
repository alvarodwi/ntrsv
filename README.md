```
# ntrsv
[n]ikke [t]racing the stars [r]andom [s]elector [v]?
a rhythm game randomizer for nikke minigame, tracing the stars

---

## about
vibe coded using some unused claude session

inspired by:
https://github.com/wowvv0w/djmax-random-selector-v
aka dmsrv (should be obvious where this project name come from)

---

## current state
this is currently just a barebone randomizer.
no selector system yet, had to alt+tab randomizer and back to the game
(doubt nikke would allow external keyboard input anyway)

making a controller like input into another window would be a nightmare to code in jvm environment too,
not to mention the anti cheat protection (risk of flagged as macro)
so this project would likely to remain as barebone randomizer

---

## features (so far)
- song randomizer
- difficulty filtering
- tag filtering
- album filtering
- rating range filtering (1–19)

---

## song format
songs are loaded from:
src/main/composeResources/files/songs.json

structure is simple and it's easy to change it around too,
currently listing 35 songs that are available in game
[valid per 2026/05/16)

---

## running with jar
if you are using the prebuilt `.jar` from releases:
place your `songs.json` next to it:
folder/
├── ntrsv.jar
└── songs.json
external file will override the bundled one

---

## license
do whatever you want.
if it breaks, that’s expected
```
