!function(t){function n(e){if(o[e])return o[e].exports;var i=o[e]={exports:{},id:e,loaded:!1};return t[e].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var o={};return n.m=t,n.c=o,n.p="",n(0)}({0:function(t,n,o){t.exports=o(53)},1:function(t,n){var o=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=o)},5:function(t,n,o){t.exports={default:o(9),__esModule:!0}},9:function(t,n,o){var e=o(1),i=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},18:function(t,n){},53:function(t,n,o){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function i(t){$("#patients").append('\n        <tr id="patient-'+t.id+'">\n            <td>'+t.patientName+"</td>\n            <td>"+t.hospitalName+"</td>\n            <td>"+t.office+"</td>\n            <td>"+t.doctorName+"</td>\n            <td>"+t.type+"</td>p.id\n            <td>"+t.date+'</td>p.id\n            <td><button class="video-patient" data-hospital="'+t.hospitalId+'" data-id="'+t.id+'" style="background:#09F;" type="button">接诊</button></td>\n        </tr>\n    ')}function d(t,n,o){window.webrtcWindow=window.webrtcWindow&&!window.webrtcWindow.closed?window.webrtcWindow:window.open("","","height=900, width=1200, top=0, right=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"),window.webrtcWindow.location=encodeURI(encodeURI("/video.html?room="+t+"&user="+(0,a.default)({name:n})+"&patientId="+o))}var r=o(5),a=e(r);o(18);var c=localStorage.getItem("doctor_webrtc_name");c&&$(".doctor-name").html(c),$("#modify-doctor").on("click",function(){var t=window.prompt("请输入你的姓名");t&&($(".doctor-name").html(c=t),localStorage.setItem("doctor_webrtc_name",t))}),$.ajax({url:"/service/loadPatients"}).then(function(t){t&&t.forEach(function(t){return i(t)})}),$("#patients").on("click",".video-patient",function(){d($(this).data("hospital"),c,$(this).data("id"))})}});