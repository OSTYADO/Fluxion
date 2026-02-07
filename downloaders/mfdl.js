const axios = require("axios");
module.exports = {
    type: "mediafire",     
    command: ["mfdl","mediafire"], 
    help: ["mfdl <query>"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

  if (!text)
    return res ("𝘗𝘳𝘰𝘷𝘪𝘥𝘦 𝘮𝘦𝘥𝘪𝘢𝘧𝘪𝘳𝘦 𝘭𝘪𝘯𝘬");
    await reaction(m.chat,"📠");

  try {
    const api = `https://api.ootaizumi.web.id/downloader/mediafire?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.status)
      return res("𝘍𝘢𝘪𝘭𝘦𝘥 𝘵𝘰 𝘧𝘦𝘵𝘤𝘩 𝘧𝘪𝘭𝘦");

    const r = data.result;

    let caption = `📦𝘔𝘦𝘥𝘪𝘢𝘧𝘪𝘳𝘦 𝘥𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘦𝘳*

📄 𝘕𝘢𝘮𝘦: ${r.name}
📁 𝘛𝘺𝘱𝘦: ${r.type}
📊 𝘚𝘪𝘻𝘦: ${r.size}
📆 𝘋𝘢𝘵𝘦: ${r.date}
🌍 𝘓𝘰𝘤𝘢𝘵𝘪𝘰𝘯 : ${r.location}
`;

    await client.sendMessage(
      m.chat,
      {
        document: { url: r.url },
        fileName: r.name,
        mimetype: "application/zip",
        caption
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    res("❌ Error while downloading MediaFire file");
  }
  }
};