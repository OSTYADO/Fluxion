const fetch = require("node-fetch");
let handler = async (m,{res,fetchJson, text, prefix, reaction}) =>{

if (!text) { return m.reply("𝚃𝚑𝚒𝚜 𝚒𝚜 𝚐𝚘𝚗𝚗𝚊 𝚋𝚎 𝚏𝚞𝚗,𝙰𝚜𝚔 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐 𝚒𝚖 𝚝𝚑𝚎 𝚙𝚎𝚛𝚏𝚎𝚌𝚝 𝚛𝚘𝚐𝚞𝚎 𝚐𝚙𝚝😜");
	   }
	try {
     const data = await fetchJson(`https://bk9.fun/ai/deepseek-r1?q=${text}`);
		
    if (data && data.result) {
	    const sos = data.result;
	    await m.reply(sos);
    } else {
	    m.reply("𝚂𝚎𝚎𝚖𝚜 𝚝𝚑𝚎 𝙰𝙿𝙸 𝚑𝚊𝚍 𝚝𝚘 𝚖𝚞𝚌𝚑 𝚏𝚞𝚗 𝚝𝚘𝚍𝚊𝚢😩");
    }
	} catch (error) {
m.reply('An error occured with the APIs\n' + error);
}
  }
  handler.help = ["darkgpt"];
  handler.tags = ["ai"];
  handler.command = ["darkgpt"];
  module.exports = handler;