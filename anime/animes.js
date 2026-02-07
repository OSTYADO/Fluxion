const axios = require("axios");
module.exports = {
    type: "animesearch",     
    command: ["animesearch"], 
    help: ["animesearch"],
    tags: ["Anime"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

if (!text) return res(`𝚆𝚑𝚒𝚌𝚑 𝚊𝚗𝚒𝚖𝚎 𝚊𝚛𝚎 𝚢𝚘𝚞 𝚕𝚘𝚘𝚔𝚒𝚗𝚐 𝚏𝚘𝚛`)
res(mess.wait)
            let anime = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(anime.data)
            imdbt += "⏣═════════════════⏣\n" + " ```𝘼𝙣𝙞𝙢𝙚 𝙎𝙚𝙖𝙧𝙘𝙝```\n" + "⏣═════════════════⏣\n"
            imdbt += "🎬𝙏𝙞𝙩𝙡𝙚      : " + anime.data.Title + "\n"
            imdbt += "📅𝙔𝙚𝙖𝙧       : " + anime.data.Year + "\n"
            imdbt += "⭐𝙍𝙖𝙩𝙚𝙙      : " + anime.data.Rated + "\n"
            imdbt += "📆𝙍𝙚𝙡𝙚𝙖𝙨𝙚𝙙   : " + anime.data.Released + "\n"
            imdbt += "⏳𝙍𝙪𝙣𝙩𝙞𝙢𝙚   : " + anime.data.Runtime + "\n"
            imdbt += "🌀𝙂𝙚𝙣𝙧𝙚      : " + anime.data.Genre + "\n"
            imdbt += "👨🏻‍💻𝘿𝙞𝙧𝙚𝙘𝙩𝙤𝙧   : " + anime.data.Director + "\n"
            imdbt += "✍𝙒𝙧𝙞𝙩𝙚𝙧     : " + anime.data.Writer + "\n"
            imdbt += "👨𝘼𝙘𝙩𝙤𝙧𝙨    : " + anime.data.Actors + "\n"
            imdbt += "📃𝙋𝙡𝙤𝙩      : " + anime.data.Plot + "\n"
            imdbt += "🌐𝙇𝙖𝙣𝙜𝙪𝙖𝙜𝙚   : " + anime.data.Language + "\n"
            imdbt += "🌍𝘾𝙤𝙪𝙣𝙩𝙧𝙮    : " + anime.data.Country + "\n"
            imdbt += "🎖️𝘼𝙬𝙖𝙧𝙙𝙨     : " + anime.data.Awards + "\n"
            imdbt += "📦𝘽𝙤𝙭 𝙤𝙛𝙛𝙞𝙘𝙚  : " + anime.data.BoxOffice + "\n"
            imdbt += "🏙️𝙋𝙧𝙤𝙙𝙪𝙘𝙩𝙞𝙤𝙣 : " + anime.data.Production + "\n"
              imdbt += "💠 *𝙀𝙥𝙞𝙨𝙤𝙙𝙚𝙨:" + anime.data.Episodes + "\n"
                imdbt += "🎋 *𝙏𝙮𝙥𝙚:" + anime.data.Type + "\n"
                  imdbt += "♦️ *𝙏𝙧𝙖𝙞𝙡𝙚𝙧:" + anime.data.Trailer + "\n"
            imdbt += "🌟𝙞𝙢𝙙𝙗 𝙧𝙖𝙩𝙞𝙣𝙜 : " + anime.data.imdbRating + "\n"
            imdbt += "✅𝙞𝙢𝙙𝙗 𝙫𝙤𝙩𝙚𝙨  : " + anime.data.imdbVotes + ""
           client.sendMessage(m.chat, {
image: {
url: anime.data.Poster,
},
caption: imdbt,
            }, {
quoted: st,
            })
            }
            }; 