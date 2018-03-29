var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var video = document.getElementById('video');

try {
    getUserMedia.apply(navigator, [{
        video: {
            mandatory: {
                minWidth: 240
            }
        },
        audio: true
    }, (localMediaStream) => {
        debugger;
        getUserMedia.apply(navigator, [{
            video: {
                optional : [{
                    sourceId : '123'
                }],
                mandatory: {
                    minWidth: 240
                }
            },
            audio: true
        }, (localMediaStream) => {
            video.src = window.URL.createObjectURL(localMediaStream);
        }, function (err) {
            alert(err)
        }]);
    }, function (err) {
        alert(err)
    }]);

} catch (err) {
    var div = document.createElement('div');
    div.innerHTML = err;
    document.body.appendChild(div);
    alert(err)
}