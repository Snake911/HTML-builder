const fs = require('fs');
const path = require('path');

(async function copyDir(dir) {
    const copyDirName = `${dir}-copy`;

    await fs.promises.mkdir(path.join(__dirname, copyDirName), {recursive: true});

    const files = await fs.promises.readdir(path.join(__dirname, copyDirName));
    for (const file of files) {
      await fs.promises.unlink(path.join(__dirname, copyDirName, file));
    }
    
    await fs.promises.readdir(path.join(__dirname, dir))
        .then(files => files.map(file => fs.promises.copyFile(path.join(__dirname, dir, file), path.join(__dirname, copyDirName, file))));    
})('files');