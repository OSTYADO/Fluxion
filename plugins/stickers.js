require("../settings");
let handler = async (m,{res,client, text, prefix,pushname, reaction}) => {
const quoted = m.quoted || m.msg?.contextInfo?.quotedMessage;
const mime =
        quoted.mimetype ||
        quoted.msg?.mimetype ||
        '';
                const swn = text || `${pushname}`
                const pcknm = swn.split("|")[0]
                const atnm = swn.split("|")[1]
                if (m.quoted.isAnimated === true) {
                   let media1 = client.downloadAndSaveMediaMessage(quoted, "gifee")
                    client.sendMessage(m.chat, { 
                        sticker: media1 }, m, {
                        packname: pcknm,
                        author: atnm
                    })
                } else if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
                        packname: pcknm,
                        author: atnm
                    })
                    } else if (/video/.test(mime)) {
                        if ((quoted.msg || quoted).seconds > 10) return res('\n𝙼𝚊𝚡 𝟷𝟶 𝚜𝚎𝚌𝚜\n')
                        let media = await quoted.download()
                        let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {
                            packname: pcknm, 
                            author: atnm
                        })
                        } else {
                            res(`\n𝚁𝚎𝚙𝚕𝚢 𝚒𝚖𝚊𝚐𝚎/𝚟𝚒𝚍𝚎𝚘 ${prefix + command}\n`)
                        }
            }
   handler.help = ["stickers"];
   handler.tags = ["converter"];
   handler.command = ["take", "steal", "swm"];
   module.exports = handler;