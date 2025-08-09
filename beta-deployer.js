const { SlashCommandBuilder, Routes, PermissionFlagsBits, Client } = require("discord.js")
const { REST } = require("@discordjs/rest")
const ID = require("./ID.json")

const commands = [

//    new SlashCommandBuilder()
//    .setName("test")
//    .setDescription("Test Command"),
//
//    new SlashCommandBuilder()
//    .setName("infos")
//    .setDescription("Test Command"),
//
//    new SlashCommandBuilder()
//    .setName("connect")
//    .setDescription("Test Command")

]

.map(command => command.toJSON())

const rest = new REST({ version: "10" }).setToken(ID.Tokens.Bêtanukium)

rest.put(Routes.applicationGuildCommands(ID.Clients.Bêtanukium, ID.Guilds.Tanuki), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} application commands`)).catch(console.error)