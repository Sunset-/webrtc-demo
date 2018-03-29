import './style/doctor.scss';

//医生名称
var doctorName = localStorage.getItem('doctor_webrtc_name');
if (doctorName) {
    $('.doctor-name').html(doctorName);
}
$('#modify-doctor').on('click', function () {
    var newDoctorName = window.prompt('请输入你的姓名');
    if (newDoctorName) {
        $('.doctor-name').html(doctorName = newDoctorName);
        localStorage.setItem('doctor_webrtc_name', newDoctorName);
    }
});

//查询患者列表
$.ajax({
    url: '/service/loadPatients'
}).then(res => {
    res && res.forEach(item => addPatient(item));
});

//接诊患者
$('#patients').on('click', '.video-patient', function () {
    openView($(this).data('hospital'), doctorName, $(this).data('id'));
});

function addPatient(p) {
    $('#patients').append(`
        <tr id="patient-${p.id}">
            <td style="padding:20px 0px;;">${p.patientNo}</td>
            <td>${p.patientName}</td>
        </tr>
    `);
}

window.refreshPatient = function (current, next) {
    $("#currentno").html(current && current.patientNo || '');
    $("#currentnname").html(current && current.patientName || '')
    $("#nextno").html(next && next.patientNo || '')
    $("#nextname").html(next && next.patientName || '');
    //语音
    var text = '';
    text += `请${current.patientNo}号，${current.patientName}到远程诊室就诊。`;
    if (next) {
        text += `${next.patientNo}号，准备`;
    }
    speek(text);
    // var utterance = new SpeechSynthesisUtterance(text);
    // window.speechSynthesis.speak(utterance);
    // setTimeout(function () {
    //     window.speechSynthesis.speak(utterance);
    // }, 1000);
}

var utterThis = null;
var speekTimer = null;
var speekTimer2 = null;

function speek(text) {
    var dingdong = document.getElementById('dingdong');
    dingdong.play();
    window.speechSynthesis.speaking && window.speechSynthesis.cancel(utterThis);
    clearTimeout(speekTimer);
    clearTimeout(speekTimer2);
    speekTimer = setTimeout(function () {
        utterThis = new window.SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterThis);
        speekTimer2 = setTimeout(function(){
            window.speechSynthesis.speak(utterThis);
        },1000);
    }, 2500);
}


window.refreshPatients = function () {
    $.ajax({
        url: '/service/loadPatients'
    }).then(res => {
        $('#patients').html('');
        res && res.forEach(item => addPatient(item));
    });
}


//心跳
setInterval(() => {
    if (window.opener) {
        window.opener.tipWindow = window;
    } else {
        window.close();
    }
    var now = new Date();
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    $("#currentdate").html(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()} ${week[now.getDay()]}`)
}, 500)