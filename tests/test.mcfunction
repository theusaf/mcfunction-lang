tellraw @a {"text":"example"}
tag @p add fooa
data merge block ~ ~ ~ {foo:"bar"}
data modify block ~ ~ ~ my.path[0]."to modify" insert 0 from block ~ ~ ~ my.path[0]."to get"
replaceitem entity @p slot.container.10 minecraft:iron_nugget
forceload add ~ ~ ~ ~
forceload remove ~ ~ ~ ~
forceload query ~ ~
spectate @p @a
data get storage foo yeet
data get block ~ ~ ~ my.path[0]."name"
data merge storage source {}
data remove storage source my.path[0]."name"
data modify block ~ ~ ~ my.path[0]."to modify" set from storage source my.path[0]."to get"
data modify entity @p my.path[0]."to modify" insert 0 from storage source my.path[0]."to get"
execute store result storage storage path.to.store[0]."in" byte 1 run die
say hi
locatebiome frozen_river
spreadplayers ~ ~ 0 10 under 100 false @p
debug function foobar
item modify block ~ ~ ~ slot.armor.chest modifier
item modify entity @p slot.armor.chest modifier
item replace block ~ ~ ~ from block ~ ~ ~ slot.armor.chest modifier
