const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = require('process');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

rl.setPrompt('Hello!\n');

rl.prompt();

rl.on('line', (input) => {
    if(input === 'exit') {
        rl.close();
        input = '';
    }
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        input + '\n',
        (err) => {
            if (err) throw err;
        }
    );    
});

rl.on('close', () => {
    console.log('Good bye!');   
});
