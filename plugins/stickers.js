require("../settings");

let handler = async (m, { client, text, prefix, pushname, command, reply,res }) => {
    if (!m.quoted) return res(`Reply to an image/video/GIF\nExample: ${prefix + command} Pack|Author`);

    const quoted = m.quoted;
    const mime = quoted.mimetype || "";

    const swn = text || pushname;
    const pcknm = swn.split("|")[0] || packname;
    const atnm = swn.split("|")[1] || author;

   
    if (quoted.isAnimated || /gif/.test(mime)) {
        const media = await quoted.download();
        return client.sendVideoAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm
        });
    }

   
    if (/image/.test(mime)) {
        const media = await quoted.download();
        return client.sendImageAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm
        });
    }

    
    if (/video/.test(mime)) {
        if ((quoted.seconds || 0) > 10)
            return res("❌ Max video length is 10 seconds");

        const media = await quoted.download();
        return client.sendVideoAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm
        });
    }

   res(`Unsupported media type\nReply image/video/GIF`);
};

handler.help = ["take", "steal", "swm"];
handler.tags = ["converter"];
handler.command = ["take", "steal", "swm"];

module.exports = handler;