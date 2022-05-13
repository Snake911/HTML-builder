const fs = require('fs');
const path = require('path');

const buildDir = 'project-dist';

(async function build() {
    // Собираем шаблон
    await fs.promises.rm(path.join(__dirname, buildDir), {recursive: true, force: true});
    await fs.promises.mkdir(path.join(__dirname, buildDir), {recursive: true});
    let template = (await fs.promises.readFile(path.join(__dirname, 'template.html'))).toString();
    while(template.indexOf('{{') !== -1) {
        const component = template.match(/{{(.*)}}/)[1];
        const componentCode = (await fs.promises.readFile(path.join(__dirname, 'components', component + '.html'))).toString();
        const compNameReg = new RegExp(`{{${component}}}`);
        template = template.replace(compNameReg, componentCode);
    }
    fs.writeFile(
        path.join(__dirname, buildDir, 'index.html'),
        template,
        (err) => {
            if (err) throw err;
        }
    );

    // Собираем стили
    fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
        .then((files) => {
            const styles = files.filter(file => file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css');
            styles.map(style => {
                fs.promises.readFile(path.join(__dirname, 'styles', style.name))
                    .then(css => {
                        fs.appendFile(
                            path.join(__dirname, buildDir, 'style.css'),
                            css.toString() + '\n',
                            (err) => {
                                if (err) throw err;
                            }
                        );
                    });
            });
        });

    // Собираем ассеты
    (async function copyDir(dir) {
        await fs.promises.mkdir(path.join(__dirname, buildDir, dir), {recursive: true});
        fs.promises.readdir(path.join(__dirname, dir), {withFileTypes: true})
            .then(entities => { 
                entities.map(entity => {
                    if(entity.isFile()) {
                        fs.promises.copyFile(path.join(__dirname, dir, entity.name), path.join(__dirname, buildDir, dir, entity.name));
                    } else {
                        copyDir(path.join(dir, entity.name));
                    }               
                });
            });
    })('assets');
})();


