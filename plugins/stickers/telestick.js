const axios = require("axios");
module.exports = {
    type: "sticker",     
    command: ["telestick","tgs"], 
    help: ["telestick"],
    tags: ["convert"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;
  if (!text)
    return res(
  
      "❌ Please provide a Telegram sticker pack URL\n\nExample:\n.telegramsticker https://t.me/addstickers/Peepo_Pepe"
    );
    await reaction(m.chat,"🗃");

  try {
    const api = `https://api.ootaizumi.web.id/downloader/telegram-sticker?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.stickers?.length)
      return res("𝖢𝗈𝗎𝗅𝖽𝗇𝗍 𝗅𝗈𝖺𝖽 𝗌𝗍𝗂𝖼𝗄𝖾𝗋 ");

    const pack = data.result;

res(`𝖳𝖾𝗅𝖾𝗀𝗋𝖺𝗆 𝗌𝗍𝗂𝖼𝗄𝖾𝗋𝗌*\n\n📛 𝖭𝖺𝗆𝖾: ${pack.name}\n📝 𝖳𝗂𝗍𝗅𝖾: ${pack.title}\n📦 𝖳𝗈𝗍𝖺𝗅: ${pack.stickers.length}`
       );

    for (const s of pack.stickers) {
      if (!s.image_url) continue;

      await client.sendMessage(
        m.chat,
        {
          sticker: { url: s.image_url }
        },
        { quoted: m }
      );
    }

  } catch (err) {
    console.error(err);
    res("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝗌𝗍𝗂𝖼𝗄𝖾𝗋𝗌");
  }
  }
};