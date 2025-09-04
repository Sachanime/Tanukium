const { EmbedBuilder } = require("discord.js")

function createInfosEmbed(client, package, packagelock) {

    return new EmbedBuilder()
    .setTitle("Tanukium")
    .setColor("Blue")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
        package.description + "\n\n" +
        "__**Versions**__" + "\n\n" +
        "Tanukium : " + package.version + "\n\n" +
        "Node.js : " + process.version + "\n\n" +
        "Discord.js : " + packagelock.packages["node_modules/discord.js"].version + "\n" +
        "lowdb : " + packagelock.packages["node_modules/lowdb"].version
    )

}

const embedErrorCount = new EmbedBuilder()
.setTitle("STOP")
.setColor("ff0000")
.setDescription("Vous avez sautez un nombre, recommencez depuis le début")

const embedErrorUser = new EmbedBuilder()
.setTitle("STOP")
.setColor("ff0000")
.setDescription("Vous n'avez pas le droit de jouer tout seul, recommencez depuis le début")

function createBugReportEmbed(string, interaction) {

    return new EmbedBuilder()
    .setTitle("Bug Report")
    .setDescription(string)
    .setColor("Red")
    .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })

}

function createBugReportedEmbed(ID) {

    return new EmbedBuilder()
    .setTitle("Bug Report")
    .setDescription("Votre bug a bien été transmis à <@" + ID.Clients.Sacha + ">")
    .setColor("Green")

}

function createSetCountEmbed(setCountNumber) {

    return new EmbedBuilder()
    .setTitle("Counting System")
    .setDescription("Le compte a été défini sur " + setCountNumber + "\nLe prochain nombre est " + (setCountNumber + 1))
    .setColor("Green")

}

function createNotCamperEmbed(ID) {

    return new EmbedBuilder()
    .setTitle("Camping System")
    .setDescription("Vous n'avez pas le rôle <@&" + ID.Rôles.Campeur + ">")
    .setColor("Orange")

}

const campEmbed = new EmbedBuilder()
.setTitle("Camping System")
.setDescription("Votre tente a bien été crée")
.setColor("Green")

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

function createAskDMEmbed(user) {

    return new EmbedBuilder()
    .setTitle("Demmande de MP")
    .setDescription("Vous avez reçu une demande de MP de la part de <@" + user + ">")
    .setColor("Orange")

}

function createAskSendEmbed(user) {

    return new EmbedBuilder()
    .setTitle("Demmande envoyée")
    .setDescription("Votre demmande de MP à bien été envoyée à <@" + user + ">")
    .setColor("Green")

}

const noAskEmbed = new EmbedBuilder()
.setTitle("AskDM System")
.setDescription("Vous n'avez reçu aucune demande")
.setColor("Orange")

function createAskYesEmbed(asker, interaction) {

    return new EmbedBuilder()
    .setTitle("Demande de MP")
    .setDescription("La demande de MP de <@" + asker + "> à <@" + interaction.user + "> a été acceptée")
    .setColor("Green")

}

function createAskNoEmbed(asker, interaction) {

    return new EmbedBuilder()
    .setTitle("Demande de MP")
    .setDescription("La demande de MP de <@" + asker + "> à <@" + interaction.user + "> a été refusée")
    .setColor("Red")

}

const DBUpdateEmbed = new EmbedBuilder()
.setTitle("TanukiDB")
.setDescription("Votre profil à bien été mis à jour")
.setColor("Green")

module.exports = { createInfosEmbed, embedErrorCount, embedErrorUser, createBugReportEmbed, createBugReportedEmbed, createSetCountEmbed, createNotCamperEmbed, campEmbed, replySendEmbed, askWaitEmbed, askOpenDMEmbed, askCloseDMEmbed, createAskDMEmbed, createAskSendEmbed, noAskEmbed, createAskYesEmbed, createAskNoEmbed, DBUpdateEmbed }