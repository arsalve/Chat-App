const port = process.env.PORT || 8080;
const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const bodyParser = require("body-parser");
const chalk = require('chalk');
const cros = require('cors');
let fs = require('fs');
const path = require('path')
const app = express();

const {
    Socket
} = require('dgram');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, './Public')));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    limit: '50mb'
}));
app.use(cros());

const server = http.createServer(app);
const io = socketio(server)
const suc = chalk.greenBright;

var storage = [];
app.get('/*', (req, res) => {
    try {
        fs.readFile(__dirname + '\\index.html', 'utf8', function (err, text) {
            res.send(text);

        });
    } catch (error) {
        catchHandler("Error Occured while  provideing service", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})

io.on('connection', (socket) => {
    socket.on('Login', () => {
        console.log(suc('New Member'))
        socket.emit("login", storage)
    });
    socket.on('Msg', (a) => {
        try{
            if(storage.length>10){
                storage.shift();
            }
        storage.push(a);
        io.emit("data", a)}
        catch(error){
            console.log(error)
        }
    });
})
server.listen(port, () => {
    console.log(suc(`Ready for targets`))
})