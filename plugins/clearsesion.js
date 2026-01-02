

const { 
  readdirSync,
  statSync,
  unlinkSync
} = require('fs');

const { join } = require('path');

let handler = async (m, { res, args }) => {
  const sesi = ['./session'];
  const array = [];

  sesi.forEach(dirname => {
    readdirSync(dirname).forEach(file => {
      if (file !== 'creds.json') { 
        array.push(join(dirname, file));
      }
    });
  });

  const deletedFiles = [];

  array.forEach(file => {
    const stats = statSync(file);

    if (stats.isDirectory()) {
      console.log(`skipping directory: ${file}`);
    } else {
      unlinkSync(file);
      deletedFiles.push(file);
    }
  });

  res('success');

  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
  }

  if (deletedFiles.length == 0) {
    res('SESSION DIRECTORY ALREADY CLEAN');
  }
};

handler.help = ['clearsession'];
handler.tags = ['owner'];
handler.command = ["csesi", "clearsesion"];
handler.owner = true;

module.exports = handler;
