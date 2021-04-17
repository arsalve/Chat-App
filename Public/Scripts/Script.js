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
    if(a!=[]){
       a.forEach(m => {
            putMSG(m)
        });
    }
    alert("Socket is Ready for targets and you are Logged in")
})

function sendMsg() {
    var today = new Date();

    var date =today.getDate()+'/'+(today.getMonth()+1);
    
    var time = today.getHours() + ":" + today.getMinutes();
    
    var dateTime = date+' at '+time+' ';
    sessionStorage.getItem('name') == null ? name = prompt('Enter Your name') : name = sessionStorage.getItem('name');
    sessionStorage.setItem("name", name);
    var Msg = {
        "data": document.querySelector("#sendMsg").value,
        "time":dateTime,
        "name": name
    };
    if(document.querySelector("#sendMsg").value!="")
    socket.emit('Msg', Msg)
    else{
        alert("Please enter your message")
    }
}

function Login() {
    socket.emit('Login')
}

function load_text() {
    Login();
    // if (sessionStorage.getItem('Msg') != null) {
    //     var ms = sessionStorage.getItem('msg');
    //     JSON.parse(ms).forEach(m => {
    //         putMSG(m)
    //     });
    // }


}

function putMSG(Msg) {
    
    var old = document.querySelector("#output").innerHTML;
    document.querySelector("#output").innerHTML = old + '<table class="form-comments-table"><tr><td><div class="comment-timestamp">' + Msg.time+ '</div></td><td><div class="comment-user"> &nbsp' + Msg.name + '</div></td><td> </td><td><div id="comment-14" data-commentid="14" class="comment comment-step1">' + Msg.data + '</div> </td></tr></table>';
}