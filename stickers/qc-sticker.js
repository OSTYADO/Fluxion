
require('../../settings');
const axios = require('axios')
module.exports = {
    type: "sticker",     
    command: ["qcsticker"], 
    help: ["qcsticker"],
    tags: ["convert"],       

    operate: async (context) => {
        const { m, text, pushname,prefix,command,reaction, client, res } = context;
    if (!text) return res(`\n*ex:* ${prefix + command} hallo\n`);
    await reaction(m.chat, '⚡')
        
        const obj = {
            type: 'quote',
            format: 'png',
            backgroundColor: '#232023',
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
                entities: [],
                avatar: true,
                from: {
                    id: 1,
                    name: `${pushname}`,
                    photo: {
                        url: await client.profilePictureUrl(m.sender, "image").catch(() => 
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        ),
                    }
                },
                text: text,
                replyMessage: {},
            }],
        };

        const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const buffer = Buffer.from(response.data.result.image, 'base64');
        let encmedia = await client.sendImageAsSticker(m.chat, buffer, m, {
                packname: packname,
                author: author,
            });
    }
    };
