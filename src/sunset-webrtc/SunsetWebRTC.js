/**
 * Sunset WebRTC 客户端
 * 
 */
import EventEmitter from './EventEmitter';
import Socket from './Socket';
import StreamRouter from './StreamRouter';
import Connection from './Connection';

//兼容API
var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var defaltOptions = {
    iceServer: {
        "iceServers": [
            {
                "url": "turn:117.34.72.19:3478",
                "username": "sunset",
                "credential": "123456"
            }
        ]
    },
    websocket: {
        url: 'ws://localhost:3008'
    }
};


function SunsetWebRTC(options) {
    this.options = Object.assign(Object.assign({}, defaltOptions), options);
    this.init();
}

SunsetWebRTC.prototype = Object.assign(new EventEmitter(), {
    /**
     * 初始化
     * 
     */
    init() {
        this.socket = new Socket(this.options.websocket);
        this.streamRouter = new StreamRouter();
        this._initStates();
        this._initEvents();
    },
    /**
     * 加入房间
     * 
     * @param {any} room 
     */
    join(roomToken, user) {
        if (!roomToken || roomToken == this.roomToken) {
            return;
        }
        if (this.roomToken) {
            this.leave();
        }
        this.roomToken = roomToken;
        this.user = user;
        this.socket.send({
            event: 'JOIN_ROOM',
            data: {
                room: roomToken,
                user: user
            }
        });
    },
    /**
     * 离开房间
     * 
     * @param {any} room 
     */
    leave() {
        Object.keys(this.connections).forEach(id => {
            this.connections[id].close();
        });
        this.connections = {};
        this.socket.send({
            event: 'LEAVE_ROOM',
            data: this.roomToken
        });
        this.roomToken = null;
        this.room = {};
    },
    /**
     * 初始化状态
     * 
     */
    _initStates() {
        //个人socketId
        this.socketId = null;
        //个人信息
        this.user = null;
        //websocket是否在线
        this.online = false;
        //room-token
        this.roomToken = null;
        //websocket连接
        this.websocket = null;
        //webrtc连接
        this.connections = {};
        //房间信息
        this.room = {};
    },
    /**
     * 注册事件
     * 
     */
    _initEvents() {
        //上线时，加入房间
        this.socket.on('ONLINE', (data) => {
            this.socketId = data.socketId;
        });
        //获取房间信息后，创建webrtc连接
        this.socket.on('JOINED_ROOM', (data) => {
            this.room = data;
            var otherSocketIds = data.users && Object.keys(data.users);
            this._createConnections(otherSocketIds);
            this.emit('JOINED_ROOM');
        });
        //离开房间
        this.socket.on('LEAVED_ROOM', (data) => {
            console.warn('LEAVED_ROOM');
            this.emit('LEAVED_ROOM');
        });
        //向加入房间者创建p2p连接
        this.socket.on('OTHER_JOINED_ROOM', (data, fromSocketId) => {
            this.room.users[fromSocketId] = data;
            this._createConnection(fromSocketId, true);
            this.emit('OTHER_JOINED_ROOM', data);
        });
        this.streamRouter.on('addOutputStream', (stream) => {
            this.emit('addOutputStream', stream, this.room.users[stream.socketId]);
        });
        this.streamRouter.on('removeOutputStream', (stream) => {
            this.emit('removeOutputStream', stream);
        });
    },
    /**********P2P连接***********/
    /**
     * 创建所有连接
     * 
     */
    _createConnections(otherSocketIds, isPassivity) {
        otherSocketIds && otherSocketIds.forEach(socketId => {
            this._createConnection(socketId, isPassivity);
        });
    },
    /**
     * 创建单一连接
     * 
     */
    _createConnection(fromSocketId, isPassivity) {
        var connection = this.connections[fromSocketId] = new Connection(fromSocketId, this.socket, this.options);
        connection.isPassivity = isPassivity;
        connection.on('message', (message) => {
            this.emit('message', this.room.users && this.room.users[fromSocketId], message);
        });
        connection.on('close', (data) => {
            delete this.connections[fromSocketId];
            var user = this.room.users[fromSocketId];
            delete this.room.users[fromSocketId];
            this.emit('OTHER_LEAVED_ROOM', user);
        });
        this.streamRouter.addConnection(connection);
    },
    /**********流***********/
    /**
     * 添加输入媒体流
     * 
     * @param {any} stream 
     */
    addStream(stream) {
        this.streamRouter.addInputStream(stream);
    },
    /**
     * 移除输入媒体流
     * 
     * @param {any} label 
     */
    removeStream(stream) {
        this.streamRouter.removeInputStream(stream);
    },
    /**********文本消息***********/
    sendMessage(message) {
        Object.keys(this.connections).forEach(id => {
            this.connections[id].sendMessage(message);
        });
    }
});
SunsetWebRTC.prototype.constructor = SunsetWebRTC;


module.exports = SunsetWebRTC;