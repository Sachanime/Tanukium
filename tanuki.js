const { Client, EmbedBuilder, MessageType, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js")
const { Low } = require("lowdb")
const { JSONFile } = require("lowdb/node")

const ID = require("./ID-beta.json")
const Token = require("./token.json")
const package = require("./package.json")
const packagelock = require("./package-lock.json")

const client = new Client({ intents: [3276799] })
const adapter = new JSONFile("db.json")
const db = new Low(adapter, { users: [], mainDoc: [] })

var count = 0
var counter = "Undefined"
var asker = "Undefined"

async function startBot() {

    client.login(Token.Bêtanukium)
    await db.read()

    const mainDoc = db.data.mainDoc.find(d => d.name == "countingSystem")
    const usersDb = db.data.users

    client.once("clientReady", async () => {

        console.log(" ____  _  ___       ____                                          ")
        console.log("/ ___|| |/ / |     |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  ___ ")
        console.log("\\___ \\| ' /| |     | |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\/ __|")
        console.log(" ___) | . \\| |___  |  __/| | | (_) | (_| | | | (_| | | | | | \\__ \\")
        console.log("|____/|_|\\_\\_____| |_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|___/")
        console.log("                                    |___/                         ")

        console.log("   ")

        console.log(" _____  _    _   _ _   _ _  _____ _   _ __  __        ____    ____  ")
        console.log("|_   _|/ \\  | \\ | | | | | |/ /_ _| | | |  \\/  |      |___ \\  |___ \\ ")
        console.log("  | | / _ \\ |  \\| | | | | ' / | || | | | |\\/| |        __) |   __) |")
        console.log("  | |/ ___ \\| |\\  | |_| | . \\ | || |_| | |  | |       / __/ _ / __/ ")
        console.log("  |_/_/   \\_\\_| \\_|\\___/|_|\\_\\___|\\___/|_|  |_|      |_____(_)_____|")
        console.log("   ")

        console.log("Tanukium : 🟢 - Connected")

        count = mainDoc.count
        counter = mainDoc.counter

    })

    client.on("messageCreate", async (message) => {

        //Ignore System
        if(message.author.bot) { return }
        if(message.channel.id == ID.Channels.News) { return }
        if(message.type == MessageType.ChannelPinnedMessage) { return }

        //Register System
        if(usersDb.find(u => u.id == message.author.id)) { return }

        else{

            const newUser = { id: message.author.id, username: message.author.username }
            usersDb.push(newUser)
            await db.write()
            message.react(ID.Emotes.Registered)

        }

    })

    client.on("messageCreate", async (message) => {

        //Ignore System
        if(message.author.bot) { return }
        if(message.channel.id == ID.Channels.News) { return }
        if(message.type == MessageType.ChannelPinnedMessage) { return }

        //Counting System
        const embedErrorCount = new EmbedBuilder()
        .setTitle("STOP")
        .setColor("ff0000")
        .setDescription("Vous avez sautez un nombre, recommencez depuis le début")

        const embedErrorUser = new EmbedBuilder()
        .setTitle("STOP")
        .setColor("ff0000")
        .setDescription("Vous n'avez pas le droit de jouer tout seul, recommencez depuis le début")

        if(message.channel.id == ID.Channels.Counting){

            var regex = /^[0-9]{0,100}$/
            const authorID = message.author.id.toString()

            if(message.content.match(regex)){

                if(authorID == counter){

                    message.react(ID.Emotes.Facepalm)
                    message.reply({ embeds: [embedErrorUser] })
                    mainDoc.count = 0
                    mainDoc.counter = "Undefined"
                    await db.write()
                    count = 0
                    counter = "Undefined"

                }

                else if(message.content > count + 1){

                    message.react(ID.Emotes.Facepalm)
                    message.reply({ embeds: [embedErrorCount] })
                    mainDoc.count = 0
                    mainDoc.counter = "Undefined"
                    await db.write()
                    count = 0
                    counter = "Undefined"

                }

                else if(message.content < count){
                    message.react(ID.Emotes.Ouf)
                    return
                }

                else if(message.content == count){
                    message.react(ID.Emotes.Ouf)
                }

                else if(message.content == count + 1){

                    message.react(ID.Emotes.OK)
                    mainDoc.count += 1
                    mainDoc.counter = authorID
                    await db.write()
                    count += 1
                    counter = authorID

                }

            }

        }

    })

    //Slash Command System
    client.on("interactionCreate", async interaction => {

        const { commandName } = interaction

        //Infos
        if(commandName == "infos") {

            const infosEmbed = new EmbedBuilder()
            .setTitle("Tanukium")
            .setColor("Blue")
            .setThumbnail(client.user.avatarURL())
            .setDescription(
                package.description + "\n\n" +
                "__**Versions**__" + "\n\n" +
                "Tanukium : " + package.version + "\n\n" +
                "Node.js : " + process.version + "\n" +
                "Discord.js : " + packagelock.packages["node_modules/discord.js"].version + "\n" +
                "lowdb : " + packagelock.packages["node_modules/lowdb"].version
            )

            interaction.reply({ embeds: [infosEmbed] })

        }

        else if(commandName == "bug"){

            const string = interaction.options.getString("bug")

            const bugReportEmbed = new EmbedBuilder()
            .setTitle("Bug Report")
            .setDescription(string)
            .setColor("Red")
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })

            const bugReportedEmbed = new EmbedBuilder()
            .setTitle("Bug Report")
            .setDescription("Votre bug a bien été transmis à <@" + ID.Clients.Sacha + ">")
            .setColor("Green")

            client.channels.cache.get(ID.Channels.Staff).send({ embeds: [bugReportEmbed] })
            interaction.reply({embeds: [bugReportedEmbed], ephemeral: true })

        }

        //setCount Command
        else if(commandName == "setcount") {

            const setCountEmbed = new EmbedBuilder()
            .setTitle("Counting System")
            .setDescription("Le compte a été défini sur " + setCountNumber + "\nLe prochain nombre est " + (setCountNumber + 1))
            .setColor("Green")

            const string = interaction.options.getString("count")
            const setCountNumber = Number(string)
            count = setCountNumber
            counter = "Undefined"
            mainDoc.count = setCountNumber
            mainDoc.counter = "Undefined"
            await db.write()
            interaction.reply({ embeds: [setCountEmbed] })

        }

        //Camping System
        else if(commandName == "camp"){

            const notCamperEmbed = new EmbedBuilder()
            .setTitle("Camping System")
            .setDescription("Vous n'avez pas le rôle <@&" + ID.Rôles.Campeur + ">")
            .setColor("Orange")

            const campEmbed = new EmbedBuilder()
            .setTitle("Camping System")
            .setDescription("Votre tente a bien été crée")
            .setColor("Green")

            if(interaction.member.roles.cache.get(ID.Rôles.Campeur)){

                client.guilds.cache.get(ID.Guilds.Tanuki).channels.create({

                    name: "Tente de " + interaction.user.username,
                    parent: ID.Channels["Camping Category"],
                    permissionOverwrites: [

                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },

                        {
                            id: interaction.member.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageRoles]
                        }

                    ]

                })

                interaction.member.roles.remove(ID.Rôles.Campeur)
                interaction.reply({ embeds: [campEmbed] })

            }

            else{
                interaction.reply({ content: { embeds: [notCamperEmbed] }, ephemeral: true })
            }

        }

        //Ask DM System
        else if(commandName == "askdm") {

            const replySendEmbed = new EmbedBuilder()
            .setTitle("Demande de MP")
            .setDescription("Votre réponse à été evoyée")
            .setColor("Green")

            const askWaitEmbed = new EmbedBuilder()
            .setTitle("AskDM System")
            .setDescription("Une demande est déjà en cours, merci de patienter")
            .setColor("Orange")

            const askOpenDMEmbed = new EmbedBuilder()
            .setTitle("AskDM System")
            .setDescription("Cet utilisateur accepte les MP de tout le monde")
            .setColor("Orange")

            const askCloseDMEmbed = new EmbedBuilder()
            .setTitle("AskDM System")
            .setDescription("Cette utilisateur n'accepte aucun MP")
            .setColor("Orange")

            if(asker != "Undefined"){
                interaction.reply({ content: { embeds: [askWaitEmbed] }, ephemeral: true })
                return
            }

            const user = interaction.options.getUser("user")
            asker = interaction.user

            if(user.client.guilds.cache.get(ID.Guilds.Tanuki).members.cache.get(user.id).roles.cache.get(ID.Rôles["Open DM"])){
                interaction.reply({ content: { embeds: [askOpenDMEmbed] }, ephemeral: true })
            }

            else if(user.client.guilds.cache.get(ID.Guilds.Tanuki).members.cache.get(user.id).roles.cache.get(ID.Rôles["Close DM"])){
                interaction.reply({ content: { embeds: [askCloseDMEmbed] }, ephemeral: true })
            }

            else {

                const row = new ActionRowBuilder()
                .addComponents(

                    new ButtonBuilder()
                    .setCustomId("askdm yes")
                    .setLabel("Accepter")
                    .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                    .setCustomId("askdm no")
                    .setLabel("Refuser")
                    .setStyle(ButtonStyle.Danger)

                )

                const askDMEmbed = new EmbedBuilder()
                .setTitle("Demmande de MP")
                .setDescription("Vous avez reçu une demande de MP de la part de <@" + user + ">")
                .setColor("Orange")

                const askSendEmbed = new EmbedBuilder()
                .setTitle("Demmande envoyée")
                .setDescription("Votre demmande de MP à bien été envoyée à <@" + user + ">")
                .setColor("Green")

                user.send({ embeds: [askDMEmbed], components: [row] })
                interaction.reply({ embeds: [askSendEmbed] })

            }

        }

        else if(interaction.customId == "askdm yes"){

            const noAskEmbed = new EmbedBuilder()
            .setTitle("AskDM System")
            .setDescription("Vous n'avez reçu aucune demande")
            .setColor("Orange")

            const askYesEmbed = new EmbedBuilder()
            .setTitle("Demande de MP")
            .setDescription("La demande de MP de <@" + asker + "> à <@" + interaction.user + "> a été acceptée")
            .setColor("Green")

            if(asker != "Undefined"){
                interaction.reply({ embeds: [replySendEmbed] })
                client.guilds.cache.get(ID.Guilds.Tanuki).channels.cache.get(ID.Channels["Ask DM"]).send({ embeds: [askYesEmbed] })
                asker = "Undefined"
            }

            else{
                interaction.reply({ content: { embeds: [noAskEmbed] }, ephemeral: true })
                return
            }

        }

        else if(interaction.customId == "askdm no"){

            const noAskEmbed = new EmbedBuilder()
            .setTitle("Demande de MP")
            .setDescription("La demande de MP de <@" + asker + "> à <@" + interaction.user + "> a été refusée")
            .setColor("Red")

            if(asker != "Undefined"){
                interaction.reply({ embeds: [replySendEmbed] })
                client.guilds.cache.get(ID.Guilds.Tanuki).channels.cache.get(ID.Channels["Ask DM"]).send({  embeds: [askNoEmbed] })
                asker = "Undefined"
            }

            else{
                interaction.reply({ content: { embeds: [noAskEmbed] }, ephemeral: true })
                return
            }

        }

        //Account System
        else if(commandName == "account"){

            const subCommand = interaction.options.getSubcommand()

            const DBUpdateEmbed = new EmbedBuilder()
            .setTitle("TanukiDB")
            .setDescription("Votre profil à bien été mis à jour")
            .setColor("Green")

            if(subCommand == "minecraft"){

                const MCPseudo = interaction.options.getString("pseudo")
                usersDb.find(u => u.id == interaction.user.id).mc = MCPseudo
                await db.write()
                interaction.reply({ embeds: [DBUpdateEmbed] })

            }

            if(subCommand == "aternos"){

                const AternosPseudo = interaction.options.getString("pseudo")
                usersDb.find(u => u.id == interaction.user.id).aternos = AternosPseudo
                await db.write()
                interaction.reply({ embeds: [DBUpdateEmbed] })

            }

        }

    })

    client.on("guildMemberUpdate", (oldMember, newMember) => {

        //Autoremove System
        if(newMember.roles.cache.get(ID.Rôles.lvl5)){
            newMember.roles.remove(ID.Rôles.newMember)
            if(newMember.roles.cache.get(ID.Rôles.newMember)){
                newMember.send("Félicitation, vous avez atteint le niveau 5 \nVous pouvez désormais demander une vérification avec la commande `!ticket Vérification` \nSi vous êtes vérifé, vous aurez alors accès à de nouveaux salons")
            }
        }

    })

    client.on("userUpdate", async (oldUser, newUser) => {

        usersDb.find(u => u.id == newUser.id).username = newUser.username
        await db.write()

    })

    client.on("guildMemberRemove", async (member) => {

        usersDb = usersDb.filter((u => u.id !== member.user.id))
        await db.write()

    })

}

startBot()