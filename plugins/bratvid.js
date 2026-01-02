

require('../settings');

let handler = async (m, { client, text, reaction, res, prefix, command }) => {
  if (!text) return res(`\n*ex:* ${prefix + command} apanih cok\n`)
  const media = `https://brat.caliphdev.com/api/brat/animate?text=${text}`;
  await reaction(m.chat, "⚡")

  client.sendVideoAsSticker(m.chat, media, m, {
    packname: packname,
    author: author
  });
}

handler.help = ['sticker brat'];
handler.tags = ['sticker'];
handler.command = ["bratvid", "bratvideo"];

module.exports = handler;
