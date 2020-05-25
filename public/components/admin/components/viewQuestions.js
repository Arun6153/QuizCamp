var res;
var _id;
function editAction(index){
    //console.log(res)
    _id = res[index]._id;
    $('#questionTitle').val(res[index].Title);
    $('#questionDescription').val(res[index].Description);
    $('#Option1').val(res[index].Options[0]);
    $('#Option2').val(res[index].Options[1]);
    $('#Option3').val(res[index].Options[2]);
    $('#Option4').val(res[index].Options[3]);
    if(res[index].Branch!="Computer Science Engineering" && res[index].Branch!="Civil Engineering" && res[index].Branch!="Mechanical Engineering" && res[index].Branch!="Other"){
        $('#branch').val("Other");
        document.getElementById("b-other").type = "text";
        //$('#b-other').show();
        $('#b-other').val(res[index].Branch)
    }
    else{
        $('#branch').val(res[index].Branch);
        document.getElementById("b-other").type = "hidden";
    }

    if(res[index].Subject!="Java" && res[index].Subject!="DBMS" && res[index].Subject!="Operating System" && res[index].Subject!="Earthquake Engineering" 
        && res[index].Subject!="Coastal Engineerinng" && res[index].Subject!="Architecture and Town Planning" && res[index].Subject!="Strength of Materials"
        && res[index].Subject!="Fluid Mechanics" && res[index].Subject!="Thermodynamics"){
            $('#subject').val("Other");
            document.getElementById("s-other").type = "text";
            $('#s-other').val(res[index].Subject);
        }
    else{
            document.getElementById("s-other").type="hidden";
            $('#subject').val(res[index].Subject);
    }
    //console.log("Option "+(res[index].CorrectAnswerNo+1))
    $('#answer').val("Option "+(res[index].CorrectAnswerNo+1));


}

const link ="http://"+ window.location.host +"/";


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


function submitEdit() {
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
                Options: [$('#Option1').val(), $('#Option2').val(), $('#Option3').val(), $('#Option4').val()],
                id:_id
            }),
            url: link+'editQuestionDetails',
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: function () {
               $('#questionsModal').modal('hide');
               location.reload();
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
                res = JSON.parse(data);
                var el = $("<thead class='thead-dark'>");
                el.append("<tr>");
                el.append("<th>S. No.</th>");
                el.append("<th>Title</th>");
                el.append("<th>Description</th>");
                el.append("<th>Branch</th>");
                el.append("<th>Subject</th>");
                el.append("<th>Modify</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (var i = 0; i < res.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '</td>')
                    el.append('<td>' + res[i].Title + '</td>');
                    el.append('<td>' + res[i].Description + '</td>');
                    el.append('<td>' + res[i].Branch + '</td>');
                    el.append('<td>' + res[i].Subject + '</td>');
                    el.append('<td><button class="btn btn-secondary" onclick=editAction(' + i +') data-toggle="modal" data-target="#questionsModal" id=question'+i+'>Edit</button></td>');
                    el.append("<tr>");
                }
                $("#table").append(el);
            }
        }
    });
}


$("#branch").change(function(){
    var el =$(this);
    var op1 = document.getElementById("c-option1");
    var op2 = document.getElementById("c-option2");
    var op3 = document.getElementById("c-option3");
    if(el.val()==="Civil Engineering"){
        document.getElementById("b-other").type = "hidden";
        op1.innerHTML="Earthquake Engineering"
        op2.innerHTML="Coastal Engineering"
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

const link ="http://"+ window.location.host +"/";

function logout(){
    //console.log("In logout");
    sessionStorage.removeItem('userSessionKey');
    window = window.location.replace(link);
}
$(document).ready(function () {
    let userSession = sessionStorage.getItem('userSessionKey');
    if (userSession == null) {
        window.location.replace(link);
    }
    loadQuestions();
});
