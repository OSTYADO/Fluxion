const fetch = require("node-fetch");
let handler = async (m,{res, text,client, prefix,command,fetchJson, reaction}) => {
if (!text) return res(`𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚃𝚝 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: ${prefix + command}𝙵𝚕𝚞𝚡𝚒𝚘𝚗`)
const respon = await fetchJson(`https://api-rest-rizzkyxofc.vercel.app/api/tools/tiktokstalk?user=${text}`)
client.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
const data = respon.data.user
const data1 = respon.data.stats
  
    let te = `
┌──「 *𝙎𝙩𝙖𝙡𝙠𝙞𝙣𝙜* 
▢ *🔖𝙽𝚊𝚖𝚎:* ${data.nickname} 
▢ *🔖𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎:* ${data.uniqueId}
▢ *👥𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜:* ${data1.followerCount}
▢ *🚶𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐:* ${data1.followingCount}
▢ *📌𝙱𝚒𝚘:* ${data.signature}
▢ *🏝️𝙿𝚘𝚜𝚝𝚜:* ${data1.videoCount}
▢ *❣️𝚂𝚞𝚔𝚊:* ${data1.heart}
▢ *🔗 𝙻𝚒𝚗𝚔* : https://tiktok.com/${data.uniqueId}
└────────────`
     await client.sendMessage(m.chat, {image: { url: data.avatarLarger }, caption: te }, {quoted: m})
      } catch {
        res(`𝙼𝚊𝚔𝚎 𝚜𝚞𝚛𝚎 𝚒𝚝𝚜 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎`)
      }
}

handler.help = ["tiktokstalk"];
handler.tags = ["stalk"];
handler.command = ["ttstalk","tiktokstalk"];
module.exports = handler;