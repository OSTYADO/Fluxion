const axios = require("axios");
module.exports = {
    type: "instagram",     
    command: ["instagram","igdl"], 
    help: ["igdl"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;
  if (!text)
    return res( "𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝗂𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝗅𝗂𝗇𝗄");

  try {
    const api = `https://api.ootaizumi.web.id/downloader/instagram/v1?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.media || !data.result.media.length)
      return res("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗆𝖾𝖽𝗂𝖺");

    const r = data.result;


    let caption = `📸 *𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋*\n\n👤 𝖠𝗎𝗍𝗁𝗈𝗋: ${r.metadata.author}\n❤️𝖫𝗂𝗄𝖾𝗌: ${r.metadata.like}\n👁 𝗏𝗂𝖾𝗐𝗌: ${r.metadata.views}\n⏱ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇: ${r.metadata.duration} 𝗌𝖾𝖼`;
    for (const media of r.media) {
      if (media.isVideo) {
        await client.sendMessage(
          m.chat,
          { video: { url: media.url }, caption, mimetype: "video/mp4" },
          { quoted: m }
        );
      } else {
        await client.sendMessage(
          m.chat,
          { image: { url: media.url }, caption },
          { quoted: m }
        );
      }
    }

  } catch (err) {
    console.error(err);
    res(err);
  }
  }
};