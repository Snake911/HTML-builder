const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
    .then((names) => {
        const files = names.filter(file => file.isFile());        
        files.map(file => {
            const pathToFile = path.join(__dirname, 'secret-folder', file.name);
            fs.stat(pathToFile, (error, data) => {
                console.log(`${path.parse(pathToFile).name} - ${path.parse(pathToFile).ext.slice(1)} - ${data.size / 1024}kb`);            
            });            
        });
    });

