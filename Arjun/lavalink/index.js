const {Manager} = require('erela.js');
const spotify = require('erela.js-spotify');
const deezer = require('erela.js-deezer');
const chalk = require('chalk');
const {MessageEmbed, Collection} = require('discord.js');
const {
    NODES,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = new (require('../modules/ArjunUtils'))();

class lavalink extends Manager {
    constructor(client) {
        super({
            nodes: collect(NODES),
            plugins: [new spotify({clientID: SPOTIFY_CLIENT_ID, clientSecret: SPOTIFY_CLIENT_SECRET}), new deezer()],
            autoPlay: true,
            shards: 0,
            send: (id, payload) => {
                const guild = client.guilds.cache.get(id)
                if (guild) return guild.shard.send(payload)
            }
        })
        client.rateLimit = new Collection();

        require('./player');
        this.on('nodeConnect', (node) => {
            console.log(chalk.green(`[LAVALINK] => [STATUS] ${node.options.identifier} successfully connected`))
        })
        this.once('nodeConnect', () => client.playerHandler.autoResume())
        this.on('playerMove', (player, oldC, newC) => {
            player.setVoiceChannel(newC)
        })
			  this.once('nodeConnect', () => client.playerHandler.autoJoin())
        this.on('playerMove', (player, oldC, newC) => {
            player.setVoiceChannel(newC)
        })
        this.on('nodeError', (node, error) => {
            console.log(chalk.red(`[LAVALINK] => [STATUS] ${node.options.identifier} encountered an error. Message: ${error.message ? error.message : 'No message'} | ${error.name} | ${error.stack}`))
        })
        this.on('nodeDisconnect', (node) => {
            console.log(chalk.redBright(`[LAVALINK] => [STATUS] ${node.options.identifier} disconnected`))
        })
        this.on('nodeReconnect', (node) => {
            console.log(chalk.yellowBright(`[LAVALINK] => [STATUS] ${node.options.identifier} is now reconnecting...`))
        })
        this.on('playerMove', ((player, oldChannel, newChannel) => {
            player.set('moved', true)
            player.setVoiceChannel(newChannel)
            return client.playerHandler.savePlayer(player)
        }))
        this.on('socketClosed', (player, payload) => {
            if (player.get('moved')) return player.set('moved', false)
            if (payload.reason === 'Disconnected.' && payload.byRemote && payload.code === 4014) return player.destroy()
            if (!payload.byRemote) {
                setTimeout(() => {
                    if (player.playing) {
                        player.pause(true)
                        setTimeout(() => {
                            player.pause(false)
                        }, 300);
                    }
                }, 2000);
            } else {
                setTimeout(() => {
                    if (player.playing) {
                        player.pause(true)
                        setTimeout(() => {
                            player.pause(false)
                        }, 200);
                    }
                }, 700);
            }
        })
        this.on('playerDestroy', (player) => {
            if (player.get('message') && !player.get('message').deleted) player.get('message').delete().catch(() => {
            });
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
            return client.playerHandler.delete(player.guild)
        })
        this.on('playerCreate', (player) => {
            player.set('rateLimitStatus', {status: false})
            player.set('24h', {status: false})
        })
        this.on('trackStart', (player, track) => {
            if (player.get('rateLimitStatus').status === true) return;
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const playEmbed = new MessageEmbed()
              .setAuthor('🎵Playing song')
              .setTitle('Song Name')

  .setDescription(`_Started:_ **[${track.title}](${track.uri})**`)
              .addField(`**Song Duration**`, `\`${track.isStream ? '◉ LIVE' : `${new Date(track.duration).toISOString().slice(11, 19)}`}\``)
    .setThumbnail('https://cdn.discordapp.com/attachments/1209398050074796042/1219862898873077770/Picsart_24-03-20_06-09-39-451.png?ex=660cd8db&is=65fa63db&hm=58ed6faca9469e5ed7e3237660ce8399f3ebc3ae8acb4642a42539303b742416&')
    .setFooter(client.user.username, client.user.displayAvatarURL())
              //.setFooter(`Requsted By: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}))
  //.setDescription(`😎 **__Started Playing__** \n\n ${track ? `**[${track.title}](${player.queue.current.uri}) \n\n 💠 __Publisher__ = ${track.author} \n 💠 __Duration__ = ${track.duration} seconds \n 💠 __Requested__ = ${track.requester}**` : 'Unknown. Please skip or skipto to bring back current track'}`)
                //.setFooter(`Nopru Music`)
                .setColor(client.colors.main)
                //.setThumbnail(player.queue.current?.thumbnail ? player.queue.current?.thumbnail : '')
            channel.send({embed: playEmbed}).then(msg => player.set('message', msg))
            return client.playerHandler.savePlayer(player)
        })
        this.on('trackEnd', (player) => {
            if (player.get('rateLimitStatus').status === true) return;
            if (player.get('message') && !player.get('message').deleted) player.get('message').delete().catch(() => {
            });
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
        })
        this.on('trackStuck', (player, track, payload) => {
            if (player.get('stuck') && !player.get('stuck').deleted) player.get('stuck').delete().catch(() => {
            });
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const playEmbed = new MessageEmbed()
                .setAuthor("Stuck")
                .setDescription(`❌ | حدث خطأ أثناء تشغيل **${track.title}** \n\`\`\`${payload.type}\`\`\``)
                .setColor(client.colors.error)
            channel.send({embed: playEmbed}).then(msg => player.set('stuck', msg))
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
        })
        this.on('trackError', (player, track, payload) => {
            const rate = client.rateLimit.get(player.guild)
            const time1 = new Date()
            const time2 = new Date()
            if (rate && (time2 - rate.time <= 500) && player.get('rateLimitStatus').status === false) {
                const channel = client.channels.cache.get(player.textChannel);
                const guild = client.guilds.cache.get(player.guild)
                const errorEmbed = new MessageEmbed()
                    .setAuthor("Error")
                    
                    .setColor(client.colors.error)
                player.set('rateLimitStatus', {status: true})
                setTimeout(() => {
                    player.set('rateLimitStatus', {status: false})
                }, 40000);
                channel.send({embed: errorEmbed}).then(msg => player.set('rateLimitMsg', msg))
            } else if (player.get('rateLimitStatus').status === true) {
                return
            } else {
                if (player.get('error') && !player.get('error').deleted) player.get('error').delete().catch(() => {
                });
                if (player.get('rateLimitMsg') && !player.get('rateLimitMsg').deleted) player.get('rateLimitMsg').delete().catch(() => {
                });
                const channel = client.channels.cache.get(player.textChannel);
                const guild = client.guilds.cache.get(player.guild)
                const err = payload.exception ? `Severity: ${payload.exception.severity}\nMessage: ${payload.exception.message}\nCause: ${payload.exception.cause}` : ''
                const errorEmbed = new MessageEmbed()
                    .setAuthor("Error")
                    .setDescription(`❌ | حدث خطأ أثناء تشغيل **${track.title}** \n\`\`\`${err ? err : 'لم يتم توفير أي خطأ من المضيف'}\`\`\``)
                    .setColor(client.colors.error)
                channel.send({embed: errorEmbed}).then(msg => player.set('error', msg))
                if (player.get('nowplaying')) {
                    clearInterval(player.get('nowplaying'));
                    player.get('nowplayingMSG').delete().catch(() => {
                    })
                }
            }
            client.rateLimit.delete(player.guild)
            client.rateLimit.set(player.guild, {time: time1})
        })
        this.on('queueEnd', (player) => {
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const noQueueEmbed = new MessageEmbed()
                
       //.setAuthor(`Queue Concluded`)
              .setDescription(``)
                .setColor(client.colors.error)
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
            channel.send({embed: noQueueEmbed}).catch((_) => {
            })
            setTimeout(() => {
                const e = client.player.players.get(player.guild)
                if (e && !e.queue.current) {
                    
                    const leftEmbed = new MessageEmbed()
                        
                        
                        .setColor(client.colors.error)
                    channel.send({embed: leftEmbed}).catch((_) => {
                    })
                }
            }, 60000);
        })
    }
}

function collect(node) {
    let nodes = []
    node.forEach(x => {
        if (!x.HOST) throw new RangeError('Host must be provided')
        if (typeof x.PORT != 'number') throw new RangeError('Port must be a number')
        if (typeof x.RETRY_AMOUNT != 'number') throw new RangeError('Retry amount must be a number')
        if (typeof x.RETRY_DELAY != 'number') throw new RangeError('Retry delay must be a number')
        if (typeof x.SECURE != 'boolean') throw new RangeError('Secure must be a boolean')
        nodes.push({
            host: x.HOST,
            password: x.PASSWORD ? x.PASSWORD : 'youshallnotpass',
            port: x.PORT ? x.PORT : 8080,
            identifier: x.IDENTIFIER ? x.IDENTIFIER : x.HOST,
            retryAmount: x.RETRY_AMOUNT,
            retryDelay: x.RETRY_DELAY,
            secure: x.SECURE
        })
    })
    return nodes;
}


module.exports = lavalink;


/*const {Manager} = require('erela.js');
const spotify = require('erela.js-spotify');
const deezer = require('erela.js-deezer');
const chalk = require('chalk');
const {MessageEmbed, Collection} = require('discord.js');
const {
    NODES,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = new (require('../modules/laffeyUtils'))();

class lavalink extends Manager {
    constructor(client) {
        super({
            nodes: collect(NODES),
            plugins: [new spotify({clientID: SPOTIFY_CLIENT_ID, clientSecret: SPOTIFY_CLIENT_SECRET}), new deezer()],
            autoPlay: true,
            shards: 0,
            send: (id, payload) => {
                const guild = client.guilds.cache.get(id)
                if (guild) return guild.shard.send(payload)
            }
        })
        client.rateLimit = new Collection();

        require('./player');
        this.on('nodeConnect', (node) => {
            console.log(chalk.green(`[LAVALINK] => [STATUS] ${node.options.identifier} successfully connected`))
        })
        this.once('nodeConnect', () => client.playerHandler.autoResume())
        this.on('playerMove', (player, oldC, newC) => {
            player.setVoiceChannel(newC)
        })
        this.on('nodeError', (node, error) => {
            console.log(chalk.red(`[LAVALINK] => [STATUS] ${node.options.identifier} encountered an error. Message: ${error.message ? error.message : 'No message'} | ${error.name} | ${error.stack}`))
        })
        this.on('nodeDisconnect', (node) => {
            console.log(chalk.redBright(`[LAVALINK] => [STATUS] ${node.options.identifier} disconnected`))
        })
        this.on('nodeReconnect', (node) => {
            console.log(chalk.yellowBright(`[LAVALINK] => [STATUS] ${node.options.identifier} is now reconnecting...`))
        })
        this.on('playerMove', ((player, oldChannel, newChannel) => {
            player.set('moved', true)
            player.setVoiceChannel(newChannel)
            return client.playerHandler.savePlayer(player)
        }))
        this.on('socketClosed', (player, payload) => {
            if (player.get('moved')) return player.set('moved', false)
            if (payload.reason === 'Disconnected.' && payload.byRemote && payload.code === 4014) return player.destroy()
            if (!payload.byRemote) {
                setTimeout(() => {
                    if (player.playing) {
                        player.pause(true)
                        setTimeout(() => {
                            player.pause(false)
                        }, 300);
                    }
                }, 2000);
            } else {
                setTimeout(() => {
                    if (player.playing) {
                        player.pause(true)
                        setTimeout(() => {
                            player.pause(false)
                        }, 200);
                    }
                }, 700);
            }
        })
        this.on('playerDestroy', (player) => {
            if (player.get('message') && !player.get('message').deleted) player.get('message').delete().catch(() => {
            });
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
            return client.playerHandler.delete(player.guild)
        })
        this.on('playerCreate', (player) => {
            player.set('rateLimitStatus', {status: false})
            player.set('24h', {status: false})
        })
        this.on('trackStart', (player, track) => {
            if (player.get('rateLimitStatus').status === true) return;
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const playEmbed = new MessageEmbed()
              
                .setDescription(`😎 **${track.title}** playing`)
                .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
            channel.send({embed: playEmbed}).then(msg => player.set('message', msg))
            return client.playerHandler.savePlayer(player)
        })
        this.on('trackEnd', (player) => {
            if (player.get('rateLimitStatus').status === true) return;
            if (player.get('message') && !player.get('message').deleted) player.get('message').delete().catch(() => {
            });
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
        })
        this.on('trackStuck', (player, track, payload) => {
            if (player.get('stuck') && !player.get('stuck').deleted) player.get('stuck').delete().catch(() => {
            });
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const playEmbed = new MessageEmbed()
                
                .setDescription(`❌ | There was an error while playing **${track.title}** \n\`\`\`${payload.type}\`\`\``)
                .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
            channel.send({embed: playEmbed}).then(msg => player.set('stuck', msg))
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
        })
        this.on('trackError', (player, track, payload) => {
            const rate = client.rateLimit.get(player.guild)
            const time1 = new Date()
            const time2 = new Date()
            if (rate && (time2 - rate.time <= 500) && player.get('rateLimitStatus').status === false) {
                const channel = client.channels.cache.get(player.textChannel);
                const guild = client.guilds.cache.get(player.guild)
                const errorEmbed = new MessageEmbed()
                    .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
                player.set('rateLimitStatus', {status: true})
                setTimeout(() => {
                    player.set('rateLimitStatus', {status: false})
                }, 40000);
                channel.send({embed: errorEmbed}).then(msg => player.set('rateLimitMsg', msg))
            } else if (player.get('rateLimitStatus').status === true) {
                return
            } else {
                if (player.get('error') && !player.get('error').deleted) player.get('error').delete().catch(() => {
                });
                if (player.get('rateLimitMsg') && !player.get('rateLimitMsg').deleted) player.get('rateLimitMsg').delete().catch(() => {
                });
                const channel = client.channels.cache.get(player.textChannel);
                const guild = client.guilds.cache.get(player.guild)
                const err = payload.exception ? `Severity: ${payload.exception.severity}\nMessage: ${payload.exception.message}\nCause: ${payload.exception.cause}` : ''
                const errorEmbed = new MessageEmbed()
                    .setAuthor("Error")
                    .setDescription(`❌ | There was an error while playing **${track.title}** \n\`\`\`${err ? err : 'No error was provided from host'}\`\`\``)
                    .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
                channel.send({embed: errorEmbed}).then(msg => player.set('error', msg))
                if (player.get('nowplaying')) {
                    clearInterval(player.get('nowplaying'));
                    player.get('nowplayingMSG').delete().catch(() => {
                    })
                }
            }
            client.rateLimit.delete(player.guild)
            client.rateLimit.set(player.guild, {time: time1})
        })
        this.on('queueEnd', (player) => {
            const channel = client.channels.cache.get(player.textChannel);
            const guild = client.guilds.cache.get(player.guild)
            const noQueueEmbed = new MessageEmbed()
                
                .setDescription(`❌ | My Queue Is Empty`)
                .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
            if (player.get('nowplaying')) {
                clearInterval(player.get('nowplaying'));
                player.get('nowplayingMSG').delete().catch(() => {
                })
            }
            channel.send({embed: noQueueEmbed}).catch((_) => {
            })
            setTimeout(() => {
                const e = client.player.players.get(player.guild)
                if (e && !e.queue.current) {
                    e.destroy()
                    const leftEmbed = new MessageEmbed()
                        .setColor(guild.me.displayHexColor !== '#000000' ? guild.me.displayHexColor : '#FFE800')
                    channel.send({embed: leftEmbed}).catch((_) => {
                    })
                }
            }, 60000);
        })
    }
}

function collect(node) {
    let nodes = []
    node.forEach(x => {
        if (!x.HOST) throw new RangeError('Host must be provided')
        if (typeof x.PORT != 'number') throw new RangeError('Port must be a number')
        if (typeof x.RETRY_AMOUNT != 'number') throw new RangeError('Retry amount must be a number')
        if (typeof x.RETRY_DELAY != 'number') throw new RangeError('Retry delay must be a number')
        if (typeof x.SECURE != 'boolean') throw new RangeError('Secure must be a boolean')
        nodes.push({
            host: x.HOST,
            password: x.PASSWORD ? x.PASSWORD : 'youshallnotpass',
            port: x.PORT ? x.PORT : 8080,
            identifier: x.IDENTIFIER ? x.IDENTIFIER : x.HOST,
            retryAmount: x.RETRY_AMOUNT,
            retryDelay: x.RETRY_DELAY,
            secure: x.SECURE
        })
    })
    return nodes;
}


module.exports = lavalink;*/
