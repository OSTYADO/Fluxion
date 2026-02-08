const axios = require("axios");
module.exports = {
    type: "stalk",     
    command: ["xstalk"], 
    help: ["xstalk username"],
    tags: ["stalk"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

  
    if (!text) return res("𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚇 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎");
    

    await client.sendMessage(m.chat, {
      react: { text: "⏳", key: m.key }
    });
try {
    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return res("⚠️ Failed to fetch Twitter/X user details. Ensure the username is correct.");
    }

    const user = data.data;
    const verifiedBadge = user.verified ? "✅" : "❌";

    const caption = `╭━━━〔 *𝙵𝚕𝚞𝚡𝚒𝚘𝚗 𝚇 𝚜𝚝𝚊𝚕𝚔𝚎𝚛* 〕━━━⊷\n`
      + `┃👤 *𝙽𝚊𝚖𝚎:* ${user.name}\n`
      + `┃🔹 *𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎:* @${user.username}\n`
      + `┃✔️ *𝚅𝚎𝚛𝚒𝚏𝚒𝚎𝚍:* ${verifiedBadge}\n`
      + `┃👥 *𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜:* ${user.followers_count}\n`
      + `┃👤 *𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐:* ${user.following_count}\n`
      + `┃📝 *𝚃𝚠𝚎𝚎𝚝𝚜:* ${user.tweets_count}\n`
      + `┃📅 *𝙹𝚘𝚒𝚗𝚎𝚍:* ${user.created}\n`
      + `┃🔗 *𝙿𝚛𝚘𝚏𝚒𝚕𝚎:* [Click Here](${user.url})\n`
      + `╰━━━⪼\n\n`
      + ``;

    await client.sendMessage(m.chat, {
      image: { url: user.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    res("❌ An error occurred while processing your request. Please try again.");
  }
}
};
