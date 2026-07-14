module.exports = {
    type: "createchannel",     
    command: ["createch"], 
    help: ["createchannel"],
    tags: ["convert"],       

    operate: async (context) => {
        const { m, text,isCreator,prefix,command, reaction, client, res } = context;
    if (!isCreator) return m.reply(mess.owner);
    let parts = text.split('|');
    let channelName = parts[0]?.trim();
    let channelDesc = parts[1]?.trim() ||"";
    if (!channelName) {
        return m.reply(`Example: 
${prefix + command} ChannelName|ChannelDesc`)}
    try {
        const metadata = await client.newsletterCreate(channelName, channelDesc);
        console.log(metadata);
        console.log('Channel metadata:', JSON.stringify(metadata, null, 2));
        let channelId;
        if (metadata && metadata.channelId) {
            channelId = metadata.channelId;
        } else if (metadata && metadata.id) {
            channelId = metadata.id;
        } else if (metadata && metadata.channel && metadata.channel.id) {
            channelId = metadata.channel.id;
        } else if (typeof metadata === 'string') {
            channelId = metadata;
        } else {
            const findId = (obj) => {
                if (!obj || typeof obj !== 'object') return null;
                for (const key in obj) {
                    if (key === 'id' || key === 'channelId' || key.toLowerCase().includes('id')) {
                        return obj[key];
                    }
                    if (typeof obj[key] === 'object') {
                        const nestedId = findId(obj[key]);
                        if (nestedId) return nestedId;
                    }
                }
                return null;
            };      
            channelId = findId(metadata);
        }
        if (!channelId) {
            console.warn('Warning: ChannelId tidak ditemukan di response, menggunakan fallback...');
            channelId = "unknown-channel-id";
        }
        let successDetails = [];
        successDetails.push(`✅ Channel "${channelName}" `);
        if (channelDesc) {
            successDetails.push(`✅ Description Added`);
        }
        successDetails.push(`\nID Channel: ${channelId}`);
        await client.sendMessage(m.chat, {
            text: successDetails.join('\n')
        });
    } catch (error) {
        console.error('Error creating channel:', error);
        m.reply(`${error.message}`);
    }
}
};