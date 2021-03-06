let keyCode = document.getElementById('keyCode');
let userSession = JSON.parse(sessionStorage.getItem('NormalSessionKey'));
const link = "http://"+window.location.host+"/";

$(document).ready(()=>{
    if(userSession==null)
    {
        sessionStorage.clear();
        window.location.replace(link);
    }
});

function checkTest(){
    if(keyCode.value != "")
    {
        let checkTest = new XMLHttpRequest();
        checkTest.open('POST',link+"getTest");
        checkTest.setRequestHeader("Content-Type","application/json");
        checkTest.send(JSON.stringify({Key:keyCode.value,Email:userSession.Email}));
        
        checkTest.onreadystatechange = function(){
            if(checkTest.readyState == 4 && checkTest.status ==200)
            {
                //console.log(JSON.parse(checkTest.responseText).length);
                if(JSON.parse(checkTest.responseText).bool!=false)
                {
                    if(JSON.parse(checkTest.responseText).Branch==userSession.Branch){
                    sessionStorage.setItem("Test",checkTest.responseText);
                    window.location.replace("./components/test.html");
                    console.log(JSON.parse(checkTest.responseText))
                    }
                    else{
                        alert("You cannot attempt exam of different branch");
                    }
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
    //console.log("In logout");
    sessionStorage.removeItem('NormalSessionKey');
    window = window.location.replace(link);
}