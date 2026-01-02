


const axios = require("axios");

const handler = async (m, { args,text, client,res }) => {
  if (!text)
    return res("❌ Please provide a Facebook post URL");

  try {
    const api = `https://api.ootaizumi.web.id/downloader/facebook?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.downloads)
      return res("❌ Failed to fetch Facebook post");

    const r = data.result;

    let caption = `📱 *𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋*\n\n𝖳𝗁𝗎𝗆𝖻𝗇𝖺𝗂𝗅:\n${r.thumbnail}\n\n𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗌:`;

    r.downloads.forEach((d, i) => {
      caption += `\n${i + 1}. ${d.quality}`;
    });

   
    let videoDownload = r.downloads.find(d => d.quality.includes("720p")) || r.downloads[0];

    
    let isImage = videoDownload.quality.toLowerCase().includes("image");

    await client.sendMessage(
      m.chat,
      isImage
        ? { image: { url: videoDownload.url }, caption }
        : { video: { url: videoDownload.url }, caption, mimetype: "video/mp4" },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    res(err);
  }
};

handler.command = ["facebook", "fb", "fbdown"];
handler.help = ["facebook <url>"];
handler.tags = ["downloader"];

module.exports = handler;
