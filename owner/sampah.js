

const fs = require("fs")
module.exports = {
    type: "owner",     
    command: ["listtmp","junkfiles", "listjunk"], 
    help: ["temporary files"],
    tags: ["owner"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;


    let all = await fs.readdirSync('./tmp')
    let teks = `Junk files\n\n`
    teks += `total : ${all.filter(v => v.endsWith("gif") ||
                                  v.endsWith("png") ||
                                  v.endsWith("mp3") ||
                                  v.endsWith("mp4") ||
                                  v.endsWith("jpg") ||
                                  v.endsWith("jpeg") || 
                                  v.endsWith("webp") ||
                                  v.endsWith("webm") ).map(v=>v).length}📂

To clear the junk files, type:
${prefix}clearjunk

This command will delete all contents in the trash.\n`
     teks += all.filter(v => v.endsWith("gif") ||
                        v.endsWith("png") ||
                        v.endsWith("mp3") ||
                        v.endsWith("mp4") ||
                        v.endsWith("jpg") ||
                        v.endsWith("jpeg") ||
                        v.endsWith("webp") ||
                        v.endsWith("webm") ).map(o=>`${o}\n`).join("");
    res(teks)
}
};
