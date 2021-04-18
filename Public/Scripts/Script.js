var socket = io();

socket.on('data', (a) => {
    putMSGdata(a);

})
socket.on('login', (a) => {

    if (a.docs != []) {
        (a.docs).forEach(m => {
            putMSGdata(m)
        });
    }

    dataLayer.push({'event':'Login','Hash':window.location.hash});
    
})

function sendMsg() {
    var name= sessionStorage.getItem('name') == null ?  prompt('Enter Your name') :  sessionStorage.getItem('name');
    
    if((name!=null)&&(name!="")){
        sessionStorage.setItem("name", name);
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1);
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' at ' + time + ' ';
    
    var Msg = {
        "data": document.querySelector("#sendMsg").value,
        "time": dateTime,
        "hash": window.location.hash,
        "name": name
    };
    if (document.querySelector("#sendMsg").value != "") {
        socket.emit('Msg', Msg);
        document.querySelector("#sendMsg").value = "";
    } else {
        alert("Please enter your message")
    }
}else{
    console.log('no User Found')
}
}


function load_text() {
    if (window.location.hash == "") {
        window.location.hash = "Janta"
    }
    socket.emit('Login', {
        "hash": window.location.hash
    })
}

// function putMSG(Msg) {

//     var old = document.querySelector("#output").innerHTML;
//     document.querySelector("#output").innerHTML = old + '<table class="form-comments-table"><tr><td><div class="comment-timestamp">' + Msg.data.time + '</div></td><td><div class="comment-user"> &nbsp' + Msg.data.name + '</div></td><td> </td><td><div id="comment-14" data-commentid="14" class="comment comment-step1">' + Msg.data.data + '</div> </td></tr></table>';
// }

function putMSGdata(Msg) {
    document.querySelector("#sizing-addon3").innerHTML='Updated' + Msg.time ;
    var old = document.querySelector("#output").innerHTML;
    document.querySelector("#output").innerHTML = old+ '<div class="col-sm-12"><table class="form-comments-table"><tr><td ><div class="comment-user" > &nbsp' + Msg.name + '</div></td><td> </td><td style="width:100%;><div id="comment-14" data-commentid="14" class="comment comment-step1"  word-wrap: break-word">' + Msg.data + '</div> </td></tr></table></div">'
    document.getElementById( 'bottom' ).scrollIntoView();
}
document.addEventListener('BeforeUnload', () => {
    socket.leave(window.location.hash);
})
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMsg();
    }
});