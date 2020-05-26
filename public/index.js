var userIDCounter = 0;
var registeredUserList = [];
var loginAjax = new XMLHttpRequest();
var storeAjax = new XMLHttpRequest();

function checkUser(userInfo) {
    loginAjax.open("POST", "/getUser");
    loginAjax.setRequestHeader("Content-Type", "application/json");
    loginAjax.send(JSON.stringify(userInfo));
}

function showMessage() {
    document.getElementById('message').style = "color: red;"
}

function hideMessage() {
    document.getElementById('message').style = "color: red; display: none";
    document.getElementById('message').innerHTML= "";
}

function checkEmailPresent(mail, pass) {
    checkUser({ mail, pass });
    loginAjax.onreadystatechange = function () {
        var idLogin = document.getElementById('login-button');
        if (loginAjax.readyState == 4 && loginAjax.status == 200) {
            var statusRes = loginAjax.responseText;
            idLogin.innerHTML = "Logging";
            if (statusRes != "false") {
                if (JSON.parse(statusRes).Email == "ak@ak.com" || JSON.parse(statusRes).Email == "arun6153@gmail.com") {
                    window.location.replace('../components/admin/adminPage.html');
                    sessionStorage.setItem("userSessionKey", statusRes);
                }
                else{
                    window.location.replace('../components/user/userPage.html');
                    sessionStorage.setItem("NormalSessionKey", statusRes);
                }
            }
            else {
                document.getElementById('message').innerHTML = "Wrong Username or Password";
                showMessage();
                idLogin.innerHTML = "Login";
            }
        }
        else{
            idLogin.innerHTML = "Checking...";
        }
    };
}

function loginUser() {
    //console.log("fgd");
    var Email = document.getElementById("loginEmail");
    var Password = document.getElementById("loginPassword");
    if (Email.value == "" || Password.value == "") {
        document.getElementById('message').innerHTML = "Fill the empty fields";
        showMessage();
        (Email.value == "") ? Email.focus() : Password.focus();
    }
    else {
        checkEmailPresent(Email.value, Password.value);
    }
}

function storeUserInfo(userInfo) {
    storeAjax.open("POST","/registerUser");
    storeAjax.setRequestHeader("Content-Type", "application/json");
    storeAjax.send(JSON.stringify(userInfo));
}

function addNewUser() {
    var k = $('#exampleModal');
    var Email = document.getElementById("registerEmail").value;
    var Name = document.getElementById("registerUserName").value;
    var Branch = document.getElementById("branch").value;
    var Password = document.getElementById("Password1").value;
    var CPassword = document.getElementById("Password2").value;
    var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(Email == "" || emailPattern.test(Email) == false){
        alert("Enter Valid Email");
    }
    else if (!checkUserName(Name) || Name == "") {
        alert("Your name has numbers or its empty.");
    }
    else if (CPassword.trim() != Password.trim() || Password == "") {
        alert("Your password does not match");
    }
    else {
        var userInfo = {
            Email,
            Name,
            Branch,
            Password,
            Type: "User"
        };
        k.modal('hide');
        storeUserInfo(userInfo);
    }
}

function checkUserName(name) {
    var exp = /[0-9]/g;
    var result = name.match(exp) || [];
    result = result.length;
    if (!result) return true;
    document.getElementById("registerUserName").focus();
    return false;
}