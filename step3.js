const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

function read(outPath, path, callback) {
    console.log(path);
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n \t${err}`);
            process.exit(1);
        } else {
            console.log(data)
            callback(outPath, data); // Pass data to the callback function
        }
    });
}

const output = (outPath, data) => {
    console.log(data)
    fs.writeFile(outPath, data, 'utf8', function(err) {
        if (err) {
            console.log(`Error writing ${outPath}: \n \t${err}`);
            process.exit(1);
        } else {
            console.log('Data written successfully.');
        }
    });
};

async function fetch(URL) {
    try {
        let res = await axios.get(URL);
        return res.data;
    } catch (err) {
        console.log(`Error fetching ${URL}: \n \t${err}`);
        process.exit(1);
    }
}

function isHTTP(arg) {
    if (arg.slice(0, 4) === 'http') {
        return true;
    } else {
        return false;
    }
}

async function catWrite(comd, outPath, path) {
    if (comd === '--out') {
        if (isHTTP(path)) {
            try {
                let data = await fetch(path);
                output(outPath, data);
            } catch (err) {
                console.log(`Error fetching ${path}: \n \t${err}`);
                process.exit(1);
            }
        } else {
            // Using a callback to handle the asynchronous result of read function
            read(outPath, path, function(data) {
                output(outPath, data);
            });
        }
    }
}

catWrite(process.argv[2], process.argv[3], process.argv[4]);
