var userSession = JSON.parse(sessionStorage.getItem("userSessionKey"));
const link ="http://"+ window.location.host +"/";
updateData = function()
{
    console.log("Data Updated");
    console.log(userSession);
    if(userSession == null)
    {
        window.location.replace(link);
    }
}
function checkFields()
{
    if ($('#questionTitle').val() != "" && $('#questionDescription').val() != "")
    {
        if ($('#Option1').val() != "" && $('#Option4').val() != "" && $('#Option3').val() != "" && $('#Option2').val() != "") {
            if($('#branch').val()==="Other"){
                if($('#b-other').val()=="")
                    return false;
            }
            if($('#subject').val()==="Other"){
                if($('#s-other').val()=="")
                    return false;
            }

            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function addQuestion() {
    var branch="";
    if (checkFields()){
        if($('#branch').val()==="Other"){
            branch = $('#b-other').val();
        }
        else
            branch=$('#branch').val();
        
        var subject="";

        if($('#subject').val()==="Other"){
            subject=$('#s-other').val();
        }
        else{
            subject=$('#subject').val();
        }

        $.ajax({
            type: "POST",
            data: JSON.stringify({
                Title: $('#questionTitle').val(),
                Description: $('#questionDescription').val(),
                Branch: branch,
                Subject: subject,
                CorrectAnswerNo: $('#answer').prop('selectedIndex'),
                Options: [$('#Option1').val(), $('#Option2').val(), $('#Option3').val(), $('#Option4').val()]
            }),
            url: link+'addQuestion',
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: function () {
               $('#questionsModal').modal('hide');
            }
        });
    }
    else{
        let addVal = $('#Success');
        alert("Fill the empty fields to proceed");
        addVal.append('<div class="alert alert-success alert-dismissible fade show">\
        <button type="button" class="close" data-dismiss="alert">&times;</button>\
        <strong>Submitted!</strong> The question has been submitted successfully.\
      </div>');
    }
}

let isLoaded = false;
function addQuestionCreated()
{

    let reqXml = new XMLHttpRequest();
    reqXml.open('GET', link+"getCreateTest");
    reqXml.send();
    reqXml.onreadystatechange = function () {
        if (reqXml.readyState == 4 && reqXml.status == 200) {
            let data = JSON.parse(reqXml.responseText);
            let modalId = $('#addCreatedTest');
            if (data == null) {
                modalId.append('<h3>No Test Created yet!!!</h3>')
            }
            else if(!isLoaded) {
                isLoaded = true;
                for (let i = 0; i < data.length;i++){
                    modalId.append("\
                    <div style='border-bottom-style:solid;border-bottom-width:1px;'>\
                    <h6 style='float:right;'><Button onClick='viewResult("+data[i].Id+")' class='btn btn-primary'>View Result</Button></h6>\
                    <h5>"+data[i].Title+"("+data[i].Subject +")</h5>\
                    <h6> Key : "+data[i].Id+"</h6>\
                    </div><br>\
                    ");
                    //console.log(data[i]);
                }
            }
        }
    }
}

$("#branch").change(function(){
    var el =$(this);
    var op1 = document.getElementById("c-option1");
    var op2 = document.getElementById("c-option2");
    var op3 = document.getElementById("c-option3");
    if(el.val()==="Civil Engineering"){
        document.getElementById("b-other").type = "hidden";
        op1.innerHTML="Earthquake Engineering"
        op2.innerHTML="Coastal engineering"
        op3.innerHTML="Architecture and Town Planning"
    }
    else if(el.val()==="Computer Science Engineering"){
        document.getElementById("b-other").type = "hidden";
        op1.innerHTML="Java"
        op2.innerHTML="DBMS"
        op3.innerHTML="Operating System"
    }
    else if(el.val()==="Mechanical Engineering"){
        document.getElementById("b-other").type = "hidden";
        op1.innerHTML="Strength of Materials"
        op2.innerHTML="Thermodynamics"
        op3.innerHTML="Fluid Mechanics"
    }
    if(el.val()==="Other"){
        document.getElementById("b-other").type = "text";
    }
    console.log(el.val());
})

$("#subject").change(function(){
    var sub = $(this);
    if(sub.val()==="Other")
    document.getElementById("s-other").type = "text";
    else
    document.getElementById("s-other").type = "hidden";

})


function logout(){
    console.log("In logout");
    sessionStorage.removeItem('userSessionKey');
    window = window.location.replace('http://localhost:3000');
}

function viewResult(testKey) {
    sessionStorage.setItem("testKey", testKey);
    window.location.replace('./components/viewResult.html');
}