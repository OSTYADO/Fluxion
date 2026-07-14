

require('../../settings');

module.exports = {
    type: "convert",     
    command: ["brat"], 
    help: ["bratsticker"],
    tags: ["sticker"],       

    operate: async (context) => {
        const { m, text, reaction, prefix,command,client, res } = context;

  if (!text) return res(`\n*ex:* ${prefix + command} apanih cok\n`)
  const media = `https://brat.caliphdev.com/api/brat?text=${text}`;
  await reaction(m.chat, "⚡")

  client.sendImageAsSticker(m.chat, media, m, {
    packname: packname,
    author: author
  });
}
};
