const { SlashCommandBuilder, Routes, PermissionFlagsBits, Client } = require("discord.js")
const { REST } = require("@discordjs/rest")
const ID = require("./ID-beta.json")
const Token = require("./token.json")

const commands = [

    new SlashCommandBuilder()
    .setName("setcount")
    .setDescription("Mettre à jours le compte en cas de réinitialisation imprévu")
    .addStringOption(option => option
        .setName("count")
        .setDescription("Nombre")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    new SlashCommandBuilder()
    .setName("askdm")
    .setDescription("Demander l'autorisation de MP un membre possédant le rôle 'MP Sur Demande'")
    .addUserOption(option => option
        .setName("user")
        .setDescription("L'utilisateur qui va recevoir la demande")
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName("camp")
    .setDescription("Créer votre salon personelle quand vous avez le rôle 'Campeur'"),

    new SlashCommandBuilder()
    .setName("infos")
    .setDescription("Obtenir des informations sur le BOT"),

    new SlashCommandBuilder()
    .setName("bug")
    .setDescription("Signaler un bug")
    .addStringOption(option => option
        .setName("bug")
        .setDescription("Description du bug")
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName("account")
    .setDescription("Enregistrer divers pseudo")

    .addSubcommand(subcommand => subcommand

        .setName("minecraft")
        .setDescription("Enregistrer votre pseudo Minecraft")
        .addStringOption(option => option
            .setName("pseudo")
            .setDescription("Pseudo Minecraft")
            .setRequired(true)    
        )

    )
    
    .addSubcommand(subcommand => subcommand

        .setName("aternos")
        .setDescription("Enregistrer votre pseudo Aternos")  
        .addStringOption(option => option
            .setName("pseudo")
            .setDescription("Pseudo Aternos")
            .setRequired(true)    
        )

    ),

    new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Affichier le changelog")

]

.map(command => command.toJSON())

const rest = new REST({ version: "10" }).setToken(Token.Beta)

rest.put(Routes.applicationCommands(ID.Clients.Tanukium), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} application commands`)).catch(console.error)