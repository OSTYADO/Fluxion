const axios = require("axios");
let handler = async (m,{res,client,command,text, prefix, reaction}) =>{
await reaction(m.chat,"🪀");
  axios.get(`https://api.waifu.pics/sfw/${command}`)
    .then(({ data }) => {
     client.sendMessage(from, { 
        image: { url: data.url }, 
        caption: '𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙚' 
      }, { quoted: m });
    })
    .catch((err) => {
      console.error(err);
      client.sendMessage(m.chat, { text: '𝙊𝙤𝙥𝙨 𝙘𝙤𝙪𝙡𝙙𝙣\'𝙩 𝙛𝙚𝙩𝙘𝙝.' }, { quoted: m });
    });
    };
    handler.help = ["sfw"];
    handler.tags = ["convert"];
    handler.command = ["handhold", "kiss", "highfive","cringe","dance","happy","glomp","smug","blush","wave","smile","slap","nom","poke","wink","bonk","yeet","bite","lick","pat","kill","randomsfw"];
    module.exports = handler;
          