

require('../../settings');

module.exports = {
    type: "ai",     
    command: ["flux"], 
    help: ["ai"],
    tags: ["AI"],       

    operate: async (context) => {
        const { m, text,prefix,command,fetchJson, reaction, client, res } = context;

    if (!text) return res(`\n*ex:* ${prefix + command} haii\n`)
    let a = await fetchJson(`https://www.laurine.site/api/cai/bocchi?query=${text}`)
    let b = a.data
    client.sendMessage(m.chat, { 
        text: b,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: "𝙵𝚕𝚞𝚡𝚒𝚘𝚗",
                newsletterJid: `120363369349376182@newsletter`
            },
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: true,
                title: `©𝐀𝐈`,
                body: `𝐅𝐋𝐔𝐗𝐈𝐎𝐍 𝐈𝐈`,
                mediaType: 1,
                thumbnailUrl: `https://files.catbox.moe/m97oqm.jpg`,
                thumbnail: ``,
                sourceUrl: ``
            }
        }
    }, { quoted: m });
}
};
