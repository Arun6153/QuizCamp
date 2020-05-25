let testQuestions = [];
let resQuestion = [];
let TestTitle = document.getElementById('testTitle');
let timing = document.getElementById('testTiming');
var userSession = JSON.parse(sessionStorage.getItem("userSessionKey"));
const link ="http://"+ window.location.host +"/";
//////
$(document).ready(()=>{
    //console.log("Data Updated");
    //console.log(userSession);
    if(userSession == null)
    {
        window.location.replace(link);
    }
    loadQuestions();
});
//////

let testId = Math.round(new Date().getTime() + (Math.random() * 5));

function addQuestionToArray(index) {
    $('#rm-btn'+index).show();
    $('#question' + index).replaceWith('<button id=question'+index+' class="btn btn-success" disabled>Added</button>');
    testQuestions.push(resQuestion[index]);
    //console.log(testQuestions);
}

function removeQuestionFromArray(index){
    $('#rm-btn'+index).hide();
    $('#question'+index).replaceWith('<button id=question'+index+' onclick=addQuestionToArray(' + index + ') class="btn btn-warning">Add Question</button>');

    for( var i = 0; i < testQuestions.length; i++){
        if(testQuestions[i].Title.localeCompare(resQuestion[index].Title)==0){
            testQuestions.splice(i,1);
            break;
        }
    }
    //console.log(testQuestions);
}

function checkFields()
{
    if(testQuestions.length == 0)
    {
        alert("Add one question at least");
        return false;
    }
    if(TestTitle.value == "" || timing.value == "")
    {
        return false;
    }
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
    //console.log(el.val());
})

$("#subject").change(function(){
    var sub = $(this);
    if(sub.val()==="Other")
    document.getElementById("s-other").type = "text";
    else
    document.getElementById("s-other").type = "hidden";

})


function createTest() {
    if(!checkFields())
    {
        alert("Fill title and Time fields to proceed.");
    }
    else{
        var branch="";
        var subject="";
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
        let test = {
        TestQuestion: testQuestions,
        TestId: testId,
        Branch:branch,
        Subject:subject,
        Timing: timing.value,
        TestTitle: TestTitle.value
    }
    //console.log(test);
    let createTestXml = new XMLHttpRequest();
    createTestXml.open('POST', link+"createTest");
    createTestXml.setRequestHeader('Content-Type', "application/json");
    createTestXml.send(JSON.stringify(test));
    $('#testKey').text("Test Created, TestKey: " + testId);
    $("#testInfoModal").modal()
    $('#testInfoModal').on('hidden.bs.modal', function (e) {
        window.location.replace('../adminPage.html');
    })
}
}



function loadQuestions() {
    $.ajax({
        type: "GET",
        url: link+'getQuestions',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            if (data == "[]") {
                $("#container").append("<div class='text-center' style='font-size: 30px;'>Nothing here yet.<br> <a href='#' data-toggle='modal' data-target='#questionsModal'><button class='btn btn-primary'>Add Questions</button></a></div>");
            }
            else {
                $("#table-container").attr("style", "");
                resQuestion = JSON.parse(data);
                let el = $("<thead class='thead-dark'>");
                el.append("<tr>");
                el.append("<th>S. No.</th>");
                el.append("<th>Title</th>");
                el.append("<th>Description</th>");
                el.append("<th>Branch</th>");
                el.append("<th>Subject</th>");
                el.append("<th>Select Questions</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (let i = 0; i < resQuestion.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '</td>')
                    el.append('<td>' + resQuestion[i].Title + '</td>');
                    el.append('<td>' + resQuestion[i].Description + '</td>');
                    el.append('<td>' + resQuestion[i].Branch + '</td>');
                    el.append('<td>' + resQuestion[i].Subject + '</td>');
                    el.append('<td><a><button id=question' + i + ' onclick=addQuestionToArray(' + i + ') class="btn btn-warning">Add Question</button></a>&nbsp; <a style=display:none id=rm-btn' + i + ' onclick=removeQuestionFromArray("' + i + '")><span style=font-size:22px;>&#10060;</span></a></td>');
                    //el.append('<td><a><button style=display:none id=rm-btn' + i + ' onclick=removeQuestionFromArray("' + i + '") class="btn btn-warning">Remove</button></a></td>');
                    el.append("</tr>");
                }
                $("#table").append(el);
                $("#table-container").append('<td><a><button onclick=createTest() class="btn btn-primary" data-toggle="modal">Create Test</button></a></td>');
            }
        }
    });
}

function logout() {
    sessionStorage.removeItem('userSessionKey');
    window.location.replace(link);
}