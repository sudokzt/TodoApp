(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{348:function(e,t,n){e.exports=n(818)},357:function(e,t,n){},362:function(e,t,n){},619:function(e,t){},621:function(e,t){},653:function(e,t){},654:function(e,t){},723:function(e,t){},818:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"loadTodos",function(){return $}),n.d(a,"inputTask",function(){return ee}),n.d(a,"addTask",function(){return te}),n.d(a,"doneTask",function(){return ne}),n.d(a,"selectTaskType",function(){return ae}),n.d(a,"selectDeadLine",function(){return re}),n.d(a,"deleteTask",function(){return ce}),n.d(a,"editMode",function(){return se}),n.d(a,"inputEditingTask",function(){return oe}),n.d(a,"editDeadLine",function(){return ie}),n.d(a,"editTask",function(){return ue});var r=n(1),c=n.n(r),s=n(62),o=n.n(s),i=n(81),u=(n(357),n(63)),l=n(18),d=n(146),m=n(147),p=n(149),f=n(148),k=n(150),E=n(214),y=(n(362),n(363),n(55)),T=n.n(y),O=n(212),b=n.n(O),g=n(342),v=n.n(g),N=n(343),_=n.n(N),h=n(344),L=n.n(h),D=n(144),I=n.n(D);function j(){return c.a.createElement("div",null,c.a.createElement(v.a,null),c.a.createElement(_.a,{position:"static"},c.a.createElement(L.a,null,c.a.createElement(I.a,{type:"title",color:"inherit"},"TodoApp"))))}var R="\u5b8c\u4e86",C="\u672a\u5b8c\u4e86",w="\u901a\u5e38",S="\u7de8\u96c6",A="INPUT_TASK",U="ADD_TASK",K="DONE_TASK",B="SELECT_TASKTYPE",M="SELECT_DATE",P="DELETE_TASK",V="EDIT_MODE",F="INPUT_EDITTING_TASK",G="EDIT_DATE",Y="EDIT_TASK",x=function(e){return(e=new Date(e)).setTime(e.getTime()+324e5),"".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())},W=function(e){function t(e){var n;return Object(d.a)(this,t),n=Object(p.a)(this,Object(f.a)(t).call(this,e)),console.log(e),n}return Object(k.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.loadTodos()}},{key:"render",value:function(){var e,t=this.props,n=Object(l.a)({},t),a=n.task,r=n.tasks,s=n.editTasks,o=n.printTask,i=n.mode,u=n.inputTask,d=n.addTask,m=n.doneTask,p=n.deleteTask,f=n.selectTaskType,k=n.selectDeadLine,y=n.editMode,O=n.inputEditingTask,g=n.editTask,v=n.editDeadLine,N=i===w?S:w;switch((e=i===w?r.slice():s.slice()).sort(function(e,t){return new Date(e.deadLine)>new Date(t.deadLine)?1:-1}),o){case R:e=e.filter(function(e){return e.status===R});break;case C:e=e.filter(function(e){return e.status===C})}var _=x(new Date(1990,1,1));return c.a.createElement("div",null,c.a.createElement(j,null),c.a.createElement("section",{className:"mode"},c.a.createElement("span",{className:"section-title"},"\u30e2\u30fc\u30c9\u9078\u629e"),c.a.createElement(T.a,{raised:!0,color:"primary",onClick:function(){return y()},className:"button"},N,"\u30e2\u30fc\u30c9\u3078")),function(){if(i===w)return c.a.createElement("section",{className:"add-task"},c.a.createElement("div",{className:"section-title"},"\u30bf\u30b9\u30af\u306e\u8ffd\u52a0"),c.a.createElement(b.a,{id:"input_task_area",onChange:function(e){return u(e.target.value)}}),c.a.createElement(E.a,{dateFormat:"yyyy/MM/dd",selected:new Date(a.deadLine),onChange:k,className:"input-date"}),c.a.createElement(T.a,{raised:!0,color:"primary",onClick:function(){return d(a.name,x(a.deadLine))},className:"button"},"\u8ffd\u52a0"))}(),c.a.createElement("section",{className:"filter-tasks"},c.a.createElement("div",{className:"section-title"},"\u30bf\u30b9\u30af\u306e\u7d5e\u308a\u8fbc\u307f"),c.a.createElement(T.a,{raised:!0,onClick:function(){return f("\u5168\u3066")}},"\u5168\u3066"),c.a.createElement(T.a,{raised:!0,onClick:function(){return f(C)},className:"button"},C),c.a.createElement(T.a,{raised:!0,onClick:function(){return f(R)},className:"button"},R)),c.a.createElement("section",{className:"print-tasks"},c.a.createElement("ul",{className:"tasks-list"},e.map(function(e){var t=c.a.createElement("span",null),n=x(e.deadLine);return n!==_&&(t=c.a.createElement("div",{className:"task-date"},c.a.createElement("span",{className:"task-date-text"},n)),_=n),c.a.createElement("div",{key:e.key},t,c.a.createElement("li",{className:"task-item"},i===w?c.a.createElement("div",null,c.a.createElement("span",{className:"task-name"},e.name),c.a.createElement(T.a,{raised:!0,onClick:function(){return m(e.key)},className:"button"},e.status)):c.a.createElement("div",null,c.a.createElement(b.a,{value:e.name,onChange:function(t){return O(t.target.value,e.key)}}),c.a.createElement(E.a,{dateFormat:"yyyy/MM/dd",selected:new Date(e.deadLine),onChange:v,className:"".concat(String(e.key)," input-date")}),c.a.createElement(T.a,{raised:!0,onClick:function(){return g(e.key)},className:"button"},"\u66f4\u65b0"),c.a.createElement(T.a,{raised:!0,color:"secondary",onClick:function(){return p(e.key)},className:"button"},"\u524a\u9664"),function(){if(!0===e.editting)return c.a.createElement("span",{className:"editting-message"},c.a.createElement("i",{className:"fas fa-exclamation-triangle warnning"}),"\u5909\u66f4\u304c\u4fdd\u5b58\u3055\u308c\u3066\u3044\u307e\u305b\u3093")}())))}))))}}]),t}(r.Component),J=n(107),z=n.n(J),Q=(n(595),n(598),n(600),{apiKey:Object({NODE_ENV:"production",PUBLIC_URL:""}).API_KEY||"AIzaSyBTxA00Brdp2ienIyYPKYXvarbn3DLRVSw",authDomain:Object({NODE_ENV:"production",PUBLIC_URL:""}).AUTH_DOMAIN||"tweet-todoapp.firebaseapp.com",databaseURL:Object({NODE_ENV:"production",PUBLIC_URL:""}).FIREBASE_DB_URL||"https://tweet-todoapp.firebaseio.com",projectId:Object({NODE_ENV:"production",PUBLIC_URL:""}).PROJECT_ID||"tweet-todoapp",storageBucket:Object({NODE_ENV:"production",PUBLIC_URL:""}).STORAGE_BUCKET||"tweet-todoapp.appspot.com",messagingSenderId:Object({NODE_ENV:"production",PUBLIC_URL:""}).MESSAGING_SENDER_ID||"199853674354"});z.a.initializeApp(Q);var q=new z.a.auth.TwitterAuthProvider,H=z.a.database(),X=z.a,Z=H.ref("todos");function $(){return console.log("firebase \u306e\u66f4\u65b0"),function(e){Z.off(),Z.on("value",function(t){e(function(e){return{type:"TODOS_RECEIVE_DATA",payload:{data:e.val()}}}(t))},function(t){e(function(e){return{type:"TODOS_RECEIVE_ERROR",payload:{message:e.message}}}(t))})}}function ee(e){return{type:A,payload:{task:e}}}function te(e,t){return document.getElementById("input_task_area").value="",function(n){Z.push({task:e,deadLine:t,status:C}).catch(function(e){return n({type:"ADD_TASK_ERROR",payload:{message:e.message}})})}}function ne(e){return function(t,n){var a=n().task.tasks.filter(function(t){return t.key===e})[0].status;H.ref("todos/".concat(e)).update({status:a===R?C:R}).catch(function(e){t({type:"DONE_TASK_ERROR",payload:{message:e}})})}}function ae(e){return{type:B,payload:{printTask:e}}}function re(e){return{type:M,payload:{deadLine:e}}}function ce(e){return window.confirm("\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b")?function(t){H.ref("todos/".concat(e)).remove().catch(function(e){return t({type:"DELETE_TASK_ERROR",payload:{message:e.message}})})}:{type:"NONE"}}function se(){return{type:V}}function oe(e,t){return{type:F,payload:{task:e,taskId:t}}}function ie(e){return{type:G,payload:{deadLine:e}}}function ue(e){return{type:Y,payload:{taskId:e}}}var le=Object(i.b)(function(e){var t=e.task;return{task:t.task,tasks:t.tasks,editTasks:t.editTasks,printTask:t.printTask,mode:t.mode}},function(e){return Object(u.b)(a,e)})(W),de=n(213),me=n.n(de),pe=n(345),fe="LOGIN",ke="LOGOUT",Ee=function(){var e=Object(pe.a)(me.a.mark(function e(){var t;return me.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={},e.next=3,X.auth().getRedirectResult().then(function(e){if(e.credential){var n=t.token=e.credential.accessToken,a=t.secretKey=e.credential.secret;console.log({token:n,secretKey:a})}e.user&&(t.name=e.user.displayName,t.uid=e.user.uid)});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),ye=function(e){return{type:fe,payload:{uid:e.uid,displayName:e.name,token:e.token,secretKey:e.secretKey}}},Te=Object({NODE_ENV:"production",PUBLIC_URL:""}).TWITTER_CUTOMER_SECRET_KEY,Oe=Object({NODE_ENV:"production",PUBLIC_URL:""}).TWITTER_CUSTOMER_KEY,be=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(k.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.onMount()}},{key:"render",value:function(){var e=this;return c.a.createElement("div",null,this.props.uid?c.a.createElement("button",{id:"logout-button",onClick:function(){return e.props.logout()}},"\u30ed\u30b0\u30a2\u30a6\u30c8"):c.a.createElement("button",{id:"login-button",onClick:function(){X.auth().signInWithRedirect(q)}},"\u30ed\u30b0\u30a4\u30f3"),c.a.createElement("button",{onClick:function(){X.auth().onAuthStateChanged(function(e){null!=e&&(e.displayName,e.email,e.photoURL,e.emailVerified,e.uid,console.log(e))}).catch(function(e){console.log({error:e})})}},"\u30e6\u30fc\u30b6\u30fc\u78ba\u8a8d"),c.a.createElement("button",{onClick:function(){new(n(604))({consumer_key:Oe,consumer_secret:Te,access_token_key:"847735307696955392-lf9IFJ0Kip2tRU4wFmk1ea9ZQQzO6WG",access_token_secret:"caGrSNdemt3C8MF7LFFSqlOe0jBSTVEux3CWNN85nSYl4"}).post("statuses/update",{status:"\u30c4\u30a4\u30fc\u30c8\u3057\u305f\u3044\u5185\u5bb9"},function(e,t,n){e?console.log(e):console.log(t)})}},"\u30c6\u30b9\u30c8"))}}]),t}(r.Component),ge=Object(i.b)(function(e){var t=e.auth;return Object(l.a)({},t)},function(e){return{onMount:function(){e(function(e){Ee().then(function(t){return e(ye(t))}).catch(function(e){return console.log({e:e})})})},logout:function(){e((X.auth().signOut().then(function(e){console.log({success:e})}).catch(function(e){console.log({error:e})}),{type:ke}))}}})(be),ve=n(346),Ne=n.n(ve),_e=n(347),he={task:{id:0,name:"",status:"",deadLine:new Date},tasks:[],editTasks:[],printTask:"\u5168\u3066",mode:w,todos:[]};function Le(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0,n=e.task,a=(e.tasks,e.mode),r=e.editTasks;console.log(e);var c=t.type,s=t.payload;switch(c){case"TODOS_RECEIVE_DATA":var o=[];console.log("receive");var i=t.payload.data;return i&&Object.keys(i).forEach(function(e){var t=i[e];o.push({key:e,name:t.task,status:t.status,deadLine:t.deadLine})}),Object(l.a)({},e,{tasks:o});case A:return Object(l.a)({},e,{task:Object(l.a)({},n,{name:s.task})});case U:var u={id:o.length,name:s.task,deadLine:n.deadLine,status:C};return Object(l.a)({},e,{task:{name:"",status:"",deadLine:new Date},tasks:o.concat([u])});case K:var d=s.taskId,m=o.slice();return m[d].status=m[d].status===R?C:R,Object(l.a)({},e,{tasks:m});case B:return Object(l.a)({},e,{printTask:s.printTask});case M:return Object(l.a)({},e,{task:Object(l.a)({},n,{deadLine:s.deadLine})});case P:var p=s.taskId,f=o.slice();return f.splice(p,1),f.forEach(function(e){e.id>p&&e.id--}),Object(l.a)({},e,{tasks:f,editTasks:f.slice()});case V:return Object(l.a)({},e,{mode:a===S?w:S,editTasks:o.slice()});case F:var k=r.slice();return k[s.taskId]=Object(l.a)({},k[s.taskId],{name:s.task,editting:!0}),Object(l.a)({},e,{editTasks:k});case G:var E=r.slice(),y=Number(document.activeElement.className[0]);return E[y]=Object(l.a)({},E[y],{deadLine:s.deadLine,editting:!0}),Object(l.a)({},e,{editTasks:E});case Y:var T=o.slice();return T.find(function(e){return e.id===s.taskId}).name=r.find(function(e){return e.id===s.taskId}).name,T[s.taskId].deadLine=r[s.taskId].deadLine,r[s.taskId].editting=!1,Object(l.a)({},e,{tasks:T,editTasks:r});default:return e}}var De={uid:null,displayName:null,token:null,secretKey:null};function Ie(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case fe:return t.payload.uid?{uid:t.payload.uid,displayName:t.payload.displayName,token:t.payload.token,secretKey:t.payload.secretKey}:e;case ke:return{uid:null,displayName:null,token:null,secretKey:null};default:return e}}var je=function(e){return function(t){return function(n){var a=t(n);return localStorage.setItem("app-state",JSON.stringify(e.getState().task)),a}}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Re=(JSON.parse(localStorage.getItem("app-state")),Object(u.d)(Object(u.c)({task:Le,auth:Ie}),Object(u.a)(Ne.a,_e.a,je)));o.a.render(c.a.createElement(i.a,{store:Re},c.a.createElement(le,null),c.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[348,1,2]]]);
//# sourceMappingURL=main.cf1e9921.chunk.js.map