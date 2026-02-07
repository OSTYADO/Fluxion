const axios = require("axios");

module.exports = {
  name: "facebook",
  command: ["facebook", "fb", "fbdown"],
  tags: ["downloader"],
  help: ["facebook <url>"],

  async run(m, ctx) {
    const { text, reply, res,client } = ctx;

    if (!text) {
      return res("❌ Please provide a Facebook post URL");
    }

    try {
      const api = `https://api.ootaizumi.web.id/downloader/facebook?url=${encodeURIComponent(text)}`;
      const { data } = await axios.get(api);

      if (data.status !== "success" || !data.result?.downloads?.length) {
        return res("❌ Failed to fetch Facebook post");
      }

      const r = data.result;

      let caption =
        `📱 *𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋*\n\n` +
        `𝖳𝗁𝗎𝗆𝖻𝗇𝖺𝗂𝗅:\n${r.thumbnail}\n\n` +
        `𝖠𝗏𝖺𝗂𝗅𝖻𝗅e 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗌:`;

      r.downloads.forEach((d, i) => {
        caption += `\n${i + 1}. ${d.quality}`;
      });

      const video =
        r.downloads.find(d => d.quality.includes("720")) ||
        r.downloads[0];

      const isImage = video.quality.toLowerCase().includes("image");

      await client.sendMessage(
        m.chat,
        isImage
          ? { image: { url: video.url }, caption }
          : { video: { url: video.url }, caption, mimetype: "video/mp4" },
        { quoted: m }
      );

    } catch (err) {
      console.error("[FB PLUGIN ERROR]", err?.response?.data || err.message);
      res("❌ Error fetching Facebook video");
    }
  }
};