# Tanukium
Une application Discord pour un serveur Discrord personnel

[![Release](https://img.shields.io/github/v/release/Sachanime/Tanukium?logo=Github)](https://github.com/Sachanime/Tanukium)
[![Node.js](https://img.shields.io/badge/Node.js-v23.0.0-%235FA04E?logo=Node.js)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSachanime%2FTanukium%2Fmain%2Fpackage-lock.json&query=%24.packages%5B'node_modules%2Fdiscord.js'%5D.version&label=Discord.js&color=%235865f2&logo=Discord.js)](https://discord.js.org/)
[![lowdb](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSachanime%2FTanukium%2Fmain%2Fpackage-lock.json&query=%24.packages%5B'node_modules%2Flowdb'%5D.version&label=lowdb)](https://github.com/typicode/lowdb)

## Ignore System
Ignore certains messages comme les messages systèmes ainsi que les messages des autres bots

## Register Système
Enregistre les nouveaux membres dans la base de données TanukiDB dès leur arrivée

## Counting System
Système de jeu où le principe et de compter de 1 en 1 jusqu'au plus loins possible

Il est interdit de : 

- Envoyer deux nombres de suites
- Envoyer un nombre inférieur au précédent
- Sauter un nombre

En cas de non respect de ces règles, le compteur se réinitialise

### Commandes
- `/setcount` (ManageChannels Permission) : Mettre à jours le compte en cas de réinitialisation imprévu

## Infos System
Affiche des infos sur le bot

### Commandes
- `/infos` : Obtenir des informations sur le bot
- `/bug` : Signaler un bug

## Camping System
Permet à un membre de créer un salon privée si il dispose du rôle requis

### Comanndes 
- `/camp` : Créer votre salon personelle quand vous avez le rôle 'Campeur'

## Ask DM System
Envoie une demande de MP à un membre qui n'accèpte que les MP sur demande

### Commandes
- `/askdm` : Demander l'autorisation de MP un membre possédant le rôle 'MP Sur Demande'

## Account System
Permet de lier des comptes de services tiers à son profile TanukiDB

### Commandes
- `/account minecraft` : Enregistrer votre pseudo Minecraft
- `/account aternos` : Enregistrer votre pseudo Aternos

## Autoremove System
Permet la gestion automatique de certains rôles
