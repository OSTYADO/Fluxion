const fetch = require("node-fetch");
let handler = async (m,{res,client, text, prefix, reaction}) => {
    if (!text) return res('𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚏𝚎𝚠  𝚕𝚒𝚗𝚎𝚜 𝚘𝚏 𝚕𝚢𝚛𝚒𝚌𝚜');

    const query = text; 
    const apiKey = 'P3QcawG2xePU7sIxOD-4KeVMU-2mti77t6RHbo93q84Xon8hvKniFYDpphcA1kjckDXBnhdnh5spgGzpB_EQgw'; 
    const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.response.hits.length) return res('𝙲𝚘𝚞𝚕𝚍𝚗\'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚍𝚊𝚝𝚊.');

        const song = data.response.hits[0].result; 
        const caption = `
🎵 *𝚜𝚘𝚗𝚐*
▢ *𝚃𝚒𝚝𝚕𝚎*: ${song.title}
▢ *𝙰𝚛𝚝𝚒𝚜𝚝*: ${song.primary_artist.name}
▢ *𝚄𝚛𝚕*: ${song.url}
        `.trim();
        if (song.song_art_image_url) {
            await client.sendMessage(m.chat, { image: { url: song.song_art_image_url }, caption }, { quoted: st });
        } else {
            res(caption);
        }
    } catch (err) {
        console.error(err);
        res('𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚝𝚑𝚒𝚜 𝚝𝚒𝚖𝚎');
    }
}

handler.help = ["findsong"];
handler.command = ['findsong']; 
handler.tags = ['search'];
module.exports = handler;