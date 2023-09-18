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

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
};
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const productCardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// Server dengan HTTP
const server = http.createServer((req, res) => {
    // const pathName = req.url;
    const { pathname: pathName, query } = url.parse(req.url, true);

    // HELLO PAGE
    if (pathName === '/hello') {
        res.end('ini hello ke FSW 2');

        // Product oage
    }

    // simple api
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);

        // overview page
    } else if (pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const productCardHtml = dataObj.map(el => replaceTemplate(productCardTemplate, el));
        const output = overviewPage.replace('{%PRODUCT_CARDS%}', productCardHtml);

        res.end(output);

        // Product page
    } else if (pathName === '/product') {
        // console.log(query);
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(productTemplate, product);
        res.end(output);


    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>url ini gak ada apa apa cuy !</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Hello server berjalan');
});