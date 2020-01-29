var userSession = JSON.parse(sessionStorage.getItem("userSessionKey"));
const link = window.location.href;
updateData = function()
{
    console.log("Data Updated");
    console.log(userSession);
    if(userSession == null)
    {
        window.location.goBack();
    }
}
function checkFields()
{
    if ($('#questionTitle').val() != "" && $('#questionDescription').val() != "")
    {
        if ($('#Option1').val() != "" && $('#Option').val() != "" && $('#Option3').val() != "" && $('#Option2').val() != "") {
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
    if (checkFields()){
        $.ajax({
            type: "POST",
            data: JSON.stringify({
                Title: $('#questionTitle').val(),
                Description: $('#questionDescription').val(),
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
                for (let i = 0; i < data.length;i++)
                    modalId.append("\
                    <div style='border-bottom-style:solid;border-bottom-width:1px;'>\
                    <h6 style='float:right;'><Button onClick='viewResult("+data[i].Id+")' class='btn btn-primary'>View Result</Button></h6>\
                    <h5>"+data[i].Title+"</h5>\
                    <h6> Key : "+data[i].Id+"</h6>\
                    </div><br>\
                    ");
            }
        }
    }
}
function logout(){
    console.log("In logout");
    sessionStorage.removeItem('userSessionKey');
    window = window.location.replace('http://localhost:3000');
}

function viewResult(testKey) {
    sessionStorage.setItem("testKey", testKey);
    window.location.replace('./components/viewResult.html');
}