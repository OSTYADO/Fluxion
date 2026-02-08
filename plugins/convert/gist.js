const axios = require("axios");

module.exports = {
    type: "Downloader",
    command: ["gist"],
    help: ["gist <Gist URL>"],
    tags: ["downloader"],

    operate: async (context) => {
        const { m, text, client, res, prefix, command } = context;

        if (!text) {
            return res(`Usage: ${prefix}${command} <Gist URL>`);
        }

        if (!text.includes("gist.github.com")) {
            return res("Please provide a valid Gist URL.");
        }

        try {
            const API = "https://api.ostyado.space/api/gist";
            const apiUrl = `${API}?url=${encodeURIComponent(text)}`;

            const apiResponse = await axios.get(apiUrl);
            const data = apiResponse.data;

            if (!data || !data.data?.files || data.data.files.length === 0) {
                return res("No files found in this Gist.");
            }

            // Loop through all files and send them
            for (const file of data.data.files) {
                await client.sendMessage(m.chat, {
                    document: { url: file.raw_url },
                    fileName: file.name,
                    caption: `📄 Gist File\nOwner: ${data.data.owner}\nGist ID: ${data.data.gist_id}`
                });
            }

        } catch (err) {
            console.error(err);
            return res("An error occurred while fetching the Gist.");
        }
    }
};