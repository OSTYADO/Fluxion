const fetch = require("node-fetch");

async function uploadImage(buffer) {
    const blob = new Blob([buffer], { type: "image/jpeg" });
    const form = new FormData();
    form.append("files[]", blob, "image.jpg");

    const res = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: form
    });

    const json = await res.json();
    return json.files?.[0]?.url;
}

async function getAnimeTitle(anilistId) {
    const query = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            title {
                romaji
                english
                native
            }
        }
    }`;

    const variables = { id: anilistId };

    const res = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables })
    });

    const json = await res.json();
    return json.data?.Media?.title || {};
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
}

function getBestFrame(r) {
    if (!r?.anilist || !r?.filename || !r?.at || !r?.tokenthumb) return null;
    return `https://api.trace.moe/image/${r.anilist}/${encodeURIComponent(r.filename)}?t=${r.at}&token=${r.tokenthumb}`;
}
module.exports = {
    type: "whatanime",     
    command: ["whatanime","trace"], 
    help: ["trace"],
    tags: ["Anime"],       

    operate: async (context) => {
        const { m, text, reaction,prefix,command,client, res } = context;
    try {
        let q = m.quoted && (m.quoted.mimetype || m.quoted.mediaType) ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";

        if (!mime.startsWith("image/")) {
            return m.reply(
                `Quote an image with ${prefix + command}\n`
            );
        }

        await client.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        let buffer = await q.download();
        if (!buffer) return m.reply(`Error downloading media`);

        let imageUrl = await uploadImage(buffer);
        if (!imageUrl) return m.reply(`Error uploading image`);

        const apiUrl = `https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.result || !data.result.length) {
            return m.reply(`Error fetching anime details`);
        }

        const results = data.result.sort((a, b) => b.similarity - a.similarity);

        if (results[0].similarity < 0.7) {
            return m.reply(`🍂 *Kemiripan terlalu rendah untuk hasil yang akurat.*`);
        }

        let output = `*🔍 Anime trace*\n\n`;

        for (const [i, r] of results.slice(0, 3).entries()) {
            const title = await getAnimeTitle(r.anilist);

            output += `*🎬 Hasil #${i + 1}*\n`;
            output += `• *Romaji:* ${title.romaji || "N/A"}\n`;
            output += `• *ENGLISH:* ${title.english || "N/A"}\n`;
            output += `• *NATIVE:* ${title.native || "N/A"}\n`;
            output += `• *EPISODE:* ${r.episode || "N/A"}\n`;
            output += `• *TIME:* ${formatTime(r.from)} - ${formatTime(r.to)}\n`;
            output += `• *Kecocokan:* ${(r.similarity * 100).toFixed(2)}%\n`;
            output += `• *PREVIEW:* ${r.image}\n`;

            if (i < 2) output += "\n━━━━━━━━━━━━━━\n\n";
        }

        const best = results[0];
        const bestFrame = getBestFrame(best);

        if (bestFrame) {
            await client.sendMessage(m.chat, {
                image: { url: bestFrame },
                caption: output
            });
        } else if (best.image) {
            await client.sendMessage(m.chat, {
                image: { url: best.image },
                caption: output
            });
        } else {
            await m.reply(output);
        }

    } catch (e) {
        m.reply(`🍂 ${e.message}`);
    } finally {
        await client.sendMessage(m.chat, { react: { text: "", key: m.key } });
    }
    }
};