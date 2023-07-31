const fs = require('fs')
const process = require('process')
const axios = require('axios')

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



async function webCat(URL) {
    try{
    let res = await axios.get(URL)
    console.log(res.data);
    }
    catch(err) {
            console.log(`Error fetching ${URL}: \n \t${err}`);
            process.exit(1);
        }
};


function callCat(arg) {
if (arg.slice(0,4) === 'http') {
    webCat(arg)
    }
else {
    cat(arg)
    }
}

callCat(process.argv[2]);



