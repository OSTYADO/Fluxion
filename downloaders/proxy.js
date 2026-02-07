const fetch = require("node-fetch");
module.exports = {
    type: "proxy",     
    command: ["proxy"], 
    help: ["proxy"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction,prefix, client, res } = context;
        try{
        await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
        
        const response = await fetch('https://zelapioffciall.koyeb.app/random/proxy');
        if (!response.ok) {
            throw new Error(`🍂 *HTTP Error!* Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.status || !data.proxy) {
            throw new Error('🍂 *𝖭𝗎𝗅𝗅 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖿𝗋𝗈𝗆 𝖺𝗉𝗂');
        }
        
        const proxy = data.proxy;
        const message = `
✅ *𝖯𝗋𝗈𝗑𝗒 𝖽𝖾𝗍𝖺𝗂𝗅𝗌*

📍 *𝖨𝗉 𝖺𝖽𝖽𝗋𝖾𝗌𝗌:* ${proxy.ip}
🚪 *𝗉𝗈𝗋𝗍:* ${proxy.port}
🌍 *𝖢𝗈𝗎𝗇𝗍𝗋𝗒:* ${proxy.country}
🏢 *𝖮𝗋𝗀𝖺𝗇𝗂𝗌𝖺𝗍𝗂𝗈𝗇:* ${proxy.org}
⚡ *𝖫𝖺𝗍𝖾𝗇𝖼𝗒:* ${proxy.latency} ms
🕵️ *𝖠𝗇𝗈𝗇𝗒𝗆𝗂𝗍𝗒:* ${proxy.anonymity}
🔗 *𝖥𝗎𝗅𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌 :* ${proxy.full}
        `.trim();
        
       return res(message);
        
    } catch (error) {
       return res( `🍂 *𝖯𝗋𝗈𝗑𝗒 𝖾𝗋𝗋𝗈𝗋!*\n𝖤𝗋𝗋𝗈𝗋: ${error.message}`);
    } finally {
        await client.sendMessage(m.chat, { react: { text: '❓', key: m.key } });
    }
    }
};