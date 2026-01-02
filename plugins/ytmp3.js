const fetch = require("node-fetch");
let handler = async (m,{res,client, text, prefix, reaction}) =>{
if (!text) return res("𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚕𝚒𝚗𝚔")
if (!text.startsWith("https://")) return m.reply("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚢𝚘𝚞𝚝𝚞𝚋𝚎 𝚕𝚒𝚗𝚔")
await client.sendMessage(m.chat, {react: {text: '🕖', key: m.key}})

var anu = await fetchJson("https://api.skyzopedia.us.kg/api/download/ytmp3?url="+text)
if (anu.download.audio) {
let urlMp3 = anu.download.audio
await client.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg"}, {quoted: m})
} else {
return res("𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙰𝚞𝚍𝚒𝚘")
}
}
handler.help = ["ytmp3"];
handler.tags = ["download"];
handler.command = ["ytmp3"];
module.exports = handler;