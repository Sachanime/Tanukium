const { Client, EmbedBuilder, MessageType, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js")
const client = new Client({ intents: [3276799] })
const ID = require("./ID.json")
const Token = require("./token.json")
const package = require("./package.json")
const packagelock = require("./package-lock.json")
const mongoose = require("mongoose")
var count = 0
var counter = "Undefined"
var asker = "Undefined"
var botConnexion = "🔴 - Disconnected"
var databaseConnexion = "🔴 - Disconnected"

const globalShema = new mongoose.Schema({

    count: { type: Number },
    counter: { type: String }

})

const UsersSchema = new mongoose.Schema({

    username: { type: String },
    aternos: { type: String },
    mc: { type: String },
    discord: { type: String }

})

const globalModel = mongoose.model("Global", globalShema, "Global")
const UsersModel = mongoose.model("Users", UsersSchema, "Users")

const connectEmbed = new EmbedBuilder()
.setTitle("TanukiDB")
.setThumbnail("https://cdn.iconscout.com/icon/free/png-256/mongodb-5-1175140.png")

const writeDBErrorEmbed = new EmbedBuilder()
.setTitle("TanukiDB")
.setDescription("Impossible d'écrire dans la base de donnée \nMerci de patienter, <@" + ID.Clients.Sacha + "> va intervenir")
.setColor("Red")

const countingSystemErrorEmbed = new EmbedBuilder()
.setTitle("TanukiDB")
.setDescription("Impossible d'utiliser Counting System car TanukiDB n'est pas connecté \nUtiliser la commande `/connect` pour lancer une connexion")
.setColor("Red")

const DBUpdateEmbed = new EmbedBuilder()
.setTitle("TanukiDB")
.setDescription("Votre profil à bien été mis à jour")
.setColor("Green")

client.login(Token.Tanukium)

client.once("ready", () => {

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
    botConnexion = "🟢 - Connected"

    mongoose.set("strictQuery", true)
    mongoose.connect("mongodb://127.0.0.1:27017/TanukiDB")
    .then(() => {console.log("Tanuki Database : 🟢 - Connected")})
    .catch(() => {console.log("Tanuki Database : 🔴 - Disconnected")})

    globalModel.findOne()
    .then((result) => { count = result.count })
    .catch(() => { console.log("Impossible de lire la base de donnée") })

    globalModel.findOne()
    .then((result) => { counter = result.counter })
    .catch(() => { console.log("Impossible de lire la base de donnée") })

})

client.on("messageCreate", async (message) => {

    //Ignore System
    if(message.author.bot) { return }
    if(message.channel.id == ID.Channels.News) { return }
    if(message.type == MessageType.ChannelPinnedMessage) { return }

    //Register System
    const registerErrorEmbed = new EmbedBuilder()
    .setTitle("Register System")
    .setDescription("Impossible de vous enregistrer dans la base de donnée. \nMerci de patienter, <@" + ID.Clients.Sacha + "> va intervenir.")
    .setColor("Red")

    if(await UsersModel.findOne({ discord: message.author.id })) { return }

    else{
        const newUser = new UsersModel({ username: message.author.username, discord: message.author.id })
        await newUser.save()
        .then(() => { message.react(ID.Emotes.Registered) })
        .catch(() => { message.reply({ embeds: [registerErrorEmbed] }) })
    }

})

client.on("messageCreate", (message) => {

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

        if(mongoose.connection.readyState == 1) {

            var regex = /^[0-9]{0,100}$/
            const authorID = message.author.id.toString()

            if(message.content.match(regex)){

                if(authorID == counter){

                    message.react(ID.Emotes.Facepalm)
                    message.reply({ embeds: [embedErrorUser] })
                    globalModel.updateMany({}, { $set: { count: 0, counter: "Undefined" } })
                    .catch((err) => { message.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })
                    count = 0
                    counter = "Undefined"

                }

                else if(message.content > count + 1){

                    message.react(ID.Emotes.Facepalm)
                    message.reply({ embeds: [embedErrorCount] })
                    globalModel.updateMany({}, { $set: { count: 0, counter: "Undefined" } })
                    .catch((err) => { message.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })
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
                    globalModel.updateMany({}, { $inc: { count: 1 }, $set: { counter: authorID } })
                    .catch((err) => { message.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })
                    count = count + 1
                    counter = authorID

                }

            }

        }

        else {
            message.reply({ embeds: [countingSystemErrorEmbed] })
        }

    }

})

//Slash Command System
client.on("interactionCreate", async interaction => {

    const { commandName } = interaction

    //Connect
    if(commandName == "connect") {

        mongoose.set("strictQuery", true)
        mongoose.connect("mongodb://127.0.0.1:27017/TanukiDB")
        .then(() => {console.log("Tanuki Database : 🟢 - Connected")})
        .catch((err) => {console.error(err), console.log("Tanuki Database : 🔴 - Disconnected")})

        if(mongoose.connection.readyState == 0) {
            databaseConnexion = "🔴 - Disconnected"
            connectEmbed.setColor("Red")
        }

        else if(mongoose.connection.readyState == 1) {
            databaseConnexion = "🟢 - Connected"
            connectEmbed.setColor("Green")
        }

        else if(mongoose.connection.readyState == 2) {
            databaseConnexion = "🟠 - Connection..."
            connectEmbed.setColor("Orange")
        }

        else if(mongoose.connection.readyState == 3) {
            databaseConnexion = "🟠 - Disonnection..."
            connectEmbed.setColor("Orange")
        }

        connectEmbed.setDescription(databaseConnexion)
        interaction.reply({ embeds: [connectEmbed] })

    }

    //Infos
    if(commandName == "infos") {

        const MongoDBAdmin = mongoose.connection.db.admin()
        const MongoDBBuildInfo = await MongoDBAdmin.command({ buildInfo: 1 })

        const infosEmbed = new EmbedBuilder()
        .setTitle("Tanukium")
        .setColor("Blue")
        .setThumbnail(client.user.avatarURL())
        .setDescription(
            package.description + "\n\n" +
            "__**Versions**__" + "\n\n" +
            "Tanukium : " + package.version + "\n\n" +
            "Node.js : " + process.version + "\n" +
            "MongoDB : " + MongoDBBuildInfo.version + "\n\n" +
            "Discord.js : " + packagelock.packages["node_modules/discord.js"].version + "\n" +
            "Mongoose : " + packagelock.packages["node_modules/mongoose"].version + "\n\n" +
            "__**Connexions Status**__" + "\n\n" +
            "Tanukium : " + botConnexion + "\n" +
            "TanukiDB : " + databaseConnexion
        )

        if(mongoose.connection.readyState == 0) {
            databaseConnexion = "🔴 - Disconnected"
        }

        else if(mongoose.connection.readyState == 1) {
            databaseConnexion = "🟢 - Connected"
        }

        else if(mongoose.connection.readyState == 2) {
            databaseConnexion = "🟠 - Connection..."
        }

        else if(mongoose.connection.readyState == 3) {
            databaseConnexion = "🟠 - Disonnection..."
        }

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

        const string = interaction.options.getString("count")
        const setCountNumber = Number(string)
        count = setCountNumber
        counter = "Undefined"
        globalModel.updateMany({}, { $set: { count: setCountNumber, counter: "Undefined" } })
        .then(() => { interaction.reply({ embeds: [setCountEmbed] }) })
        .catch((err) => { interaction.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })

        const setCountEmbed = new EmbedBuilder()
        .setTitle("Counting System")
        .setDescription("Le compte a été défini sur " + setCountNumber + "\nLe prochain nombre est " + (setCountNumber + 1))
        .setColor("Green")

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

        const noAskEmbed = new EmbedBuilder()
        .setTitle("AskDM System")
        .setDescription("Vous n'avez reçu aucune demande")
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

        const askNoEmbed = new EmbedBuilder()
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

        if(subCommand == "minecraft"){

            const MCPseudo = interaction.options.getString("pseudo")
            UsersModel.updateOne({ discord: interaction.user.id }, { mc: MCPseudo })
            .then(() => { interaction.reply({ embeds: [DBUpdateEmbed] }) })
            .catch((err) => { interaction.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })

        }

        if(subCommand == "aternos"){

        const AternosPseudo = interaction.options.getString("pseudo")
        UsersModel.updateOne({ discord: interaction.user.id }, { aternos: AternosPseudo })
        .then(() => { interaction.reply({ embeds: [DBUpdateEmbed] }) })
        .catch((err) => { interaction.reply({ embeds: [writeDBErrorEmbed] }), console.error(err) })

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

    await UsersModel.findOneAndUpdate({ discord: newUser.id }, { username: newUser.username})

})

client.on("guildMemberRemove", async (member) => {

    await UsersModel.findOneAndDelete({ discord: member.user.id })

})

mongoose.connection.on("disconnected", () => {
    databaseConnexion = "🔴 - Disconnected"
})

mongoose.connection.on("error", (err) => {
    databaseConnexion = "🔴 - Disconnected"
    console.error(err)
})
