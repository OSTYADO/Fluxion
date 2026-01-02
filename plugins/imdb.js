const axios = require("axios");
let handler = async (m,{res,client, text, prefix, reaction}) =>{
if (!text) return res(`𝙽𝚊𝚖𝚎 𝚊 𝚜𝚎𝚛𝚒𝚎𝚜 𝚘𝚛 𝚖𝚘𝚟𝚒𝚎 `)
res(mess.wait)
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` 𝙄𝙢𝙙𝙗 𝙎𝙚𝙖𝙧𝙘𝙝```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬𝚃𝚒𝚝𝚕𝚎      : " + fids.data.Title + "\n"
            imdbt += "📅𝚈𝚎𝚊𝚛      : " + fids.data.Year + "\n"
            imdbt += "⭐𝚁𝚊𝚝𝚎𝚍      : " + fids.data.Rated + "\n"
            imdbt += "📆𝚁𝚎𝚕𝚎𝚊𝚜𝚎𝚍   : " + fids.data.Released + "\n"
            imdbt += "⏳𝚁𝚞𝚗𝚝𝚒𝚖𝚎   : " + fids.data.Runtime + "\n"
            imdbt += "🌀𝙶𝚎𝚗𝚛𝚎      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻𝙳𝚒𝚛𝚎𝚌𝚝𝚘𝚛   : " + fids.data.Director + "\n"
            imdbt += "✍𝚆𝚛𝚒𝚝𝚎𝚛     : " + fids.data.Writer + "\n"
            imdbt += "👨𝙰𝚌𝚝𝚘𝚛𝚜    : " + fids.data.Actors + "\n"
            imdbt += "📃𝙿𝚕𝚘𝚝      : " + fids.data.Plot + "\n"
            imdbt += "🌐𝙻𝚊𝚗𝚐𝚞𝚊𝚐𝚎   : " + fids.data.Language + "\n"
            imdbt += "🌍𝙲𝚘𝚞𝚗𝚝𝚛𝚢   : " + fids.data.Country + "\n"
            imdbt += "🎖️𝙰𝚠𝚊𝚛𝚍𝚜    : " + fids.data.Awards + "\n"
            imdbt += "📦𝙱𝚘𝚡 𝚘𝚏𝚏𝚒𝚌𝚎  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️𝙿𝚛𝚘𝚍𝚞𝚌𝚝𝚒𝚘𝚗 : " + fids.data.Production + "\n"
            imdbt += "🌟𝙸𝚖𝚍𝚋 𝚁𝚊𝚝𝚒𝚗𝚐 : " + fids.data.imdbRating + "\n"
            imdbt += "✅𝙸𝚖𝚍𝚋 𝚟𝚘𝚝𝚎𝚜 : " + fids.data.imdbVotes + ""
           client.sendMessage(m.chat, {
image: {
url: fids.data.Poster,
},
caption: imdbt,
            }, {
quoted: m,
            })
            };
            
     handler.help = ["imdb"];
     handler.tags = ["search"];
     handler.command = ["imdb"];
     module.exports = handler;	 


