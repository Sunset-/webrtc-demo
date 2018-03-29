/**
 * Sunset PeerConnection 连接类
 * 
 */
import EventEmitter from './EventEmitter';
import Channel from './Channel';

//兼容API
var nativePeerConnection = (window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
var nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription);
var nativeRTCIceCandidate = (window.mozRTCIceCandidate || window.RTCIceCandidate);

//默认配置
var defaltOptions = {
    iceServer: {
        "iceServers": [{
            "url": "stun:stun.l.google.com:19302"
        }, {
            "url": "turn:numb.viagenie.ca",
            "username": "webrtc@live.com",
            "credential": "muazkh"
        }]
    }
};

var uid = 0;

function Connection(socketId, socket, options) {
    this.uid = ++uid;
    this.options = Object.assign(Object.assign({}, defaltOptions), options);
    this.init(socketId, socket);
}

Connection.prototype = Object.assign(new EventEmitter(), {
    init(socketId, socket) {
        this.initStates(socketId, socket);
        this.initEvents();
        this.initPeerConnection();
    },
    initStates(socketId, socket) {
        this.socketId = socketId;
        this.socket = socket;
        this.peerConnection = null;
        this.inputStreams = [];
        this.outputStreams = [];
        this.onlineStream = {};
    },
    initEvents() {
        var socket = this.socket;
        //加入备选ICE
        socket.bind('__ICE_CANDIDATE', this.socketId, (data) => {
            this._addIceCandidate(data);
        });
        //回应WebRTC连接
        socket.bind('__OFFER', this.socketId, (data) => {
            this._answer(data);
        });
        //接受回应
        socket.bind('__ANSWER', this.socketId, (data) => {
            this._receiveAnswer(data);
        });
        //接受回应
        socket.bind('LOSE_CONNECTION', this.socketId, () => {
            this.close();
        });
        //反向请求WebRTC连接
        socket.bind('__REVERSE_OFFER', this.socketId, (data) => {
            this._offer();
        });


    },
    initPeerConnection() {
        var pc = this.peerConnection = new nativePeerConnection(this.options.iceServer);
        pc._streamCount = 0;
        //ICE连接事件
        pc.onicecandidate = (evt) => {
            if (evt.candidate !== null) {
                this.socket.send({
                    "event": "__ICE_CANDIDATE",
                    to: this.socketId,
                    "data": {
                        "candidate": evt.candidate
                    }
                });
            }
        };
        //新增流事件
        pc.onaddstream = (event) => {
            var stream = event.stream;
            stream.socketId = this.socketId;
            this.outputStreams.push(event.stream);
            this.onlineStream[stream.id] = true;
            this.emit('addOutputStream', stream);
        };
        //移除流事件
        pc.onremovestream = (event) => {
            pc._streamCount--;
            var stream = event.stream;
            delete this.onlineStream[stream.id];
            this.emit('removeOutputStream', stream);
        };
        this.initChannel();
        return pc;
    },
    initChannel() {
        this.channel = new Channel(this.peerConnection);
        this.channel.on('createChannel', () => {
            this._offer();
        });
        this.channel.on('message', (message) => {
            this.emit('message', message);
        });
    },
    /**
     * 获取连接的目标socketId
     * 
     * @returns 
     */
    getSocketId() {
        return this.socketId;
    },
    /**
     * 绑定媒体流
     * 
     * @param {any} socketId 
     */
    attachStreams(newStreams) {
        var toOffer = false;
        var pc = this.peerConnection;
        var lastStreams = this.inputStreams;
        var lastIds = lastStreams.map(s => s.id);
        var newIds = newStreams.map(s => s.id);
        lastIds.sort();
        newIds.sort();
        if (lastIds.join(',') != newIds.join(',')) {
            lastStreams.forEach(ls => {
                if (newIds.indexOf(ls.id) < 0) {
                    pc.removeStream(ls);
                }
            })
            newStreams.forEach(ns => {
                if (lastIds.indexOf(ns.id) < 0) {
                    pc.addStream(ns);
                    pc._streamCount++;
                }
            });
            this.inputStreams = newStreams;
            toOffer = true;
        }
        if (this.isPassivity) {
            toOffer = false;
        }
        if (!this.isPassivity) {
            if (toOffer) {
                this._offer();
            } else {
                this._offerTimer = setTimeout(() => {
                    this.socket.send({
                        "event": "__REVERSE_OFFER",
                        to: this.socketId
                    });
                }, 500);
            }
        } else if (toOffer) {
            this._offer();
        }
        this.isPassivity = false;
    },
    /**
     * 发送文本消息
     * 
     * @param {any} message 
     */
    sendMessage(message) {
        this.channel.send('message', message);
    },
    close() {
        if (this._offerTimer) {
            clearTimeout(this._offerTimer);
            this._offerTimer = null;
        }
        this.peerConnection.close();
        this.socket.unbind(this.socketId);
        this.outputStreams.forEach(stream => {
            this.emit('removeOutputStream', stream);
        });
        this.emit('close');
    },
    /**
     * 加入备选ICE
     * 
     * @param {any} data 
     */
    _addIceCandidate(data, fromSocketId) {
        //添加ICE
        this.peerConnection.addIceCandidate(new nativeRTCIceCandidate(data.candidate));
    },
    /**
     * 请求
     * 
     */
    _offerTimer: null,
    _offer() {
        if (this._offerTimer) {
            clearTimeout(this._offerTimer);
        }
        this._offerTimer = setTimeout(() => {
            var pc = this.peerConnection;
            //发起连接申请
            console.warn('OFFER');
            pc.createOffer((desc) => {
                pc.setLocalDescription(desc);
                this.socket.send({
                    event: '__OFFER',
                    to: this.socketId,
                    data: desc
                });
            }, (err) => {
                this.emit('connection-error', err, otherSocket);
            });
        }, 500);
    },
    /**
     * 应答
     * 
     * @param {any} data 
     * @param {any} fromSocketId 
     */
    _answer(data) {
        var pc = this.peerConnection;
        //发送回应
        console.warn('ANSWER');
        pc.setRemoteDescription(new RTCSessionDescription(data));
        pc.createAnswer((desc) => {
            pc.setLocalDescription(desc);
            this.socket.send({
                event: '__ANSWER',
                to: this.socketId,
                data: desc
            });
        }, function () {

        });
    },
    /**
     * 响应应答
     * 
     * @param {any} data 
     * @param {any} fromSocketId 
     */
    _receiveAnswer(data) {
        var pc = this.peerConnection;
        console.warn('RECEIVE_ANSWER');
        pc.setRemoteDescription(new RTCSessionDescription(data));
    }
});

module.exports = Connection;