const axios = require("axios");
const yts = require("yt-search");

module.exports = {
    type: "downloader",     
    command: ["playvid","tstv", "video", "playvideo", "pv"], 
    help: ["playvid <query>"],
    tags: ["downloader"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

        if (!text) {
            await res("❌ Provide a video name or query");
            return;
        }

      
        await reaction(m.chat, "📽");

        try {
            // Search YouTube
            const search = await yts(text);
            const video = search.videos[0];

            if (!video) {
                await res("𝘕𝘰 𝘷𝘪𝘥𝘦𝘰 𝘧𝘰𝘶𝘯𝘥");
                return;
            }

            // Call external downloader API
            const api = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(video.url)}&format=360`;
            const { data } = await axios.get(api, { timeout: 15000 }); // 15s timeout

            if (!data.status || !data.result?.download) {
                await replyURL("𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥 failed");
                return;
            }

            const r = data.result;

            // Prepare caption
            const caption = `🎬 *𝘍𝘓𝘜𝘟𝘐𝘖𝘕*

📌 𝘛𝘪𝘵𝘭𝘦: ${r.title}
👁 𝘝𝘪𝘦𝘸𝘴: ${r.metadata.view}
📆 𝘜𝘱𝘭𝘰𝘢𝘥: ${r.metadata.ago}
📺 𝘊𝘩𝘢𝘯𝘯𝘦𝘭: ${r.author.channelTitle}`;

            // Send video
            await client.sendMessage(
                m.chat,
                {
                    video: { url: r.download },
                    caption,
                    mimetype: "video/mp4"
                },
                { quoted: m }
            );

        } catch (err) {
            console.error("Error in YouTube downloader plugin:", err);
            await res("❌ Error while processing video");
        }
    }
};