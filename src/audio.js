var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);


//音频测试
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
document.getElementById('file-input').addEventListener('change', function (ev) {
    var f = ev.target.files && ev.target.files[0];
    if (f) {
        processFile(f);
    }
});

var EL_result = document.getElementById('result');
var analisis = [function (analyser) {
    setInterval(() => {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var result = caiyang(array, 100);
        draw(result);
    }, 20)
}];

var ts = [];

function draw(array) {
    if (ts.length) {
        array.forEach((v, index) => {
            ts[index].style = `background:yellowgreen;display:inline-block;width:5px;margin:0px 1px;height:${v}px`;
        });
    } else {
        array.forEach((v, index) => {
            var div = document.createElement('div');
            div.style = `background:yellowgreen;display:inline-block;width:5px;margin:0px 1px;height:${v}px`;
            ts[index] = div;
            EL_result.appendChild(div);
        });
    }
}

function caiyang(array, step) {
    var result = [];
    for (var i = 0, l = array.length; i < l; i += step) {
        result.push(array[i]);
    }
    return result;
}

var globalVolume = null;

function processFile(f) {
    var fr = new FileReader();
    var audioContext = new AudioContext();
    fr.onload = function (e) { //文件读取完后调用此函数
        var fileResult = e.target.result; //这是读取成功得到的结果ArrayBuffer数据
        audioContext.decodeAudioData(fileResult, function (buffer) { //解码成功则调用此函数，参数buffer为解码后得到的结果
            //调用_visualize进行下一步处理，此方法在后面定义并实现
            var node = audioContext.createBufferSource();
            node.buffer = buffer;
            createAudio(audioContext, node);
        }, function (e) { //这个是解码失败会调用的函数
            console.log("!哎玛，文件解码失败:(");
        });
    };
    //将上一步获取的文件传递给FileReader从而将其读取为ArrayBuffer格式
    fr.readAsArrayBuffer(f);
}


function createAudio(audioContext, firstNode) {
    //调用_visualize进行下一步处理，此方法在后面定义并实现
    var audioBufferSouceNode = firstNode;
    var last = audioBufferSouceNode;
    var analysers = analisis.map(cb => {
        var a = audioContext.createAnalyser();
        last.connect(a);
        last = a;
        cb(a);
    });

    var filter = audioContext.createBiquadFilter();
    // 创建音频混音组
    last.connect(filter);
    // // 设定低通滤波器
    filter.type = 0; // 低通滤波器。请参阅手册
    EL_volume.value = filter.frequency.value = 15; // 设定频率为440Hz
    last = filter;
    globalVolume = filter;



    var volume = audioContext.createGain();
    last.connect(volume);
    volume.connect(audioContext.destination);
    // EL_volume.value = volume.gain.value;
    console.log('volume:' + volume.gain.value);
    // globalVolume = volume;
    firstNode.start(0);
}

var EL_volume = document.getElementById('volume');
EL_volume.addEventListener('change', (ev) => {
    // globalVolume && (globalVolume.gain.value = ev.target.value/100.0);
    globalVolume && (globalVolume.frequency.value = ev.target.value);

});

function addVideo(stream, own) {
    var div = document.createElement('div');
    div.className = 'video-wrap';
    var video = document.createElement('video');
    video.id = `video-${stream.id}`;
    div.appendChild(video);
    document.body.appendChild(div);
    video.autoplay = true;
    video.controls = true;
    video.src = URL.createObjectURL(stream);
    video.play();
}

try {
    getUserMedia.apply(navigator, [{
        video: true,
        audio: true
    }, (localMediaStream) => {
        addVideo(localMediaStream);
        var s = new Sampler();
        s.sampling(localMediaStream, {
            step: 100,
            end: 500
        });
        s.on('sampling', (result) => {
            console.log(result);
        })
    }, function (err) {
        alert(err)
    }]);

} catch (err) {
    var div = document.createElement('div');
    div.innerHTML = err;
    document.body.appendChild(div);
    alert(err)
}

import EventEmitter from './sunset-webrtc/EventEmitter';

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
        context.timer = setInterval(() => {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var result = this._sampling(array, options);
            this.emit('sampling', result)
        }, 20)
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

