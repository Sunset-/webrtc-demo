!function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){t.exports=e(58)},function(t,n){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},function(t,n){"use strict";function e(){}e.prototype={getEvents:function(){return this.events?this.events:this.events={}},getBindEvents:function(){return this.bindEvents?this.bindEvents:this.bindEvents={}},emit:function(t){var n=this,e=this.getEvents()[t];if(e&&e.length){var i=[].slice.call(arguments,1);e.forEach(function(t){t.apply(n,i)})}},on:function(t,n){(this.getEvents()[t]||(this.getEvents()[t]=[])).push(n)},trigger:function(t,n){var e=this,i=this.getBindEvents()[n]&&this.getBindEvents()[n][t];if(i&&i.length){var o=[].slice.call(arguments,2);i.forEach(function(t){t.apply(e,o)})}},bind:function(t,n,e){var i=this.getBindEvents()[n]=this.getBindEvents()[n]||{};(i[t]||(i[t]=[])).push(e)},unbind:function(t){delete this.getBindEvents()[t]}},e.prototype.constructor=e,t.exports=e},function(t,n,e){t.exports={default:e(19),__esModule:!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){t.exports={default:e(9),__esModule:!0}},function(t,n,e){t.exports=!e(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){var i=e(1),o=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var i=e(7),o=e(1),r=e(25),s=e(29),a="prototype",c=function(t,n,e){var u,f,d,l=t&c.F,h=t&c.G,m=t&c.S,p=t&c.P,v=t&c.B,w=t&c.W,g=h?o:o[n]||(o[n]={}),_=g[a],O=h?i:m?i[n]:(i[n]||{})[a];h&&(e=n);for(u in e)f=!l&&O&&void 0!==O[u],f&&u in g||(d=f?O[u]:e[u],g[u]=h&&"function"!=typeof O[u]?e[u]:v&&f?r(d,i):w&&O[u]==d?function(t){var n=function(n,e,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,i)}return t.apply(this,arguments)};return n[a]=t[a],n}(d):p&&"function"==typeof d?r(Function.call,d):d,p&&((g.virtual||(g.virtual={}))[u]=d,t&c.R&&_&&!_[u]&&s(_,u,d)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,n,e){var i=e(24);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,n,e){var i=e(34),o=e(27);t.exports=Object.keys||function(t){return i(t,o)}},function(t,n){var e=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:e)(t)}},function(t,n,e){var i=e(12),o=e(10);t.exports=function(t){return i(o(t))}},function(t,n,e){var i=e(10);t.exports=function(t){return Object(i(t))}},function(t,n,e){t.exports={default:e(20),__esModule:!0}},,function(t,n,e){e(44),t.exports=e(1).Object.assign},function(t,n,e){e(45),t.exports=e(1).Object.keys},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var i=e(8);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var i=e(15),o=e(41),r=e(40);t.exports=function(t){return function(n,e,s){var a,c=i(n),u=o(c.length),f=r(s,u);if(t&&e!=e){for(;u>f;)if(a=c[f++],a!=a)return!0}else for(;u>f;f++)if((t||f in c)&&c[f]===e)return t||f||0;return!t&&-1}}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var i=e(21);t.exports=function(t,n,e){if(i(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,i){return t.call(n,e,i)};case 3:return function(e,i,o){return t.call(n,e,i,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var i=e(8),o=e(7).document,r=i(o)&&i(o.createElement);t.exports=function(t){return r?o.createElement(t):{}}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var i=e(32),o=e(37);t.exports=e(6)?function(t,n,e){return i.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports=!e(6)&&!e(4)(function(){return 7!=Object.defineProperty(e(26)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){"use strict";var i=e(13),o=e(33),r=e(35),s=e(16),a=e(12),c=Object.assign;t.exports=!c||e(4)(function(){var t={},n={},e=Symbol(),i="abcdefghijklmnopqrst";return t[e]=7,i.split("").forEach(function(t){n[t]=t}),7!=c({},t)[e]||Object.keys(c({},n)).join("")!=i})?function(t,n){for(var e=s(t),c=arguments.length,u=1,f=o.f,d=r.f;c>u;)for(var l,h=a(arguments[u++]),m=f?i(h).concat(f(h)):i(h),p=m.length,v=0;p>v;)d.call(h,l=m[v++])&&(e[l]=h[l]);return e}:c},function(t,n,e){var i=e(22),o=e(30),r=e(42),s=Object.defineProperty;n.f=e(6)?Object.defineProperty:function(t,n,e){if(i(t),n=r(n,!0),i(e),o)try{return s(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,e){var i=e(28),o=e(15),r=e(23)(!1),s=e(38)("IE_PROTO");t.exports=function(t,n){var e,a=o(t),c=0,u=[];for(e in a)e!=s&&i(a,e)&&u.push(e);for(;n.length>c;)i(a,e=n[c++])&&(~r(u,e)||u.push(e));return u}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,e){var i=e(11),o=e(1),r=e(4);t.exports=function(t,n){var e=(o.Object||{})[t]||Object[t],s={};s[t]=n(e),i(i.S+i.F*r(function(){e(1)}),"Object",s)}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var i=e(39)("keys"),o=e(43);t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,n,e){var i=e(7),o="__core-js_shared__",r=i[o]||(i[o]={});t.exports=function(t){return r[t]||(r[t]={})}},function(t,n,e){var i=e(14),o=Math.max,r=Math.min;t.exports=function(t,n){return t=i(t),t<0?o(t+n,0):r(t,n)}},function(t,n,e){var i=e(14),o=Math.min;t.exports=function(t){return t>0?o(i(t),9007199254740991):0}},function(t,n,e){var i=e(8);t.exports=function(t,n){if(!i(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!i(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!i(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!i(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var e=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+i).toString(36))}},function(t,n,e){var i=e(11);i(i.S+i.F,"Object",{assign:e(31)})},function(t,n,e){var i=e(16),o=e(13);e(36)("keys",function(){return function(t){return o(i(t))}})},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){this.connection=t,this.init()}var r=e(5),s=i(r),a=e(3),c=i(a),u=e(2),f=i(u);o.prototype=(0,c.default)(new f.default,{init:function(){var t=this;this.channels={},this.messageQuene={},["message"].forEach(function(n){t._getChannel(n)})},send:function(t,n){"string"!=typeof n&&(n=(0,s.default)(n));var e=this._getChannel(t);e?e.send(n):(this.messageQuene[t]||(this.messageQuene[t]=[])).push(n)},_getChannel:function(t){var n=this;if(this.channels[t])return this.channels[t];var e=this.connection,i=e.createDataChannel(t);return e.ondatachannel=function(e){var i=e.channel;i.onmessage=function(e){var i=e.data,o=null;try{o=JSON.parse(i)}catch(t){}null==o&&(o=i),n.emit(t,o)}},i.onopen=function(e){console.warn("channel-open:"+t),n.channels[t]=i,n._clearMessageQuene(t)},i.onerror=function(t){},this.emit("createChannel"),!1},_clearMessageQuene:function(t){var n=this.messageQuene[t];if(n)for(;n.length;)this.send(t,n.shift())}}),o.prototype.constructor=o,t.exports=o},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e){this.uid=++m,this.options=(0,s.default)((0,s.default)({},h),e),this.init(t,n)}var r=e(3),s=i(r),a=e(2),c=i(a),u=e(46),f=i(u),d=window.PeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,l=(window.mozRTCSessionDescription||window.RTCSessionDescription,window.mozRTCIceCandidate||window.RTCIceCandidate),h={iceServer:{iceServers:[{url:"stun:stun.l.google.com:19302"},{url:"turn:numb.viagenie.ca",username:"webrtc@live.com",credential:"muazkh"}]}},m=0;o.prototype=(0,s.default)(new c.default,{init:function(t,n){this.initStates(t,n),this.initEvents(),this.initPeerConnection()},initStates:function(t,n){this.socketId=t,this.socket=n,this.peerConnection=null,this.inputStreams=[],this.outputStreams=[],this.onlineStream={}},initEvents:function(){var t=this,n=this.socket;n.bind("__ICE_CANDIDATE",this.socketId,function(n){t._addIceCandidate(n)}),n.bind("__OFFER",this.socketId,function(n){t._answer(n)}),n.bind("__ANSWER",this.socketId,function(n){t._receiveAnswer(n)}),n.bind("LOSE_CONNECTION",this.socketId,function(){t.close()}),n.bind("__REVERSE_OFFER",this.socketId,function(n){t._offer()})},initPeerConnection:function(){var t=this,n=this.peerConnection=new d(this.options.iceServer);return n._streamCount=0,n.onicecandidate=function(n){null!==n.candidate&&t.socket.send({event:"__ICE_CANDIDATE",to:t.socketId,data:{candidate:n.candidate}})},n.onaddstream=function(n){var e=n.stream;e.socketId=t.socketId,t.outputStreams.push(n.stream),t.onlineStream[e.id]=!0,t.emit("addOutputStream",e)},n.onremovestream=function(e){n._streamCount--;var i=e.stream;delete t.onlineStream[i.id],t.emit("removeOutputStream",i)},this.initChannel(),n},initChannel:function(){var t=this;this.channel=new f.default(this.peerConnection),this.channel.on("createChannel",function(){t._offer()}),this.channel.on("message",function(n){t.emit("message",n)})},getSocketId:function(){return this.socketId},attachStreams:function(t){var n=this,e=!1,i=this.peerConnection,o=this.inputStreams,r=o.map(function(t){return t.id}),s=t.map(function(t){return t.id});r.sort(),s.sort(),r.join(",")!=s.join(",")&&(o.forEach(function(t){s.indexOf(t.id)<0&&i.removeStream(t)}),t.forEach(function(t){r.indexOf(t.id)<0&&(i.addStream(t),i._streamCount++)}),this.inputStreams=t,e=!0),this.isPassivity&&(e=!1),this.isPassivity?e&&this._offer():e?this._offer():this._offerTimer=setTimeout(function(){n.socket.send({event:"__REVERSE_OFFER",to:n.socketId})},500),this.isPassivity=!1},sendMessage:function(t){this.channel.send("message",t)},close:function(){var t=this;this._offerTimer&&(clearTimeout(this._offerTimer),this._offerTimer=null),this.peerConnection.close(),this.socket.unbind(this.socketId),this.outputStreams.forEach(function(n){t.emit("removeOutputStream",n)}),this.emit("close")},_addIceCandidate:function(t,n){this.peerConnection.addIceCandidate(new l(t.candidate))},_offerTimer:null,_offer:function(){var t=this;this._offerTimer&&clearTimeout(this._offerTimer),this._offerTimer=setTimeout(function(){var n=t.peerConnection;console.warn("OFFER"),n.createOffer(function(e){n.setLocalDescription(e),t.socket.send({event:"__OFFER",to:t.socketId,data:e})},function(n){t.emit("connection-error",n,otherSocket)})},500)},_answer:function(t){var n=this,e=this.peerConnection;console.warn("ANSWER"),e.setRemoteDescription(new RTCSessionDescription(t)),e.createAnswer(function(t){e.setLocalDescription(t),n.socket.send({event:"__ANSWER",to:n.socketId,data:t})},function(){})},_receiveAnswer:function(t){var n=this.peerConnection;console.warn("RECEIVE_ANSWER"),n.setRemoteDescription(new RTCSessionDescription(t))}}),t.exports=o},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){this.options=(0,c.default)((0,c.default)({},d),t),this.init()}var r=e(5),s=i(r),a=e(3),c=i(a),u=e(2),f=i(u),d=(window.PeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,{});o.prototype=(0,c.default)(new f.default,{init:function(){this.initStates(),this._initWebsocket()},initStates:function(){this.socketId=null,this.messageQuene=[]},initEvents:function(){},_initWebsocket:function(){var t=this,n=this.options;if(!n.url)throw new Error("must config websocket");var e=this.websocket=new WebSocket(n.url);e.onopen=function(){t.onOpen()},e.onerror=function(n){throw t.online=!1,t.emit("websocket-error",n),n},e.onclose=function(){t.online=!1,t.emit("websocket-close")},e.onmessage=function(n){var e=null;try{e=JSON.parse(n.data)}catch(t){}e&&e.event?(t.emit(e.event,e.data,e.from),e.from&&t.trigger(e.event,e.from,e.data)):t.emit("websocket-message",n.data)}},onOpen:function(){this.online=!0,this.clearMessageQuene(),this.emit("websocket-open")},clearMessageQuene:function(){for(var t=this.messageQuene;t.length;){var n=t.shift();this.send(n.data,n.origin)}},send:function(t,n){if(this.online)this.websocket.send(n?t:(0,s.default)(t));else{if(!(this.messageQuene.length<=100))throw new Error("websocket offline messagequene max size is 100 !");this.messageQuene.push({data:t,origin:n})}}}),t.exports=o},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(){this.init()}var r=e(17),s=i(r),a=e(3),c=i(a),u=e(2),f=i(u);o.prototype=(0,c.default)(new f.default,{init:function(){this.initStates(),this.initEvents(),this._reBindStreamOnConnections()},initStates:function(){this.connections={},this.inputStreams={},this.outputStreams={},this.streamIncludes={},this.streamExcludes={}},initEvents:function(){},addConnection:function(t){var n=this,e=t.getSocketId();this.connections[e]=t,t.on("close",function(){delete n.connections[e]}),t.on("addOutputStream",function(t){n.outputStreams[t.id]=t,n.emit("addOutputStream",t)}),t.on("removeOutputStream",function(t){delete n.outputStreams[t.id],n.emit("removeOutputStream",t)}),this._reBindStreamOnConnection(t)},addInputStream:function(t){t instanceof MediaStream&&!this.inputStreams[t.id]&&(this.inputStreams[t.id]=t),this._reBindStreamOnConnections()},removeInputStream:function(t){delete this.inputStreams[t.id],this._reBindStreamOnConnections()},_reBindStreamOnConnections:function(){var t=this;(0,s.default)(this.connections).forEach(function(n){t._reBindStreamOnConnection(t.connections[n])})},_reBindStreamOnConnection:function(t){var n=this,e=t.getSocketId(),i=(0,s.default)(this.inputStreams);if(this.streamIncludes[e]&&(i=(0,s.default)(this.streamIncludes[e])),this.streamExcludes[e]){var o=(0,s.default)(this.streamExcludes[e]);i=i.filter(function(t){return o.indexOf(t)<0})}t.attachStreams(i.map(function(t){return n.inputStreams[t]}))}}),t.exports=o},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){this.options=(0,c.default)((0,c.default)({},w),t),this.init()}var r=e(17),s=i(r),a=e(3),c=i(a),u=e(2),f=i(u),d=e(48),l=i(d),h=e(49),m=i(h),p=e(47),v=i(p),w=(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,{iceServer:{iceServers:[{url:"turn:117.34.72.19:3478",username:"sunset",credential:"123456"}]},websocket:{url:"ws://localhost:3008"}});o.prototype=(0,c.default)(new f.default,{init:function(){this.socket=new l.default(this.options.websocket),this.streamRouter=new m.default,this._initStates(),this._initEvents()},join:function(t,n){t&&t!=this.roomToken&&(this.roomToken&&this.leave(),this.roomToken=t,this.user=n,this.socket.send({event:"JOIN_ROOM",data:{room:t,user:n}}))},leave:function(){var t=this;(0,s.default)(this.connections).forEach(function(n){t.connections[n].close()}),this.connections={},this.socket.send({event:"LEAVE_ROOM",data:this.roomToken}),this.roomToken=null,this.room={}},_initStates:function(){this.socketId=null,this.user=null,this.online=!1,this.roomToken=null,this.websocket=null,this.connections={},this.room={}},_initEvents:function(){var t=this;this.socket.on("ONLINE",function(n){t.socketId=n.socketId}),this.socket.on("JOINED_ROOM",function(n){t.room=n;var e=n.users&&(0,s.default)(n.users);t._createConnections(e),t.emit("JOINED_ROOM")}),this.socket.on("LEAVED_ROOM",function(n){console.warn("LEAVED_ROOM"),t.emit("LEAVED_ROOM")}),this.socket.on("OTHER_JOINED_ROOM",function(n,e){t.room.users[e]=n,t._createConnection(e,!0),t.emit("OTHER_JOINED_ROOM",n)}),this.streamRouter.on("addOutputStream",function(n){t.emit("addOutputStream",n,t.room.users[n.socketId])}),this.streamRouter.on("removeOutputStream",function(n){t.emit("removeOutputStream",n)})},_createConnections:function(t,n){var e=this;t&&t.forEach(function(t){e._createConnection(t,n)})},_createConnection:function(t,n){var e=this,i=this.connections[t]=new v.default(t,this.socket,this.options);i.isPassivity=n,i.on("message",function(n){e.emit("message",e.room.users&&e.room.users[t],n)}),i.on("close",function(n){delete e.connections[t];var i=e.room.users[t];delete e.room.users[t],e.emit("OTHER_LEAVED_ROOM",i)}),this.streamRouter.addConnection(i)},addStream:function(t){this.streamRouter.addInputStream(t)},removeStream:function(t){this.streamRouter.removeInputStream(t)},sendMessage:function(t){var n=this;(0,s.default)(this.connections).forEach(function(e){n.connections[e].sendMessage(t)})}}),o.prototype.constructor=o,t.exports=o},,function(t,n){},,,function(t,n){"use strict";function e(){this.el=document.createElement("div"),this.el.className="audio-rate",this.lis=[];for(var t=0;t<5;t++){var n=document.createElement("ul");this.lis[t]=[];for(var e=0;e<5;e++){var i=document.createElement("li");n.appendChild(i),this.lis[t][5-e]=i}this.el.appendChild(n)}}e.prototype.show=function(t){var n=this.lis;n.forEach(function(n,e){var i=t[e];i=Math.floor(i/20);for(var o=0;o<i;o++)n[o]&&(n[o].className="active");for(var o=i;o<n.length;o++)n[o]&&(n[o].className="")})},t.exports=e},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(){this.audioContext=new AudioContext,this.context={}}var r=e(3),s=i(r),a=e(2),c=i(a);o.prototype=(0,s.default)(new c.default,{sampling:function(t,n){var e=(this.context[t.id]={},this.audioContext),i=e.createMediaStreamSource(t),o=e.createAnalyser();i.connect(o),this.reSampling(o,n)},reSampling:function(t,n){var e=this,i=new Uint8Array(t.frequencyBinCount);t.getByteFrequencyData(i);var o=this._sampling(i,n);this.emit("sampling",o),requestAnimationFrame(function(){e.reSampling(t,n)})},_sampling:function(t,n){n=n||{};for(var e=n.step||10,i=n.start||0,o=n.end||t.length,r=[],s=i,a=t.length;s<a&&s<o;s+=e)r.push(t[s]);return r}}),o.prototype.constructor=o,t.exports=o},,function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e){var i=document.createElement("div");i.className="video-wrap";var o=document.createElement("video");if(o.id="video-"+t.id,i.appendChild(o),document.getElementById(n===!0?"in-video-container":"out-video-container").appendChild(i),o.autoplay=!0,o.controls=!1,o.src=URL.createObjectURL(t),n===!0?o.muted=!0:setTimeout(function(){window.innerWidth-o.clientWidth>200&&$("#in-video-container").css("width",window.innerWidth-o.clientWidth+"px")},500),o.play(),n!==!0){var r=null;v?r=v.hospitalName+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前接诊患者："+v.patientName:(r="医生："+n.name,n.patient&&(r+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前接诊患者："+n.patient.patientName));var s=document.createElement("label");s.innerHTML=r,s.className="stream-from",i.appendChild(s),document.title="与 "+n.name+" 视频中"}var a=document.createElement("div");if(a.className="right-top-toolbar",i.appendChild(a),AudioContext&&t.getAudioTracks().length){var c=new l.default;c.sampling(t,{step:100,end:500});var u=new f.default;a.appendChild(u.el),c.on("sampling",function(t){u.show(t)})}if(e){var d=document.createElement("div");d.className="close",d.innerHTML="关闭",a.appendChild(d),d.addEventListener("click",function(){p.removeStream(t),i.remove()})}}function r(t){}function s(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(n);return null!=e?unescape(e[2]):null}e(52);var a=e(50),c=i(a),u=e(55),f=i(u),d=e(56),l=i(d),h=e(2);i(h),!function(){for(var t=0,n=["webkit","moz"],e=0;e<n.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[n[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[e]+"CancelAnimationFrame"]||window[n[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n,e){var i=(new Date).getTime(),o=Math.max(0,16.7-(i-t)),r=window.setTimeout(function(){n(i+o)},o);return t=i+o,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();var m=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,p=new c.default,v=null;p.on("JOINED_ROOM",function(){r("欢迎进入房间")}),p.on("LEAVED_ROOM",function(){r("已离开房间")}),p.on("OTHER_JOINED_ROOM",function(t){r(t+" 进入房间")}),p.on("OTHER_LEAVED_ROOM",function(t){r(t+" 离开房间")}),p.on("addOutputStream",function(t,n){o(t,n)}),p.on("removeOutputStream",function(t){document.getElementById("video-"+t.id).parentNode.remove()});try{m.apply(navigator,[{video:!0,audio:!0},function(t){o(t,!0),p.addStream(t)},function(t){alert(t)}])}catch(t){var w=document.createElement("div");w.innerHTML=t,document.body.appendChild(w),alert(t)}var g=s("room"),_=JSON.parse(decodeURI(s("user"))),O=s("patientId");g&&_&&(O?$.ajax({url:"/service/getPatient",data:{id:O}}).then(function(t){v=t,_.patient=t,p.join(g,_,!1)}):p.join(g,_,!1)),setInterval(function(){window.opener&&(window.opener.webrtcWindow=window)},500),{versions:function(){var t=navigator.userAgent;return navigator.appVersion,{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&t.indexOf("KHTML")==-1,mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Linux")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:t.indexOf("Safari")==-1}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},window.innerWidth<window.innerHeight&&(document.body.className="phone-body")}]);