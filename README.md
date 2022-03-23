# mcfunction-lang

A syntax highlighter and autocomplete package for Minecraft's function files

Supports 1.12 - **1.18.2**

## Installation Requirements
- This package may require Python to build certain dependencies.
  - Make sure that Python is installed and is available on your `PATH`.
    - If you open a command prompt and type in `python` or `python3` and it works, Python is probably installed.
    - See https://github.com/nodejs/node-gyp#on-windows

## Features:
- Syntax highlighting for `mcfunction` and `mcmeta` files
- Autocomplete for commands, selectors, and more
- Options to disable "minecraft:" in autocompletion.
- Version switching (from 1.12 - 1.18.2)!
- Updated data for:
  - Advancements
  - Biomes
  - Blocks
  - Effects
  - Enchantments
  - Entities
  - Game Rules
  - Items
  - Particles
  - Loot Tables
  - Recipes
  - Scoreboard objectives
  - Sounds
  - Structures
  - Tags

## What's different about this mcfunction highlighter?

This package, forked from [Yurihaia/mcfunction](https://github.com/Bassab03/mcfunction), fixes many of the issues listed in it, adds more commands, items, entities, and has more suggestions, such as loot tables, sounds, and particles!

## Common Issues
- x command is not working
  - Ensure you are using the correct version in the config
- the line is not being highlighted
  - Atom limits the number of characters per line that can be highlighted. You can install [this package](https://atom.io/packages/grammar-token-limit) to change this limit. This will affect performance.

## Issue Reporting
If you find an issue, no matter how small, please create an issue! There may be many things missing from the data files.

## Alternative packages:
- [mcfunction-novum](https://github.com/jan00bl/mcfunction-novum) (A very good alternative, updated frequently)
