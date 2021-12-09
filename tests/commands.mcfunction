advancement grant @s[a=b] everything
advancement grant @s from minecraft:adventure/adventuring_time
advancement grant @s only minecraft:adventure/adventuring_time
advancement revoke @p through minecraft:adventure/adventuring_time
advancement revoke @r until minecraft:adventure/adventuring_time
attribute @s minecraft:generic.armor get 1
attribute @s attribute base set 1
attribute @s attribute modifier value get uuid 1
attribute @s attribute modifier add uuid name 1
attribute @s attribute modifier remove uuid
bossbar add id ""
bossbar get id
bossbar set id color blue
bossbar set id color green
bossbar set id name ""
bossbar set id players @s
bossbar set id style notched_20
bossbar set id value 10
bossbar list
bossbar remove id
bossbar add id {"name":true}
bossbar get id
bossbar remove id
clear @s minecraft:acacia_bark 64
clone ~ ~ ~ ~ ~ ~ ~ ~ ~ filtered minecraft:diamond_block force
clone ~ ~ ~ ~ ~ ~ ~ ~ ~ masked move
clone ~ ~ ~ ~ ~ ~ ~ ~ ~ replace normal
data get block ~ ~ ~ path 1
data remove block ~ ~ ~ path
data get storage @s path 4
data merge block ~ ~ ~ {}
data modify entity @p targetPath append value value
data modify storage @s targetPath set from block ~ ~ ~ sourcePath
datapack enable name
datapack list
defaultgamemode creative
difficulty hard
effect clear @a minecraft:absorbtion
effect give @s minecraft:conduit_power 10 0 false
execute align xy rotated as @s in overworld positioned as @s anchored eyes facing entity @s eyes if entity @s if blocks ~ ~ ~ ~ ~ ~ ~ ~ ~ masked offset ~ ~ ~ store success block ~ ~ ~ path double 1 run experience query @s points
execute positioned ~ ~ ~ rotated ~ ~ run give @p diamond
experience add @s 1 points
fill ~ ~ ~ ~ ~ ~ minecraft:gold_block replace minecraft:nether_gold_ore
function name
forceload add ~ ~ ~ ~
forceload remove ~ ~
forceload query ~ ~
gamemode adventure @s
give @s minecraft:acacia_door 1
kill @s
locate Buried_Treasure
locatebiome minecraft:ocean
loot spawn ~ ~ ~ fish minecraft:blocks/<block> FisingLocation mainhand
loot replace block ~ ~ ~ slot fish minecraft:blocks/<block> FisingLocation mainhand
me hi
msg @s message
particle minecraft:ash ~ ~ ~ ~ ~ ~ 1 1 normal
playsound minecraft:ambient.underwater.loop.additions record @r ~ ~ ~ 1 0 0
recipe give @s minecraft:acacia_bark
recipe take @s minecraft:acacia_bark
replaceitem entity @s slot minecraft:acacia_bark
replaceitem block ~ ~ ~ slot minecraft:acacia_bark
say jo
scoreboard objectives add name air {}
scoreboard objectives setdisplay list objective
scoreboard objectives modify objective rendertype integer
scoreboard objectives modify objective displayname ""
scoreboard players test @s objective min max
schedule function function time
spreadplayers ~ ~ 0 0 true @a
spreadplayers ~ ~ 0 0 under 256 false @e
team add team ""
team join team @s
team leave @s
team modify team color aqua
team modify team prefix {}
tell @s hi
tellraw @s {}
time add 100
title @s[foo=0..,nbt={so:true, foo:{"bar":1b}},scores={hoo=0..},yes=ok] times 1 2 1
title @s subtitle ""
trigger objective set 1
teammsg message
teleport ~ ~ ~ ~ ~
weather clear 120000
worldborder center ~ ~
worldborder get
worldborder damage amount 0.5
worldborder warning distance 50
worldborder set 29000000 0
setblock ~ ~ ~ diamond_block[state=1,foo=north]
give @p diamond{nbtData:true}
setblock ~ ~ ~ chest[facing=north]{nbt:"yes"}
setblock ~ ~ ~ minecraft:chest[facing=north]{nbt:"yes"}
