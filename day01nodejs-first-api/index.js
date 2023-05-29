import { createServer } from "http";
const port = 3001;
const server = createServer();

server.on("request", (request, response) => {
    console.log(`URL: ${request.url}`);
	response.end("me, Ehsan!");
});

server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
	console.log(`Server is listening on port ${port}`);
});