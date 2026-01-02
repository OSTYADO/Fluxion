
const axios = require("axios");
 let handler = async (m,{res, text,  client, prefix, reaction}) =>{
if (!text) return res(`What do you want to define?`)
try {
targetfine = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`)
if (!targetfine) return res('𝘼𝙣 𝙚𝙧𝙧𝙤𝙧 𝙤𝙘𝙘𝙪𝙧𝙧𝙚𝙙 ')
const replied = `
*📑𝙒𝙤𝙧𝙙 :* ${q}
*🧐𝘿𝙚𝙛𝙞𝙣𝙖𝙩𝙞𝙤𝙣:* ${targetfine.data.list[0].definition
    .replace(/\[/g, "")
    .replace(/\]/g, "")}
*🤔 𝙀𝙭𝙖𝙢𝙥𝙡𝙚:* ${targetfine.data.list[0].example
    .replace(/\[/g, "")
    .replace(/\]/g, "")}`
   client.sendMessage(m.chat,{text:replied},{quoted:m})
} catch (err) {
    console.log(err)
    return res(`*${q}* isn't a valid text`)
    }
    };
    handler.help = ["define"];
    handler.tags = ["search"];
    handler.command = ["define"];
    module.exports = handler;