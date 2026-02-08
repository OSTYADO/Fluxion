
const fetch = require('node-fetch');
module.exports = {
    type: "animenews",     
    command: ["animenews"], 
    help: ["anime"],
    tags: ["anime"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

  try {
    const rs = await fetch('https://fgsi1-restapi.hf.space/api/information/mywaifulist/news');
    const json = await rs.json();

    if (!json.status || !json.data) return res('couldn\'t fetch data');

    let newsList = json.data.map((item, index) => {
      return `*${index + 1}. ${item.title}*\n${item.description}\n_Published: ${item.pubDate.split('T')[0]}_\n[Read More](${item.url})`;
    }).join('\n\n');

    client.sendMessage(m.chat, {
      text: `*📢 𝙰𝚗𝚒𝚖𝚎 𝚗𝚎𝚠𝚜*\n\n${newsList}`,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝙵𝚕𝚞𝚡𝚒𝚘𝚗 𝙰𝚗𝚒𝚖𝚎 𝚗𝚎𝚠𝚜',
          body: '𝙻𝚊𝚝𝚎𝚜𝚝 𝚊𝚗𝚒𝚖𝚎𝚕𝚒𝚜𝚝',
          thumbnailUrl: 'https://files.catbox.moe/m97oqm.jpg',
          sourceUrl: 'https://fgsi1-restapi.hf.space',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false
        },
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "MyWaifuList News - Fitur By Takashi",
          newsletterJid: `120363414329890254@newsletter`
        }
      }
    }, { quoted: m });
    
  } catch (e) {
    m.reply(`${e}`);
  }
  }
};
