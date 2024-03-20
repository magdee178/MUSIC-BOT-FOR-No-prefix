const {Client, Util, Collection} = require('discord.js');
const utils = require('./modules/ArjunUtils');
const { TOKEN, PREFIX, MONGODB_URI, LOG,  OWNERS } = new (require('./modules/ArjunUtils'))();
const eventHandler = require('./modules/eventHandler');
const playerHandler = require('./modules/playerHandler');
const chalk = require('chalk');
const commandHandler = require('./handlers/command.js');
const loggerHandler = require('./handlers/logger.js');
const mongoose = require('mongoose');
const cache = require('./cache/manager');
const Discord = require('discord.js');
const client = new Discord.Client();
require('discord-buttons')(client);
const config = require('../config')
const colors = require("./modules/color")
const emojis = require("./modules/emojis")

class Koushikcodez extends Client {
    constructor() {
        super({
            disableMentions: 'everyone',
            messageCacheMaxSize: 200,
            ws: {
                properties: {
                    $browser: 'iOS'
                }
            },
            restTimeOffset: 0
        })
        this.loginMongo().then(async x => {
            if (!x) {
                this.database = false;
                this.logger.error('MONGODB URI is either not provided or invalid. Extra feature (prefix) won\'t be available')
            } else {
                this.database = true;
                this.logger.log('DATABASE', 'Connected to database')
                await Util.delayFor(1000)
                cache(this)
            }
        })
        this.config = config;
			  this.emoji = emojis;
        this.colors = colors;
        this.prefixes = new Map();
        this.commands = new Collection();
        this.voiceTimeout = new Collection();
        this.logger = new loggerHandler();
        this.playerHandler = new playerHandler(this);
        this.owners = OWNERS;
        this.defaultPrefix = PREFIX;

        // Collect needed data to client //
        new eventHandler(this).start();
        commandHandler(this)
    }

    async loginMongo() {
        let available = false
        if (!MONGODB_URI) return available;

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            useFindAndModify: false
        }).then(() => {
            available = true
        }).catch(() => {
            available = false
        })
        return available
    }

    async login() {
        if (!TOKEN) throw new RangeError('You must include TOKEN to login either in config.json or env')
        await super.login(process.env.TOKEN || TOKEN)
            .then(x => {
                return x
            })
            .catch(err => console.log(chalk.red(err)))
    }
}

module.exports = Koushikcodez;
