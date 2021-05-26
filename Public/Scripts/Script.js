var socket = io();

socket.on('data', (a) => {
    putMSGdata(a);

})
socket.on('login', (a) => {

    if (a.docs != []&&(a.docs).length!=0) {
        (a.docs).forEach(m => {
            putMSGdata(m, false)
        });
    } else {
        putMSGdata("{}", true)
    }

    dataLayer.push({
        'event': 'Login',
        'Hash': window.location.hash
    });

})


async function sendMsg() {
    var name = NameSetter()
    data = document.querySelector("#sendMsg").value;


    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1);
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date + ' at ' + time + ' ';
    var Encrypted = CryptoJS.AES.encrypt(data, (window.location.hash).split('#')[1]);
    var Msg = {
        "data": Encrypted.toString(),
        "time": dateTime,
        "hash": window.location.hash,
        "name": name,
        "Media": false
    };
    if (Msg.data != "") {
        await socket.emit('Msg', Msg);
        document.querySelector("#sendMsg").value = "";

        window.location.reload();

    } else {
        alert("Please enter your message")
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

    if ((sessionStorage.getItem('name') == null) || (sessionStorage.getItem('name') == '') || !(sessionStorage.getItem('name'))) {
        var name = prompt('Enter Your name');
        debugger;
        sessionStorage.setItem('name', name);
    } else {
        var name = sessionStorage.getItem('name');
    }
    if ((sessionStorage.getItem('name') != null) && (sessionStorage.getItem('name') != '') && (sessionStorage.getItem('name') != undefined))
        return name;

}

function putMSGdata(Msg, First) {
    // document.querySelector("#sizing-addon3").innerHTML='Updated' + Msg.time ;
    if (First) {
        var defaultMSG = "Chat application:you can change the hash value (hash tag ) in the url to create your own chatroom where you can chat with your friend's , all chats are encrypted using AES so no one from server end can see the datab directly ,all chat messages will automatically get deleted after 2 days";
        document.querySelector("#Output").innerHTML = '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + "OverLoRd(Actual)" + '</span><span class="direct-chat-timestamp pull-right">' + "00:00" + '</span></div><img class="direct-chat-img" src="./Img/user.svg" alt="message user image"><div class="direct-chat-text">' + defaultMSG + '</div></div>';

    } else {
        var name = NameSetter();
        var old = document.querySelector("#Output").innerHTML || " ";
        Decrypted = CryptoJS.AES.decrypt(Msg.data, (window.location.hash).split('#')[1]);
        var Decry = Decrypted.toString(CryptoJS.enc.Utf8);
        if (name != Msg.name) {
            if (Decry.includes("data:")) {

                if (Decry.includes("data:image")) {

                    document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + Msg.name + '</span><span class="direct-chat-timestamp pull-right">' + Msg.time + '</span></div><img class="direct-chat-img" src="./Img/user.svg"alt="message user image"><div class="direct-chat-text"><a href= ' + Decry + ' download> <img src=" ' + Decry + '" id="ConvIMG" class="output" style="width: 70%; margin-left: 0%"></img></a></div></div>'


                } else {
                    document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + Msg.name + '</span><span class="direct-chat-timestamp pull-right">' + Msg.time + '</span></div><img class="direct-chat-img" src="./Img/user.svg" alt="message user image"><div class="direct-chat-text"><a href= ' + Decry + ' download> <img src="./Img/att.svg" ></img></a></div></div>'


                }
            } else {
                document.querySelector("#Output").innerHTML = old + '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">' + Msg.name + '</span><span class="direct-chat-timestamp pull-right">' + Msg.time + '</span></div><img class="direct-chat-img" src="./Img/user.svg" alt="message user image"><div class="direct-chat-text">' + Decry + '</div></div>';
            }


        } else {
            if (Decry.includes("data:")) {
                if (Decry.includes("data:image")) {
                    // saveIMG() 
                    document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg right"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">' + Msg.name + '</span><span class="direct-chat-timestamp pull-left">' + Msg.time + '</span></div><img class="direct-chat-img" src="./Img/user.svg"alt="message user image"><div class="direct-chat-text"> <a href= ' + Decry + ' download><img src=" ' + Decry + '" id="ConvIMG" class="output" style="width: 70%; margin-left: 30%"></img></a></div></div>'


                } else {

                    document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg right"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">' + Msg.name + '</span><span class="direct-chat-timestamp pull-left">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text"> <a href= ' + Decry + ' download> <img src="./Img/att.svg" ></img></div></div>'
                }
            } else {
                document.getElementById("Output").innerHTML = old + '<div class="direct-chat-msg right "><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">' + Msg.name + '</span><span class="direct-chat-timestamp pull-left">' + Msg.time + '</span></div><img class="direct-chat-img" src="https://img.icons8.com/color/36/000000/administrator-male.png"alt="message user image"><div class="direct-chat-text">' + Decry + '</div></div>'
            }
        }

        document.getElementById('bottom').scrollIntoView();
    }
}
document.addEventListener('BeforeUnload', () => {
    socket.leave(window.location.hash);
})

function postCurly(data, endpoint) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            document.getElementById("sendMsg").placeholder = "Your file is uploaded";

        }
    });
}

function convIMG(Img) {
    var file = Img.files[0];
    var reader = new FileReader();
    document.getElementById("sendMsg").placeholder = "Your file is beeing uploaded";
    reader.onloadend = function () {

        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1);
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' at ' + time + ' ';
        var Encrypted = CryptoJS.AES.encrypt(reader.result, (window.location.hash).split('#')[1]);
        var Msg = {
            "data": Encrypted.toString(),
            "time": dateTime,
            "hash": window.location.hash,
            "name": NameSetter(),
            "Media": true

        };
        postCurly(JSON.stringify(Msg), window.location.origin + '/upload')
        putMSGdata(Msg);
    }
    reader.readAsDataURL(file);

}
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMsg();
    }
});