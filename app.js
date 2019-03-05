var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/default.html');
});

app.get('/allgames', (req, res) => {
    res.sendFile(__dirname + '/public/html/allgames.html');
})

app.get('/history', (req, res) => {
    res.sendFile(__dirname + '/public/html/history.html');
})

io.on('connection', (socket) => {
    console.log('new connection');
    
    // Player moves
    socket.on('move', (msg) => {
        console.log(msg);
        socket.broadcast.emit('move', msg);
    });
});

http.listen(port, () => {
    console.log('listening on *: ' + port);
});
