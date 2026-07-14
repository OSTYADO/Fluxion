require("../../settings");
module.exports = {
    type: "sticker",     
    command: ["take","steal","t"], 
    help: ["take"],
    tags: ["convert"],       

    operate: async (context) => {
        const { m, text, reaction,prefix,pushname,command,reply, client, res } = context;
    if (!m.quoted) return res(`Reply to an image/video/GIF\nExample: ${prefix + command} Pack|Author`);

    const quoted = m.quoted;
    const mime = quoted.mimetype || "";

    const swn = text || pushname;
    /*const pcknm = swn.split("|")[0] || packname;
    const atnm = swn.split("|")[1] || author;*/
    if (quoted.isAnimated || /gif/.test(mime)) {
        const media = await quoted.download();
        return client.sendVideoAsSticker(m.chat, media, m, {
            packname: swn,
            author: ""
        });
    }

    if (/image/.test(mime)) {
    let media = await quoted.download();
            let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
                packname: swn,
                author:"",
            });
            await fs.unlinkSync(encmedia);
        
    }

   
    if (/video/.test(mime)) {
        if ((quoted.seconds || 0) > 10)
            return reply("❌ Max video length is 10 seconds");

        const media = await quoted.download();
        return client.sendVideoAsSticker(m.chat, media, m, {
            packname: swn,
            author: ""
        });
    }

    res(`Unsupported media type\nReply image/video/GIF`);
}
};