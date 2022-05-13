const fs = require('fs');
const path = require('path');

(async function build() {
    const template = (await fs.promises.readFile(path.join(__dirname, 'template.html'))).toString();
    if(template.indexOf('{{') !== -1) {
        const component = template.match(/{{(.*)}}/)[1];
        const componentCode = (await fs.promises.readFile(path.join(__dirname, 'components', component + '.html'))).toString();
        template.replace(/{{component}}/, componentCode);
        console.log(template);
    }
})()