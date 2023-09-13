const http = require('http');
const fs = require('fs');
const url = require('url');

// bloking code execution => synchronous
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// console.log(textIn);

// const textOut = `ini penjelasan tentang alpukat di bahasa inggris : ${textIn}`;
// fs.writeFileSync('./txt/ouput-penjelasan.txt', textOut);
// console.log(('sukses'));

// non-blocking code execution = asynchronous
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}`, err => {
//             console.log('Sukses menggabungkan data');
//         });
//     });
// });

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/final.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/test-gabung.txt', `${data2}\n${data3}`, err => {
//                 console.log('Sukses menggabungkan data');
//             });
//         });
//     });
// });
// console.log('hai FSW2');

// Server dengan HTTP
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/hello') {
        res.end('ini hello ke FSW 2');
    } else if (pathName === '/product') {
        res.end(JSON.stringify({
            data: 'ini product',
        }));
    } else if (pathName === '/api') {
        const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else if (pathName === '/overview') {
        const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(overviewPage);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>url ini gak ada apa apa cuy !</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Hello server berjalan');
});