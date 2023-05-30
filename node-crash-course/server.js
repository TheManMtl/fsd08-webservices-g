const http = require('http');
const _=require('lodash');


const server= http.createServer((req,res)=>{
    console.log(req.url,req.method);

    res.setHeader('Content-Type','text/plain');
    res.write('response from server');
    res.end();

});

server.listen(2854,'localhost',()=>{
    console.log('Listning to 2854');
});