import './style/index.scss';

//医院id
var hospitalId = localStorage.getItem('hospital_webrtc_id');
if (!hospitalId) {
    localStorage.setItem('hospital_webrtc_id', hospitalId = Date.now());
}

//医院名称
var hospitalName = localStorage.getItem('hospital_webrtc_name') || '';
if (hospitalName) {
    $('.hospital-name').html(hospitalName);
}
$('#modify-hospital').on('click', function () {
    var newHospitalName = window.prompt('修改医院名称', hospitalName);
    if (newHospitalName) {
        $('.hospital-name').html(hospitalName = newHospitalName);
        localStorage.setItem('hospital_webrtc_name', hospitalName);
    }
});

var patients = [];

//查询患者列表
$.ajax({
    url: '/service/loadPatients'
}).then(res => {
    res && res.forEach(item => addPatient(item));
    patients = res || [];
})

//添加患者
var $patientName = $('#input-patient');
$('#add-patient').on('click', function () {
    var patientName = $patientName.val();
    if (patientName) {
        $.ajax({
            url: '/service/addPatient',
            type: 'POST',
            data: {
                patientNo: $('#input-patientno').val(),
                patientName: patientName,
                hospitalId: hospitalId,
                hospitalName: hospitalName,
                office: $('#input-office').val(),
                doctorName: $('#input-doctor').val(),
                date: $('#input-date').val(),
                type: '预约门诊',
                status: '等待中',
            }
        }).then(res => {
            $patientName.val('');
            patients.push(res);
            addPatient(res);
            window.tipWindow.refreshPatients && window.tipWindow.refreshPatients();
        });
    }
});

//通知患者准备
$('#patients').on('click', '.wait-patient', function () {
    var id = $(this).data('id'),
        current = null,
        next = null;
    for (var i = 0, l = patients.length; i < l; i++) {
        if (patients[i].id == id) {
            current = patients[i];
            next = patients[i + 1];
            break;
        }
    }
    if (current) {
        window.tipWindow.refreshPatient && window.tipWindow.refreshPatient(current, next);
    }

    // $.ajax({
    //     url: '/service/removePatient',
    //     type: 'GET',
    //     data: {
    //         id: $(this).data('id')
    //     }
    // }).then(res => {
    //     $(this).closest('tr').remove();
    // });
});

//删除患者
$('#patients').on('click', '.remove-patient', function () {
    $.ajax({
        url: '/service/removePatient',
        type: 'GET',
        data: {
            id: $(this).data('id')
        }
    }).then(res => {
        $(this).closest('tr').remove();
        window.tipWindow.refreshPatients && window.tipWindow.refreshPatients();
    });
});


function addPatient(p) {
    $('#patients').append(`
        <tr id="patient-${p.id}">
            <td>${p.patientName}</td>
            <td>${p.patientNo}</td>
            <td>${p.hospitalName}</td>
            <td>${p.office}</td>
            <td>${p.doctorName}</td>
            <td>${p.type}</td>p.id
            <td>${p.date}</td>p.id
            <td class="status"></td>
            <td>
                <button class="wait-patient" style="background:#09c;" data-id="${p.id}" type="button">准备</button>&nbsp;&nbsp;
                <button class="remove-patient" data-id="${p.id}" type="button">删除</button>
            </td>
        </tr>
    `);
}

//开启视频
$('#open-video').on('click', function () {
    window.webrtcWindow = (window.webrtcWindow && (!window.webrtcWindow.closed)) ?
        window.webrtcWindow : window.open('', '',
            `height=900, width=1200, top=0, right=50, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,dependent=yes,fullscreen=1`
        );
    window.webrtcWindow.location = encodeURI(encodeURI(`/video.html?room=${hospitalId}&user=${JSON.stringify({name : hospitalName,hospitalId:hospitalId})}`));
});

$('#close-video').on('click', function () {
    window.webrtcWindow && window.webrtcWindow.close();
    window.webrtcWindow = null;
});


import SunsetWebRTC from './sunset-webrtc/SunsetWebRTC';

var sw = new SunsetWebRTC();

sw.join(hospitalId, hospitalId);
setTimeout(() => {
    setInterval(() => {
        sw.sendMessage('B');
    }, 500);
}, 1000)

sw.on('addOutputStream', function (stream, user) {
    addVideo(stream, user, user.hospitalId == hospitalId)
});
sw.on('removeOutputStream', function (stream) {
    var $box = $(`#video-${stream.id}`).closest('.video-box');
    var isHospital = $box.hasClass('hospital-video');
    $box.attr('name', isHospital ? '医院端' : '医生端')
    $(`#video-${stream.id}`).parent().remove();
    $('#hospital-video').attr('name', '医院端');
    $('.doing').removeClass('doing');
});


function addVideo(stream, user, own) {
    var div = document.createElement('div');
    div.className = 'video-wrap';
    var video = document.createElement('video');
    video.id = `video-${stream.id}`;
    div.appendChild(video);
    var parent = document.getElementById(own === true ? 'hospital-video' : 'doctor-video');
    parent.appendChild(div);
    if (own === true) {
        $(parent).attr('name', `医院端`);
    } else {
        $(parent).attr('name', `医生端：${user.name}`);
        $('#hospital-video').attr('name', `医院端：${user.patient.patientName}`);
        $(`#patient-${user.patient.id} .status`).addClass('doing');
    }

    video.autoplay = true;
    video.controls = false;
    video.src = URL.createObjectURL(stream);
    video.muted = true;
    video.play();
    //媒体来源
    if (own !== true) {
        var name = null;
        if (currentPatient) {
            name = `${currentPatient.hospitalName} 当前接诊患者：${currentPatient.patientName}`;
        } else {
            name = own.name;
            if (own.patient) {
                name += ` 当前接诊患者：${own.patient.patientName}`;
            }
        }
        var label = document.createElement('label');
        label.innerHTML = name;
        label.className = 'stream-from';
        div.appendChild(label);
        document.title = `与 ${own.name} 视频中`;
    }
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
}

//开启公示
$('#open-tip').on('click', function () {
    window.tipWindow = (window.tipWindow && (!window.tipWindow.closed)) ?
        window.tipWindow : window.open('', '',
            `height=900, width=1200, top=0, right=50, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,dependent=yes,fullscreen=1`
        );
    window.tipWindow.location = encodeURI(encodeURI(`/tip.html?hospitalId=${hospitalId}`));
});