const util = require("util");

module.exports = {
    type: "Owner",
    command: ["run","exec", "=>"],
    help: ["Reply to a message containing JavaScript"],
    tags: ["owner"],

    operate: async (context) => {
    const { client, m, text,res,isCreator} = context; 
    if(!isCreator) {
    return res("Owner command dummy");
    }
        if (!m.quoted) {
            return m.reply("Reply to a message containing JavaScript code.");
        }

        const code = m.quoted.text || m.quoted.body || "";

        if (!code) {
            return m.reply("The replied message doesn't contain any text.");
        }

        try {
            const result = await eval(`(async () => {
                ${code}
            })()`);

            if (result !== undefined) {
                await m.reply(util.inspect(result, { depth: 10 }));
            }
        } catch (err) {
            await m.reply(util.format(err));
        }
    }
};