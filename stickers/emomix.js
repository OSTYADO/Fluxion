const fetch = require("node-fetch");
module.exports = {
    type: "convert",     
    command: ["emomix","mix"], 
    help: ["emojimix"],
    tags: ["emojimix"],       

    operate: async (context) => {
        const { m, text, reaction,command,prefix,fetchJson, client, res } = context;
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return res(`𝙴𝚡𝚊𝚖𝚙𝚕𝚎 : ${prefix + command} 😀+😂`)
                if (!emoji2) return res(`𝙴𝚡𝚊𝚖𝚙𝚕𝚎 : ${prefix + command} 😀+😂`)
             
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await client.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            
 };