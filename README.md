# mcfunction-lang syntax highlighter

A syntax highlighter and snippet package for Minecraft's function files

Supports 1.12 - 1.18

# Features:

- Items, Sounds, Enchantments, Biomes, Particles, Loot Tables, Objectives, Recipes, Effects, Entities, Blocks, Advancements, and Structures are kept up to date with the latest Minecraft snapshots.
- Improved Syntax highlighting
- Autocomplete for commands, selectors, and more
- Options to disable "minecraft:" in autocompletion.
- Version switching (from 1.12 - 1.18)!

# What's different about this mcfunction highlighter?

This package, forked from [Yurihaia/mcfunction](https://github.com/Bassab03/mcfunction), fixes many of the issues listed in it, adds more commands, items, entities, and has more suggestions, such as loot tables, sounds, and particles!

# Features I am planning to add:

- Suggestions for NBT tags and block states.
- Custom color picker for color-based nbt tags.
- Add item, block, and entity tags
- Reading the file system to get functions

# Common Issues
- x command is not working
  - Ensure you are using the correct version in the config
- the line is not being highlighted
  - Atom limits the number of characters per line that can be highlighted. You can install [this package](https://atom.io/packages/grammar-token-limit) to change this limit. This will affect performance.

# Issue Reporting
If you find an issue, no matter how small, please create an issue! There may be many things missing from the data files.

# Alternative packages:
- mcfunction-novum (A very good alternative, updated frequently)
