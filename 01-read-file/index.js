const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const fd = fs.createReadStream(path.join(__dirname, 'text.txt'));
fd.on('data', (data) => {
    stdout.write(data);
});
