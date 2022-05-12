const fs = require('fs');
const path = require('path');

(async function copyDir(dir) {
    const copyDirName = `${dir}-copy`;
    await fs.promises.mkdir(path.join(__dirname, copyDirName), {recursive: true});
    fs.promises.readdir(path.join(__dirname, dir))
        .then(files => files.map(file => fs.promises.copyFile(path.join(__dirname, dir, file), path.join(__dirname, copyDirName, file))));    
})('files');