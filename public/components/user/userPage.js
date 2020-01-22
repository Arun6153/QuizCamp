let keyCode = document.getElementById('keyCode');

let userSession = JSON.parse(sessionStorage.getItem('NormalSessionKey'));

$(document).ready(()=>{
    if(userSession==null)
    {
        sessionStorage.clear();
        window.location.replace('../../index.html');
    }
});

function checkTest(){
    if(keyCode.value != "")
    {
        let checkTest = new XMLHttpRequest();
        checkTest.open('POST',"http://localhost:3000/getTest");
        checkTest.setRequestHeader("Content-Type","application/json");
        checkTest.send(JSON.stringify({Key:keyCode.value,Email:userSession.Email}));
        
        checkTest.onreadystatechange = function(){
            if(checkTest.readyState == 4 && checkTest.status ==200)
            {
                console.log(JSON.parse(checkTest.responseText).length);
                if(JSON.parse(checkTest.responseText).bool!=false)
                {
                    sessionStorage.setItem("Test",checkTest.responseText);
                    window.location.replace("http://localhost:3000/components/user/components/test.html");
                    /// 1574514937759
                }
                else{
                    alert("Entered key is incorrect or you already have given the test.");
                }
            }
        }
    }
    else{
        alert("You Can't submit empty field.");
        keyCode.focus();
    }
}
function logout(){
    console.log("In logout");
    sessionStorage.removeItem('NormalSessionKey');
    window = window.location.replace('http://localhost:3000');
}