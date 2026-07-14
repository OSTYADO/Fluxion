const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

module.exports = {
  name: "toaudio",
  command: ["tovn"],
  help: ["Extract audio from video"],
  tags: ["media"],

  operate: async (context) => {
  const {res,client,prefix,m} = context;
    try {
      // Check reply
      const quoted = m.quoted || m.msg?.contextInfo?.quotedMessage;

      if (!quoted) {
        return res("Reply to a video message.");
      }

      // Detect video
      const mime =
        quoted.mimetype ||
        quoted.videoMessage?.mimetype ||
        "";

      if (!mime.includes("video")) {
        return m.reply("Reply to a video file.");
      }

      res("⏳ Extracting audio...");

      // Download video
      const videoBuffer = await client.downloadMediaMessage(
        m.quoted || m
      );

      const tempDir = path.join(__dirname, "../temp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const inputPath = path.join(
        tempDir,
        `${Date.now()}.mp4`
      );

      const outputPath = path.join(
        tempDir,
        `${Date.now()}.mp3`
      );

      fs.writeFileSync(inputPath, videoBuffer);

      // Convert to mp3
      ffmpeg(inputPath)
        .noVideo()
        .audioCodec("libmp3lame")
        .format("mp3")
        .save(outputPath)
        .on("end", async () => {
          await client.sendMessage(
            m.chat,
            {
              audio: fs.readFileSync(outputPath),
              mimetype: "audio/mpeg",
              ptt: true,
            },
            { quoted: m }
          );

          // Cleanup
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        })
        .on("error", async (err) => {
          console.log(err);

          res("Failed to extract audio.");

          if (fs.existsSync(inputPath))
            fs.unlinkSync(inputPath);

          if (fs.existsSync(outputPath))
            fs.unlinkSync(outputPath);
        });
    } catch (err) {
      console.log(err);
      m.reply("An error occurred.");
    }
  },
};