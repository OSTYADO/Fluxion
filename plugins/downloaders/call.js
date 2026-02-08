const fetch = require("node-fetch");

module.exports = {
  type: "Canvas",
  command: ["fakecall"],
  help: ["fakecall <name>|<duration>"],
  tags: ["tools"],

  operate: async (context) => {
    const { m, text,res,client,isCreator,reaction } = context;
  if(!isCreator) return res(mess.owner);
    if (!text) return res("⚠️ Usage: fakecall Name | Duration");
 await reaction(m.chat,"🤳");
    const parts = text.split("|").map(p => p.trim());
    const name = parts[0] || "Caller";
    const duration = parts[1] || "01:00";

   
    const avatar = await client.profilePictureUrl(m.sender, "image").catch(
      (_) => "https://i.imgur.com/vuxJCTB.jpeg"
    );

    try {
      const apiUrl = `https://api.ostyado.space/api/ongoingcall?name=${encodeURIComponent(
        name
      )}&duration=${encodeURIComponent(duration)}&avatar=${encodeURIComponent(avatar)}`;

     
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`API request failed: ${res.status}`);

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

     
      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: `📞 Ongoing Call: ${name}`,
        },
        { quoted: m }
      );

    } catch (err) {
      console.error(err);
      m.reply("❌ Failed to generate ongoing call image");
    }
  },
};