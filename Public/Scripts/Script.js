var name;
var socket = io();

socket.on('data', (a) => {
    var ms;
    sessionStorage.getItem('Msg') != null ? ms = JSON.parse(sessionStorage.getItem('Msg')) : ms = [];
    ms.push(a);
    sessionStorage.setItem("Msg", JSON.stringify(ms));
    putMSG(a);
})
socket.on('login', (a) => {

    if (a.docs != []) {
        (a.docs).forEach(m => {
            putMSGdata(m)
        });
    }
    alert("Socket is Ready for targets and you are Logged in")
})

function sendMsg() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1);

    var time = today.getHours() + ":" + today.getMinutes();

    var dateTime = date + ' at ' + time + ' ';
    sessionStorage.getItem('name') == null ? name = prompt('Enter Your name') : name = sessionStorage.getItem('name');
    sessionStorage.setItem("name", name);
    var Msg = {
        "data": document.querySelector("#sendMsg").value,
        "time": dateTime,
        "name": name
    };
    if (document.querySelector("#sendMsg").value != "") {
        socket.emit('Msg', {
            "hash": window.location.hash,
            'data': Msg
        });

    } else {
        alert("Please enter your message")
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

function putMSG(Msg) {
    document.querySelector("#sendMsg").value = "";
    var old = document.querySelector("#output").innerHTML;
    document.querySelector("#output").innerHTML = old + '<table class="form-comments-table"><tr><td><div class="comment-timestamp">' + Msg.data.time + '</div></td><td><div class="comment-user"> &nbsp' + Msg.data.name + '</div></td><td> </td><td><div id="comment-14" data-commentid="14" class="comment comment-step1">' + Msg.data.data + '</div> </td></tr></table>';
}

function putMSGdata(Msg) {
    document.querySelector("#sendMsg").value = "";
    var old = document.querySelector("#output").innerHTML;
    document.querySelector("#output").innerHTML = old + '<table class="form-comments-table"><tr><td><div class="comment-timestamp">' + Msg.time + '</div></td><td><div class="comment-user"> &nbsp' + Msg.name + '</div></td><td> </td><td><div id="comment-14" data-commentid="14" class="comment comment-step1">' + Msg.data + '</div> </td></tr></table>';
}
document.addEventListener('BeforeUnload', () => {
    socket.leave("room-" + window.location.hash);
})
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        var ms;
        sessionStorage.getItem('Msg') != null ? ms = JSON.parse(sessionStorage.getItem('Msg')) : ms = [];
        ms.push(a);
        sessionStorage.setItem("Msg", JSON.stringify(ms));
        putMSG(a);
    }
});
