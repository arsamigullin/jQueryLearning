window.onload = function () {
  var timeClickCountSending = setTimeout(sendountClicksToTheServer, 2000);
   var ty = document.getElementById("1");

};

window.onunload = function(){
    sendountClicksToTheServer();
}

function sendountClicksToTheServer() {
        if (typeof (Storage) !== "undefined") {
            let clickcount = '0';
            if (localStorage.clickcount) {
                clickcount = localStorage.clickcount;
            }
            // implement code that will send counts to server
            setTimeout(sendountClicksToTheServer, 2000);
        }
        else {
            document.getElementById("txt_clickresult").value = "Sorry, your browser does't support localstorage";
        }
    }

function countClick() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        }
        else {
            localStorage.clickcount = 1;
        }
        document.getElementById("txt_clickresult").value = localStorage.clickcount;
        return;
    }
    document.getElementById("txt_clickresult").value = "Sorry, your browser does't support localstorage";
}



