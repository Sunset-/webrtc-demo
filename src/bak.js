import './style/video.scss';
import SunsetWebRTC from './sunset-webrtc/SunsetWebRTC';

import EventEmitter from './sunset-webrtc/EventEmitter';
/**
 * requestAnimationFrame兼容性扩展，两方面工作：
 * 1、把各浏览器前缀进行统一
 * 2、在浏览器没有requestAnimationFrame方法时将其指向setTimeout方法
 * */
(function () {
    var lastTime = 0;
    var vendors = ["webkit", "moz"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        // Webkit中此取消方法的名字变了
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

function Sampler() {
    this.audioContext = new AudioContext();
    this.context = {};
}
Sampler.prototype = Object.assign(new EventEmitter(), {
    sampling(stream, options) {
        var context = this.context[stream.id] = {};
        var audioContext = this.audioContext;
        var audioInput = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser();
        audioInput.connect(analyser);
        this.reSampling(analyser, options);
    },
    reSampling(analyser, options) {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var result = this._sampling(array, options);
        this.emit('sampling', result);
        requestAnimationFrame(() => {
            this.reSampling(analyser, options);
        });
    },
    _sampling(array, options) {
        options = options || {};
        var step = options.step || 10,
            start = options.start || 0,
            end = options.end || array.length;
        var result = [];
        for (var i = start, l = array.length; i < l && i < end; i += step) {
            result.push(array[i]);
        }
        return result;
    }
});
Sampler.prototype.constructor = Sampler;

var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var sw = new SunsetWebRTC();

function addVideo(stream, own, canClose) {
    var div = document.createElement('div');
    div.className = 'video-wrap';
    var video = document.createElement('video');
    video.id = `video-${stream.id}`;
    div.appendChild(video);
    document.getElementById(own === true ? 'in-video-container' : 'out-video-container').appendChild(div);
    video.autoplay = true;
    video.controls = false;
    video.src = URL.createObjectURL(stream);
    if (own === true) {
        video.muted = true;
    }
    video.play();
    //媒体来源
    if (own !== true) {
        var label = document.createElement('label');
        label.innerHTML = own;
        label.className = 'stream-from';
        div.appendChild(label);
    }
    //右上操作条
    var toolbar = document.createElement('div');
    toolbar.className = 'right-top-toolbar';
    div.appendChild(toolbar);
    //音频条
    if (AudioContext && stream.getAudioTracks().length) {
        var sampler = new Sampler();
        sampler.sampling(stream, {
            step: 100,
            end: 500
        });
        var ar = new AudioRate();
        toolbar.appendChild(ar.el);
        sampler.on('sampling', (res) => {
            ar.show(res);
        });
    }
    //关闭按钮
    if (canClose) {
        var closer = document.createElement('div');
        closer.className = 'close';
        closer.innerHTML = '关闭';
        toolbar.appendChild(closer);
        closer.addEventListener('click', () => {
            sw.removeStream(stream);
            div.remove();
        });
    }
}

function AudioRate() {
    this.el = document.createElement('div');
    this.el.className = 'audio-rate';
    this.lis = [];
    for (var i = 0; i < 5; i++) {
        var ul = document.createElement('ul');
        this.lis[i] = [];
        for (var j = 0; j < 5; j++) {
            var li = document.createElement('li');
            ul.appendChild(li);
            this.lis[i][5 - j] = li;
        }
        this.el.appendChild(ul);
    }
}
AudioRate.prototype.show = function (result) {
    var lis = this.lis;
    lis.forEach((items, index) => {
        var v = result[index];
        v = Math.floor(v / 20);
        for (var i = 0; i < v; i++) {
            items[i] && (items[i].className = 'active');
        }
        for (var i = v; i < items.length; i++) {
            items[i] && (items[i].className = '');
        }
    })
}



var el_messages = document.getElementById('messages');

function addSystemMessage(message) {
    var p = document.createElement('p');
    p.innerHTML = `[系统消息]：${message}`;
    p.style = 'color:orange';
    el_messages.appendChild(p);
}

sw.on('JOINED_ROOM', function () {
    addSystemMessage('欢迎进入房间');
});
sw.on('LEAVED_ROOM', function () {
    addSystemMessage('已离开房间');
});
sw.on('OTHER_JOINED_ROOM', function (user) {
    addSystemMessage(`${user} 进入房间`);
});
sw.on('OTHER_LEAVED_ROOM', function (user) {
    addSystemMessage(`${user} 离开房间`);
});
sw.on('addOutputStream', function (stream, user) {
    addVideo(stream, user);
});
sw.on('removeOutputStream', function (stream) {
    document.getElementById(`video-${stream.id}`).parentNode.remove();
});

// //加入离开房间
// document.getElementById('joinroom-btn').addEventListener('click', () => {
//     sw.join(document.getElementById('room-no').value, document.getElementById('user-name').value);
// });
// document.getElementById('leaveroom-btn').addEventListener('click', () => {
//     sw.leave();
// });
// //辅流
// document.getElementById('share-btn').addEventListener('click', function () {
//     getScreenMedia(function (err, stream) {
//         if (err) {
//             console.log('failed');
//         } else {
//             addVideo(stream, true, true);
//             sw.addStream(stream);
//             console.log('got a stream', stream);
//         }
//     });
// });

//文本消息
// function appendMessage(user, message) {
//     var p = document.createElement('p');
//     p.innerHTML = `[${user}]：${message}`;
//     el_messages.appendChild(p);
//     el_messages.scrollTop = el_messages.scrollHeight;
// }
// sw.on('message', appendMessage);
// document.getElementById('send-trigger').addEventListener('click', () => {
//     try {
//         var message = document.getElementById('send-message').value;
//         document.getElementById('send-message').value = '';
//         sw.sendMessage(message);
//         appendMessage('我', message);
//     } catch (e) {}
// });


//用户流
try {
    getUserMedia.apply(navigator, [{
        video: true,
        audio: true
    }, (localMediaStream) => {
        addVideo(localMediaStream, true);
        sw.addStream(localMediaStream);
    }, function (err) {
        alert(err)
    }]);

} catch (err) {
    var div = document.createElement('div');
    div.innerHTML = err;
    document.body.appendChild(div);
    alert(err)
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var room = GetQueryString('room'),
    user = GetQueryString('user');

if (room && user) {
    sw.join(room, user);
}