const fs = require('fs')
const process = require('process')
const axios = require('axios')


const read = (arg) => {
    fs.readFile(arg, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n \t${err}`);
            process.exit(1);
        }

        return data;
    }
    );
}

const output = (path, data) => {
    fs.writeFile(path, data, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n \t${err}`);
            process.exit(1);
        }

        console.log('Sucess');
    })
}


async function fetch(URL) {
    try{
    let res = await axios.get(URL)
    return res.data;
    }
    catch(err) {
            console.log(`Error fetching ${URL}: \n \t${err}`);
            process.exit(1);
        }
};


function isHTTP(arg) {
if (arg.slice(0,4) === 'http') {
    return true
    }
else {
    return false
    }
}


const cat = (arg) => {
    let link = isHTTP(arg);
    if(link) {
        let data = fetch(link)
        console.log(data)
    }
    else {
        let data = read(link)
        console.log(data)
    }
}


// cat(process.argv[2]);




function catWrite(comd, path,file) {
    if (comd == '--out') {
    let link = isHTTP(arg)
    if (link) {
        let data = fetch(file)
        output(path, data)

        }
    else {
        let data = read(link)
        output(path, data)
        }
    }
};

catWrite(process.argv[0], process.argv[1], process.argv[2])
