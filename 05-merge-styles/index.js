const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
    .then((files) => {
        const styles = files.filter(file => file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css');
        styles.map(style => {
            fs.promises.readFile(path.join(__dirname, 'styles', style.name))
                .then(css => {
                    fs.appendFile(
                        path.join(__dirname, 'project-dist/bundle.css'),
                        css.toString() + '\n',
                        (err) => {
                            if (err) throw err;
                        }
                    );
                });
        });
    });