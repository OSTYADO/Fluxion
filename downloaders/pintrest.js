const axios = require("axios");
module.exports = {
    type: "pintrest",     
    command: ["pintrest","pin","pindl"], 
    help: ["pintrest <query>"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;
  if (!text)
    return res("𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝗉𝗂𝗇𝗍𝗋𝖾𝗌𝗍 𝗅𝗂𝗇𝗄");
await reaction(m.chat,"🔍")
  try {
    const api = `https://api.ootaizumi.web.id/downloader/pinterest?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.download)
      return client.reply(m.chat, "𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗆𝖾𝖽𝗂𝖺", m);

    const r = data.result;

    // Caption
    let caption = `📌 *𝖯𝗂𝗇𝗍𝖾𝗋𝖾𝗌𝗍 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋*

🖼 𝖳𝗂𝗍𝗅𝖾: ${r.title}
👤 𝖠𝗎𝗍𝗁𝗈𝗋: ${r.author?.name || "-"}
🔗 𝖲𝗈𝗎𝗋𝖼𝖾: ${r.source}
📆 𝖴𝗉𝗅𝗈𝖺𝖽: ${r.upload}
`;

    await client.sendMessage(
      m.chat,
      {
        video: { url: r.download },
        caption,
        mimetype: "video/mp4",
        jpegThumbnail: await client.getFile(r.thumb).then(v => v.data)
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    res("Error while downloading Pinterest content");
  }
  }
};
