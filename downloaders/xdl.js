const axios = require("axios");
module.exports = {
    type: "Xdl",     
    command: ["xdl","twtdl","twitter"], 
    help: ["xdl <url>"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;
  if (!text)
    return res("𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝗍𝗐𝗂𝗍𝗍𝖾𝗋 /𝗑 𝗎𝗋𝗅");
await reaction(m.chat,"📲");
  try {
    const api = `https://api.ootaizumi.web.id/downloader/twitter?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !Array.isArray(data.result))
      return res("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗆𝖾𝖽𝗂𝖺");

    // Filter valid video links
    const videos = data.result.filter(
      v => v.type === "video" && v.link && v.link !== "#"
    );

    if (!videos.length)
      return res("𝖭𝗈 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖺𝖻𝗅𝖾 𝗆𝖾𝖽𝗂𝖺 𝖿𝗈𝗎𝗇𝖽");

    // Prefer highest resolution
    const best =
      videos.find(v => v.resolution?.includes("474")) ||
      videos.find(v => v.resolution?.includes("360")) ||
      videos[0];

    let caption = ` *𝖳𝗐𝗂𝗍𝗍𝖾𝗋 /𝗑 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋*

🎞 𝖱𝖾𝗌𝗈𝗅𝗎𝗍𝗂𝗈𝗇: ${best.resolution || "unknown"}
`;

    await client.sendMessage(
      m.chat,
      {
        video: { url: best.link },
        caption,
        mimetype: "video/mp4"
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    res( "𝖤𝗋𝗋𝗈𝗋 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗏𝗂𝖽𝖾𝗈");
  }
  }
};