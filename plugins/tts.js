const fetch = require("node-fetch");
let handler = async (m,{res,client,text, prefix, reaction}) =>{
  if (!text) {
    const listLangUrl = "https://api.hiuraa.my.id/info/tts-lang";
    try {
      const response = await fetch(listLangUrl);
      const data = await response.json();
      let langList = "Masukkan teks yang ingin diubah menjadi suara!\n\nContoh: tts <bahasa> <teks>\n\nList Bahasa:\n";
      for (const [code, name] of Object.entries(data.result)) {
        langList += `${code} - ${name}\n`;
      }
      return m.reply(langList);
    } catch (error) {
      console.error('Error fetching language list:', error);
      return m.reply("Masukkan teks yang ingin diubah menjadi suara!\n\nContoh: tts id Selamat pagi!");
    }
  }
  const args = text.split(' ');
  if (args.length < 2) {
    return m.reply('Format salah! Masukkan bahasa dan teks.\n\nContoh: tts id Selamat pagi!');
  }
  const bahasa = args[0];
  const teks = args.slice(1).join(' ');
  try {
    const apiUrl = `https://api.hiuraa.my.id/tools/tts?text=${encodeURIComponent(teks)}&lang=${bahasa}`;
    m.reply('*Sedang memproses audio...*');
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    await client.sendMessage(
      m.chat,
      { 
        audio: Buffer.from(buffer), 
        mimetype: 'audio/mpeg', 
        ptt: true,
        caption: `Text to Speech: ${bahasa}` 
      },
      { quoted: m }
    );
  } catch (error) {
    console.error('Error in TTS:', error);
    m.reply('Terjadi kesalahan saat mengubah teks menjadi suara. Pastikan kode bahasa yang digunakan valid.');
  }
}
handler.help = ["tts"];
handler.tags = ["ai"];
handler.command = ["say", "tts"];
module.exports = handler;




