

require('../../settings');
const fs = require('fs');
module.exports = {
    type: "sticker",     
    command: ["s","sticker"], 
    help: ["sticker"],
    tags: ["convert"],       

    operate: async (context) => {
        const { m, text, reaction,prefix,command,client, res } = context;
        if (!m.quoted) return res(`\n*ex:* reply image/video ${prefix + command}\n`);
const quoted = m.quoted || m.msg?.contextInfo?.quotedMessage;

const mime =
        quoted.mimetype ||
        quoted.msg?.mimetype ||
        '';
    
    try {
        if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
                packname: packname,
                author: author,
            });
            await fs.unlinkSync(encmedia);
        } else if (/video/.test(mime)) {
            if ((quoted?.msg || quoted)?.seconds > 10) return res('\nMax 10 secs\n')
                const media = await quoted.download();
                let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {
                    packname: packname,
                    author: author,
                });
            await fs.unlinkSync(encmedia);
        } else {
                return res(`\n*ex:* Reply image/video ${prefix + command}\n`);
        }
    } catch (error) {
        console.error(error);
      
    }
}
};
