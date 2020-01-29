let testQuestions = [];
let resQuestion = [];
let TestTitle = document.getElementById('testTitle');
let timing = document.getElementById('testTiming');
var userSession = JSON.parse(sessionStorage.getItem("userSessionKey"));
const link ="http://"+ window.location.host +"/";
//////
$(document).ready(()=>{
    console.log("Data Updated");
    console.log(userSession);
    if(userSession == null)
    {
        window.location.replace(link);
    }
    loadQuestions();
});
//////

let testId = Math.round(new Date().getTime() + (Math.random() * 5));
function addQuestionToArray(index) {
    $('#question' + index).replaceWith('<button class="btn btn-success" disabled>Added</button>');
    testQuestions.push(resQuestion[index]);
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
    return true;
}
function createTest() {
    if(!checkFields())
    {
        alert("Fill title and Time fields to proceed.");
    }
    else{
        let test = {
        TestQuestion: testQuestions,
        TestId: testId,
        Timing: timing.value,
        TestTitle: TestTitle.value
    }
    console.log(test);
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
                el.append("<th>Select Questions</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (let i = 0; i < resQuestion.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '</td>')
                    el.append('<td>' + resQuestion[i].Title + '</td>');
                    el.append('<td>' + resQuestion[i].Description + '</td>');
                    el.append('<td><a><button id=question' + i + ' onclick=addQuestionToArray("' + i + '") class="btn btn-warning">Add Question</button></a></td>');
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