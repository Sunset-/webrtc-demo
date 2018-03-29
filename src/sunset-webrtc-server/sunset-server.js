var http = require('http');
var https = require('https');
var ws = require('ws');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var Random = require('./random.js');
var Business = require('./business');

var keypath = path.join(__dirname, './cert/sunset_nopass.key'); //我把秘钥文件放在运行命令的目录下测试
var certpath = path.join(__dirname, './cert/sunset.crt'); //console.log(keypath);
console.log(certpath);

var options = {
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath),
    //passphrase:'1234'//如果秘钥文件有密码的话，用这个属性设置密码
};

// var server = https.createServer(options, Business).listen(3008);
var server = http.createServer(Business).listen(3008);


var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        server: server
    });

var rooms = {};
var socketMap = {};


function closeSocket(removeSocketId) {
    delete socketMap[removeSocketId];
    leaveRoom(removeSocketId);
}

function leaveRoom(leaveSocketId) {
    Object.keys(rooms).forEach(roomId => {
        if (rooms[roomId].users && rooms[roomId].users[leaveSocketId]) {
            var user = rooms[roomId].users[leaveSocketId];
            delete rooms[roomId].users[leaveSocketId];
            Object.keys(rooms[roomId].users).forEach(socketId => {
                sendMessage(socketId, {
                    event: 'LOSE_CONNECTION',
                    from: leaveSocketId,
                    data: user
                })
            });
        }
    });
}

function operateMeesage(socketId, message) {
    var json = null;
    try {
        json = JSON.parse(message);
    } catch (e) {}
    if (json == null) {
        console.log('sockent-message:' + message);
        return;
    }
    var event = json.event,
        data = json.data;
    //加入房间
    if (event == 'JOIN_ROOM') {
        var roomNo = data.room,
            user = data.user || socketId;
        console.log(`${socketId}加入房间${roomNo}`);
        var room = rooms[roomNo] || (rooms[roomNo] = {});
        console.dir(room);
        room.users = room.users || {};
        var otherSocketIds = Object.keys(room.users);
        //向进入房间用户发送房间信息
        sendMessage(socketId, {
            event: 'JOINED_ROOM',
            data: room
        });
        room.users[socketId] = user;
        //向房间其他用户发送新用户信息
        otherSocketIds.forEach(otherSocketId => {
            sendMessage(otherSocketId, {
                event: 'OTHER_JOINED_ROOM',
                from: socketId,
                data: user
            });
        });
    } else if (event == 'LEAVE_ROOM') {
        //离开房间
        var roomToken = data;
        var room = rooms[roomToken];
        if (room) {
            var user = room.users[socketId];
            //向离开房间用户发送房间信息
            sendMessage(socketId, {
                event: 'LEAVED_ROOM'
            });
            leaveRoom(socketId);
        }
    } else {
        var room = json.room;
        var to = json.to;
        if (to) {
            json.from = socketId;
            sendMessage(to, json);
        } else if (room) {
            Object.keys(rooms[room]).forEach(si => {
                if (socketId != si) {
                    sendMessage(si, json);
                }
            })
        }
    }
}

function sendMessage(socketId, data) {
    console.log(`向【${socketId}】发送消息:${JSON.stringify(data)}`);
    socketMap[socketId] && socketMap[socketId].send(JSON.stringify(data));
}

// 有socket连入
wss.on('connection', function (socket) {
    var socketId = socket.socketId = Random.uuid();
    socketMap[socketId] = socket;
    sendMessage(socketId, {
        event: 'ONLINE',
        data: {
            socketId: socketId
        }
    });
    // 转发收到的消息
    socket.on('message', function (message) {
        operateMeesage(socketId, message);
    });
    socket.on('close', function () {
        closeSocket(socketId);
        console.log('close');
    });
    socket.on('error', function () {
        closeSocket(socketId);
        console.log('error');
    });
});