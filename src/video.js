import './style/video.scss';
import SunsetWebRTC from './sunset-webrtc/SunsetWebRTC';
import AudioRate from './sunset-webrtc/AudioRate';
import Sampler from './sunset-webrtc/Sampler';

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


var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var sw = new SunsetWebRTC();

var currentPatient = null;

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
    } else {
        setTimeout(function () {
            if (window.innerWidth - video.clientWidth > 200) {
                $('#in-video-container').css('width', `${window.innerWidth-video.clientWidth}px`);
            }
        }, 500)
    }
    video.play();
    //媒体来源
    if (own !== true) {
        var name = null;
        if (currentPatient) {
            name = `${currentPatient.hospitalName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前接诊患者：${currentPatient.patientName}`;
        } else {
            name = `医生：${own.name}`;
            if (own.patient) {
                name += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前接诊患者：${own.patient.patientName}`;
            }
        }
        var label = document.createElement('label');
        label.innerHTML = name;
        label.className = 'stream-from';
        div.appendChild(label);
        document.title = `与 ${own.name} 视频中`;
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


// var el_messages = document.getElementById('messages');

function addSystemMessage(message) {
    //     var p = document.createElement('p');
    //     p.innerHTML = `[系统消息]：${message}`;
    //     p.style = 'color:orange';
    //     el_messages.appendChild(p);
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
    user = JSON.parse(decodeURI(GetQueryString('user'))),
    patientId = GetQueryString('patientId');
if (room && user) {
    if (patientId) {
        $.ajax({
            url: '/service/getPatient',
            data: {
                id: patientId
            }
        }).then(res => {
            currentPatient = res;
            user.patient = res;
            sw.join(room, user, false);
        })
    } else {
        sw.join(room, user, false);
    }
}

//心跳
setInterval(() => {
    if (window.opener) {
        window.opener.webrtcWindow = window;
    } else {
        // window.close();
    }
}, 500)


var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

if(window.innerWidth<window.innerHeight){
    document.body.className = 'phone-body';
}
