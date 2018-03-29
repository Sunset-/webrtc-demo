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
            <td>${p.patientName}</td>
            <td>${p.hospitalName}</td>
            <td>${p.office}</td>
            <td>${p.doctorName}</td>
            <td>${p.type}</td>p.id
            <td>${p.date}</td>p.id
            <td><button class="video-patient" data-hospital="${p.hospitalId}" data-id="${p.id}" style="background:#09F;" type="button">接诊</button></td>
        </tr>
    `);
}


function openView(hospitalId, doctorName, patientId) {
    window.webrtcWindow = (window.webrtcWindow && (!window.webrtcWindow.closed)) ?
        window.webrtcWindow : window.open('', '',
            'height=900, width=1200, top=0, right=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
        );
    window.webrtcWindow.location = encodeURI(encodeURI(`/video.html?room=${hospitalId}&user=${JSON.stringify({name : doctorName})}&patientId=${patientId}`));
}