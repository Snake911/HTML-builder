const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = require('process');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

rl.setPrompt('Hello! Write here 🠗\n');

rl.prompt();

fs.appendFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

rl.on('line', (input) => {
    if(input === 'exit') {
        rl.close();
        return;
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
