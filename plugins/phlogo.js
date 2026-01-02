const fetch = require('node-fetch')
const handler = async (m,{client,text,prefix, command,res}) => {
  if (!text || !text.includes('|')) {
    return res(`Example: *${prefix + command} 𝙵𝙻𝚄𝚇𝙸𝙾𝙽|II*`)
  }

  let [text1, text2] = text.split('|').map(t => t.trim())
  if (!text1 || !text2) return m.reply('𝙵𝚒𝚕𝚕 𝚒𝚗 𝚋𝚘𝚝𝚑 𝚏𝚒𝚎𝚕𝚍𝚜')

  try {
    const apiUrl = `https://apikey.sazxofficial.web.id/api/imagecreator/pornhub?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`
    const ph = await fetch(apiUrl)
    const json = await ph.json()

    if (!json.status) return m.reply('Gagal mengambil gambar dari API.')

    await client.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `𝙻𝚘𝚐𝚘 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍\n©𝙵𝙻𝚄𝚇𝙸𝙾𝙽\n• *𝚃𝚎𝚡𝚝𝟷:* ${text1}\n• *𝚃𝚎𝚡𝚝𝟸:* ${text2}`,
      contextInfo: {
        externalAdReply: {
          title: "𝙿𝚘𝚛𝚗𝚑𝚞𝚋 𝚕𝚘𝚐𝚘 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚘𝚛",
          body: "𝚃𝚑𝚎 𝚙𝚘𝚠𝚎𝚛 𝚘𝚏 𝙵𝚕𝚞𝚡𝚒𝚘𝚗",
          thumbnailUrl:'https://files.catbox.moe/m97oqm.jpg',
          mediaType: 1,
          renderLargerThumbnail: true,
         
        }
      }
    }, { quoted: m })

  } catch (e) {
    m.reply(e)
    console.error(e)
  }
}
handler.tags = ['downloader'];
handler.help = ['PH LOGO'];
handler.command = ['phlogo']
module.exports = handler;