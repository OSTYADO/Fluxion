const axios = require('axios');
module.exports = {
    type: "lyrics",     
    command: ["lyrics"], 
    help: ["lyrics <query>"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, prefix,reaction, client, res } = context;


    if (!text) {
        return res(`Invalid format!\n\nUsage: ${prefix} lyrics ten toes`);
    }

    await reaction(m.chat, "🎶");

    const BASE_URL = "https://zelapioffciall.koyeb.app/search/lirik";

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: text.trim()
            },
            headers: {
                'accept': 'application/json'
               
            }
        });

        const result = response.data;

        if (result.status === true && result.result?.lyrics) {

            const song = result.result;

            const replyText = `
*𝘓𝘺𝘳𝘪𝘤𝘴!*

*𝘕𝘢𝘮𝘦:* ${song.track || 'N/A'}
*𝘈𝘳𝘵𝘪𝘴𝘵:* ${song.artist || 'N/A'}
*𝘈𝘭𝘣𝘶𝘮:* ${song.album || 'N/A'}
*𝘋𝘶𝘳𝘢𝘵𝘪𝘰𝘯:* ${song.duration || 'N/A'}

*--𝘓𝘺𝘳𝘪𝘤𝘴--*
${song.lyrics.trim()}
            `;

            await res(replyText.trim());

        } else {
            res(`Failed to search song lyrics. API message: ${result.message || 'Lyrics were not found for this song.'}`);
        }

    } catch (error) {
        let errorMessage = `connection error occurred while contacting the API.`;
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}. Message: ${error.response.data?.message || 'Server API Error'}.`;
        }
        res(errorMessage);
    }
    }
};