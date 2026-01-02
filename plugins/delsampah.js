

const fs = require("fs")
const path = require("path")

let handler = async (m, { res, command, prefix, sleep }) => {
    let directoryPath = path.join('./start/tmp')
    fs.readdir(directoryPath, 
               async function (err, files) {
        if (err) return res('\ntidak dapat memindai direktori: ' + err + '\n');
        
        let filteredArray = await files.filter(item => item.endsWith("gif") || 
                                               item.endsWith("png") ||
                                               item.endsWith("mp3") ||
                                               item.endsWith("mp4") || 
                                               item.endsWith("jpg") || 
                                               item.endsWith("jpeg") || 
                                               item.endsWith("webp") ||
                                               item.endsWith("webm") 
                                            )
        let teks = `\nterdeteksi ${filteredArray.length} file sampah\n\n`
        if (filteredArray.length == 0) return res(teks)
        filteredArray.map(function(e, i){
            teks += (i+1)+`. ${e}\n`
        })
        
        res(teks)
        await sleep(2000)
        res("\nmenghapus file sampah...\n")
        await filteredArray.forEach(function (file) {
            fs.unlinkSync(`./start/tmp/${file}`)
        });
        
        await sleep(2000)
        res("\nberhasil menghapus semua sampah\n")
    });
}

handler.help = ['sampah user'];
handler.tags = ['owner'];
handler.command = ["delsampah", "dsampah"];
handler.owner = true;

module.exports = handler;
