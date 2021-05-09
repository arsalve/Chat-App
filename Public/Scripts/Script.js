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

    dataLayer.push({
        'event': 'Login',
        'Hash': window.location.hash
    });

})

function sendMsg(data) {
    var name = NameSetter()
    data=data||document.querySelector("#sendMsg").value;

    if ((name != null) && (name != "")&&(data != null) && (data != "")) {
        sessionStorage.setItem("name", name);
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1);
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' at ' + time + ' ';
        var Encrypted = CryptoJS.AES.encrypt(data, (window.location.hash).split('#')[1]);
        var Msg = {
            "data": Encrypted.toString(),
            "time": dateTime,
            "hash": window.location.hash,
            "name": name
        };
        if (Msg.data != "") {
            socket.emit('Msg', Msg);
            document.querySelector("#sendMsg").value = "";
        } else {
            alert("Please enter your message")
        }
    } else {
        
        console.log('no User Found');
        NameSetter() ;
    }
}


function load_text() {
    if (window.location.hash == "") {
        window.location.hash = "sarvajanik"
    }
    socket.emit('Login', {
        "hash": window.location.hash
    })
}

// function putMSG(Msg) {

//     var old = document.querySelector("#output").innerHTML;
//     document.querySelector("#output").innerHTML = old + '<table class="form-comments-table"><tr><td><div class="comment-timestamp">' + Msg.data.time + '</div></td><td><div class="comment-user"> &nbsp' + Msg.data.name + '</div></td><td> </td><td><div id="comment-14" data-commentid="14" class="comment comment-step1">' + Msg.data.data + '</div> </td></tr></table>';
// }

function NameSetter() {
    
    if ((sessionStorage.getItem('name') == null)||(sessionStorage.getItem('name') == '')||!(sessionStorage.getItem('name')) ) {
        var name = prompt('Enter Your name');
        debugger;
        sessionStorage.setItem('name', name);
    } else {
        var name = sessionStorage.getItem('name');
    }
    if((sessionStorage.getItem('name') != null)&&(sessionStorage.getItem('name') != '')&&(sessionStorage.getItem('name') != undefined)) 
    return name;

}

function putMSGdata(Msg) {
    // document.querySelector("#sizing-addon3").innerHTML='Updated' + Msg.time ;
    var name = NameSetter();
    var old = document.querySelector("#Output").innerHTML || " ";
    Decrypted = CryptoJS.AES.decrypt(Msg.data, (window.location.hash).split('#')[1]);
    var Decry = Decrypted.toString(CryptoJS.enc.Utf8);

    if (name != Msg.name) {
        if (Decry.includes("data:image")) {
    
            document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + Msg.name + '</span><span class="direct-chat-timestamp pull-right">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text"><a href= '+Decry+' download> <img src=" ' + Decry + '" id="ConvIMG" class="output" style="width: 70%; margin-left: 0%"></img></a></div></div>'


        } else {
            document.querySelector("#Output").innerHTML = old + '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + Msg.name + '</span><span class="direct-chat-timestamp pull-right">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text">' + Decry + '</div></div>';
        }


    } else {
        if (Decry.includes("data:image")) {
            // saveIMG() 
            document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg right"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">' + Msg.name + '</span><span class="direct-chat-timestamp pull-left">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text"> <a href= '+Decry+' download><img src=" ' + Decry + '" id="ConvIMG" class="output" style="width: 70%; margin-left: 30%"></img></a></div></div>'


        } else {
            document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg right "><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">' + Msg.name + '</span><span class="direct-chat-timestamp pull-left">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text">' + Decry + '</div></div>'
        }
    }
   
    document.getElementById('bottom').scrollIntoView();
}
document.addEventListener('BeforeUnload', () => {
    socket.leave(window.location.hash);
})

function convIMG(Img) {
    var file = Img.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      
        sendMsg(reader.result);
        console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);

}
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMsg();
    }
});