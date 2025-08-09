const { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js")
const ID = require("./ID.json")

const rest = new REST({ version: "10" }).setToken(ID.Tokens.Tanukium)

rest
.delete(Routes.applicationGuildCommand(ID.Clients.Tanukium, ID.Guilds.Tanuki, "1084452553519022191"))
.then(() => console.log("Successfully deleted application command"))
.catch(console.error)