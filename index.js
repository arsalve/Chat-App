const port = process.env.PORT || 8080;
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require("body-parser");
const chalk = require('chalk');
const cros = require('cors');
let fs = require('fs');
const path = require('path')
const app = express();
const datamanupulation=require('./Save Retrive.js')

const {
    Socket
} = require('dgram');
app.use(bodyParser.json({
    limit : '50mb',
    extended : true    ///////// LIMIT for JSON
  }));

app.use(bodyParser.urlencoded({
    limit : '50mb',
    extended : true

  }));
app.use(express.static(path.join(__dirname, './Public')));

app.use(express.urlencoded({
    limit: '50mb',
    extended : true
}));
app.use(cros());

const server = http.createServer(app);
const io = socketio(server)
const suc = chalk.greenBright;


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
    socket.on('Login', (bo1) => {
        console.log(suc('New Member'))
        socket.join(bo1.hash);
        var temp=  datamanupulation.fetchData(bo1.hash,'login',socket);
      

    });
    socket.on('Msg', (bo1) => {
        try {

            datamanupulation.save(bo1)
            io.to(bo1.hash).emit("data", bo1)
        } catch (error) {
            console.log(error)
        }
    });
})
server.listen(port, () => {
    console.log(suc(`Ready for targets`))
})