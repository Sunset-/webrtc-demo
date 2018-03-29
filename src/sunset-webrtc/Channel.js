/**
 * Sunset DataChannel 信道类
 * 
 */
import EventEmitter from './EventEmitter';

function Channel(connection) {
    this.connection = connection;
    this.init();
}

Channel.prototype = Object.assign(new EventEmitter(), {
    init() {
        this.channels = {};
        this.messageQuene = {};
        ['message'].forEach(topic => {
            this._getChannel(topic);
        });
    },
    send(topic, message) {
        if (typeof message != 'string') {
            message = JSON.stringify(message);
        }
        var channel = this._getChannel(topic);
        if (channel) {
            channel.send(message)
        } else {
            (this.messageQuene[topic] || (this.messageQuene[topic] = [])).push(message);
        }
    },
    _getChannel(topic) {
        if (this.channels[topic]) {
            return this.channels[topic];
        } else {
            var pc = this.connection;
            var channel = pc.createDataChannel(topic);
            pc.ondatachannel = (event) => {
                var receiveChannel = event.channel;
                receiveChannel.onmessage = (evt) => {
                    var msg = evt.data;
                    var json = null;
                    try {
                        json = JSON.parse(msg);
                    } catch (e) {

                    }
                    if (json == null) {
                        json = msg;
                    }
                    this.emit(topic, json)
                };
            };
            channel.onopen = (event) => {
                console.warn('channel-open:'+topic)
                this.channels[topic] = channel;
                this._clearMessageQuene(topic);
            }
            channel.onerror = function (err) {}
            this.emit('createChannel');
            return false;
        }
    },
    _clearMessageQuene(topic) {
        var messages = this.messageQuene[topic];
        if (messages) {
            while (messages.length) {
                this.send(topic, messages.shift())
            }
        }
    }
});

Channel.prototype.constructor = Channel;

module.exports = Channel;