
// 1

const fs = require('fs')
const process = require('process')

const cat = (path) => {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n \t${err}`);
            process.exit(1);
        }

        console.log(data);
    }
    );
}

cat(process.argv[2]);


// 2

