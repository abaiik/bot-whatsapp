const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')
const moment = require("moment-timezone")

require('./index.js')
nocache('./index.js', module => console.log(`${module} is now updated!`))

const starts = async (client = new WAConnection()) => {
    client.logger.level = 'warn'
    client.version = [3, 3234, 9]
    client.browserDescription = [ '@abaiik', 'Chrome', '3.0' ]
    let authofile = './session.json'
    client.on('qr', () => {
        const time_connecting = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        console.log(color(time_connecting, "white"), color("[  STATS  ]", "green"), "Scan QR Code with WhatsApp")
    })
    fs.existsSync(authofile) && client.loadAuthInfo(authofile)
    client.on('connecting', () => {
        const time_connecting = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        console.log(color(time_connecting, "white"), color("[  STATS  ]", "green"), "Connecting...")
    })
    client.on('open', () => {
        const time_connect = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        console.log(color(time_connect, "white"), color("[  STATS  ]", "green"), "Connected")
    })
    await client.connect({ timeoutMs: 30 * 1000 })
    fs.writeFileSync(authofile, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
      
    client.on('chat-update', async (message) => {
        require('./index.js')(client, message)
    })

} 

function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
