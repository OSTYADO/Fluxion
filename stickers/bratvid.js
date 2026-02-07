

require('../../settings');
module.exports = {
    type: "command",     
    command: ["bratvid"], 
    help: ["bratvid"],
    tags: ["bratvid"],       

    operate: async (context) => {
        const { m, text, reaction,prefix,command, client, res } = context;

  if (!text) return res(`\n*ex:* ${prefix + command} Stfu\n`)
  const media = `https://brat.caliphdev.com/api/brat/animate?text=${text}`;
  await reaction(m.chat, "⚡")

  client.sendVideoAsSticker(m.chat, media, m, {
    packname: packname,
    author: author
  });
}
};
