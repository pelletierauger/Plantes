var http = require('http');
var path = require('path');
var fs = require('fs');
var filenameFormatter = require('./filename-formatter.js');
var url = require('url');
let JSONs = [];

function handleRequest(req, res) {
    // What did we request?
    var pathname = req.url;
    var pathnametest = pathname;
    // console.log(pathname);
    var query = url.parse(req.url, true).query;

    var r = /\?/g;
    if (pathname.match(r)) {
        var re = /\?(.*)/gi;
        pathnametest = pathnametest.replace(re, ``);
        // console.log(pathnametest);
    }
    pathname = pathnametest;

    // console.log(query);
    // If blank let's ask for index.html
    if (pathname == '/') {
        pathname = '/index.html';
    }
    // Ok what's our file extension
    var ext = path.extname(pathname);
    // Map extension to file type
    var typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    //What is it?  Default to plain text
    var contentType = typeExt[ext] || 'text/plain';
    // Now read and write back the file with the appropriate content type
    fs.readFile(__dirname + pathname, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + pathname);
        }
        // Dynamically setting content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
    // res.end(JSON.stringify(query));
}

// Create a server with the handleRequest callback
var server = http.createServer(handleRequest);
// Listen on port 8080
server.listen(8080);
console.log('Server started on port 8080');

var io = require('socket.io').listen(server);

var clients = {};

io.sockets.on('connection', function(socket) {
    console.log("Client " + socket.id + " is connected.");

    socket.on('pullJSONs', function() {
        console.log("Pushing the JSON files to client " + socket.id + ".");
        io.sockets.emit('pushJSONs', JSONs);
    });

    socket.on('mouse', function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
    });

    socket.on('bounce', function(data) {
        console.log(data);
    });

    socket.on('image', function(data) {
        // console.log(dataUrl);

        // var imageBuffer = new Buffer(dataUrl, 'base64'); //console = <Buffer 75 ab 5a 8a ...
        // fs.writeFile("test.jpg", imageBuffer, function(err) { //... });

        var imageBuffer = decodeBase64Image(data.dataUrl);
        // console.log(imageBuffer);

        fs.writeFile(data.name + ".png", imageBuffer.data, function(err) {
            if (err) {
                return console.error(err);
            } else {
                console.log(data.name + ".png written successfully.");
            }
        });
    });

    socket.on('saveJSON', function(input) {
        console.log(input);
        let data = JSON.stringify(input.data);
        var fileName = filenameFormatter(Date());
        fileName = fileName.slice(0, fileName.length - 13);
        fs.writeFile(input.path + fileName + '.json', data, function(err) {
            if (err) {
                return console.error(err);
            } else {
                console.log(input.path + fileName + '.json written successfully.');
            }
        });
    });
});

// var graphJSON = function(path, name) {
//     this.name = name;
//     console.log(path);
//     this.data = JSON.parse(fs.readFileSync(path));
//     JSONs.push(this);
// };

function loadJSONs() {
    try {
        var files = fs.readdirSync("./objects");
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = "./objects/" + files[i];

            var fileType = filePath.slice(filePath.length - 5, filePath.length);
            if (fileType == ".json" || ??fileType == ".JSON") {
                var fileName = "" + files[i];
                fileName = fileName.slice(0, fileName.length - 5);
                // var obj = new graphJSON(filePath, fileName);
                console.log(fileName + " loaded successfully.");
                JSONs.push({
                    name: fileName,
                    data: JSON.parse(fs.readFileSync(filePath))
                })
            }
        }
}

loadJSONs();

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}