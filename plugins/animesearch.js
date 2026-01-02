const axios = require("axios");
  let handler = async (m,{res, text,client,prefix, reaction}) => {

  const link = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(link);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 𝚃𝚒𝚝𝚕𝚎: ${title}\n🎬 𝙴𝚙𝚒𝚜𝚘𝚍𝚎𝚜: ${episodes}\n📡 𝚂𝚝𝚊𝚝𝚞𝚜: ${status}\n📝 𝚜𝚢𝚗𝚘𝚙𝚜𝚒𝚜 : ${synopsis}\n🔗 URL: ${data.url}`;

    await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });
  } catch (error) {
    
   m.reply('𝙴𝚛𝚛𝚘𝚛 𝚠𝚑𝚎𝚗 𝚕𝚘𝚊𝚍𝚒𝚗𝚐 ');
  }
	}
	handler.help = ["animesearch"];
	handler.tags = ["search"];
	handler.command = ["anime","randomanime"];
	module.exports = handler;
  