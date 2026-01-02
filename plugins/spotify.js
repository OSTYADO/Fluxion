
const axios = require('axios')
let handler = async (m, { client, text,reaction,res }) => {
const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getToken = async () => {
  const rsl = await axios.post(
    TOKEN_ENDPOINT,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: "Basic " + basic,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return rsl.data.access_token;
};

const searchTrack = async (query, token) => {
  const rsl = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (rsl.data.tracks.items.length === 0) throw new Error("Lagu tidak ditemukan.");
  return rsl.data.tracks.items[0];
};

const getDownloadLink = async (trackUrl) => {
  const rsl = await axios.post(
    "https://spotydown.media/api/download-track",
    { url: trackUrl },
    { headers: { "Content-Type": "application/json" } }
  );
  if (!rsl.data.file_url) throw new Error("Gagal mengambil link download.");
  return rsl.data.file_url;
};


  if (!text) return res("provide A search term");

  await client.sendMessage(m.chat, { react: { text: "🍁", key: m.key } });

  try {
    const token = await getToken();
    const track = await searchTrack(text, token);
    const downloadUrl = await getDownloadLink(track.external_urls.spotify);

    await client.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: track.name,
          body: `ARTIST: ${track.artists.map((a) => a.name).join(", ")}`,
          thumbnailUrl: track.album.images[0]?.url,
          mediaType: 1,
          mediaUrl: track.external_urls.spotify,
          sourceUrl: track.external_urls.spotify,
        },
      },
    }, { quoted: m });

    await reaction(m.chat, "🕺🏼");

  } catch (err) {
    console.error(err);
    await client.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    m.reply("Gagal mengambil lagu. Coba lagi nanti.");
  }
};

handler.help = ["spotify"];
handler.tags = ["downloader"];
handler.command =["spotify"];

module.exports = handler;
