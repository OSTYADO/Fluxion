const fetch = require("node-fetch");
let handler = async (m,{res,fetchJson, text, prefix, reaction}) =>{
if (!text) return m.reply('What do you want to ask?')
let dataa = await fetchJson(`https://ai.nevolution.team/nevo?apikey=akbarrdev&prompt=${text}`)
let unvo = dataa.response
m.reply(unvo)
}
handler.help = ["nevoai"];
handler.tags = ["ai"];
handler.command = ["nevo"];
module.exports = handler; 