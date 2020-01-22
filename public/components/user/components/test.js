let timing = document.getElementById('time');
let title = document.getElementById('title');
let testDiv = $('#test-object');
let user;
let test;
let isTestFinished = false;
let userSession = JSON.parse(sessionStorage.getItem('NormalSessionKey'));
///// 1574514937759
$(document).ready(() => {
    if(userSession==null)
    {
        sessionStorage.clear();
        window.location.replace('../../../index.html');
    }
    updateVariables();
    title.innerHTML = test.Title;
    time += test.Time;
    addQuestion(test);
    console.log(test);
    callTime(test.Timing);
});
function updateVariables() {
    let time = 1;
    user = sessionStorage.getItem('NormalSessionKey');
    test = JSON.parse(sessionStorage.getItem("Test"));
}

function postResult(Percentage) {
    let User = JSON.parse(user);
    fetch('http://localhost:3000/postResult', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            TestTitle: test.Title,
            Percentage: Percentage,
            StudentName: User.Name,
            StudentEmail: User.Email,
            TestId: test.Id
        })
    })
    .catch((error) => {
        console.error(error);
    });
    $('#myModal').on('hidden.bs.modal', function (e) {
        window.location.replace('../userPage.html');
    })
}

function addQuestion(test) {
    for (let i = 0; i < test.Questions.length; i++) {
        testDiv.append("\
        <div class='question-box'><h4 style='font-weight:bold'>"+ test.Questions[i].Title + "</h4>\
        <h5>"+ test.Questions[i].Description + "</h5><br>\
        <div class='form-group'>\
        <input type='radio' name='option"+i+"' value="+ test.Questions[i].Options[0] + ">" + test.Questions[i].Options[0] + "<br>\
        <input type='radio' name='option"+i+"' value="+ test.Questions[i].Options[1] + ">" + test.Questions[i].Options[1] + "<br>\
        <input type='radio' name='option"+i+"' value="+ test.Questions[i].Options[2] + ">" + test.Questions[i].Options[2] + "<br>\
        <input type='radio' name='option"+i+"' value="+ test.Questions[i].Options[3] + ">" + test.Questions[i].Options[3] + "<br>\
        </div></div>\
        <hr>\
        ")
    }
    testDiv.append('<button onClick="checkOptionChecked()" type="button" class="btn btn-warning">Submit Test</button>')
}
function callTime(time) {   //time
    let timeInMinutes = time;
    let timeInSeconds = (time*60)%60;
    const val = setInterval(() => {
        timing.innerHTML = timeInMinutes + "min" + " " + timeInSeconds + "sec";
        if (timeInMinutes == 0 && timeInSeconds == 0) {
            checkOptionChecked();
            clearInterval(val);
        }
        else if (timeInSeconds == 0) {
            timeInMinutes--;
            timeInSeconds = 60;
        }
        timeInSeconds--;
    }, 1000);
}
function checkOptionChecked() {
    let score=0;
    for (var j = 0; j < test.Questions.length; j++) {
        let ele = document.getElementsByName('option'+j);
        for(let i = 0; i < ele.length; i++) {  
                if(ele[i].checked) 
                {
                   if(test.Questions[j].CorrectAnswerNo == i)
                   {
                       score++;
                   }
                   break;
                }
        } 
        console.log(j+" check");
        if(j==test.Questions.length-1)
        {
            document.getElementById('percent').innerHTML ="Percentage :"+((score/test.Questions.length)*100)+"%";
            document.getElementById('correct').innerHTML ="Correct Answers :"+score+"/"+test.Questions.length;
            $("#myModal").modal()
            postResult((score/test.Questions.length)*100+"%");
        }
    }
}
