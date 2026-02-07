

const fs = require("fs")
const path = require("path")
module.exports = {
    type: "owner",     
    command:  ["clearjunk", "cleartmp"], 
    help: ["clearjunk"],
    tags: ["owner"],       

    operate: async (context) => {
        const { m, text, reaction, client, res } = context;

    let directoryPath = path.join('./tmp')
    fs.readdir(directoryPath, 
               async function (err, files) {
        if (err) return res('\nunable to scan directory ' + err + '\n');
        
        let filteredArray = await files.filter(item => item.endsWith("gif") || 
                                               item.endsWith("png") ||
                                               item.endsWith("mp3") ||
                                               item.endsWith("mp4") || 
                                               item.endsWith("jpg") || 
                                               item.endsWith("jpeg") || 
                                               item.endsWith("webp") ||
                                               item.endsWith("webm") 
                                            )
        let teks = `\n Detected ${filteredArray.length}  temp files \n\n`
        if (filteredArray.length == 0) return res(teks)
        filteredArray.map(function(e, i){
            teks += (i+1)+`. ${e}\n`
        })
        
        res(teks)
        await sleep(2000)
        res("\nClearing junk files...\n")
        await filteredArray.forEach(function (file) {
            fs.unlinkSync(`./tmp/${file}`)
        });
        
        await sleep(2000)
        res("\n Successfully deleted Junk files\n")
    });
}
};
