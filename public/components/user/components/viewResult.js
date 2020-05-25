const link ="http://"+ window.location.host +"/";
var userSession;
function loadResult() {
    let us = JSON.parse(userSession);
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 
            TestId: sessionStorage.getItem("testKey"),
            email:us.Email
        }),
        url: link+'getUserResult',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            if (data == "[]") {
                $("#container").append("<div class='text-center' style='font-size: 30px;'>No one has given a test yet.<br></div>");
            }
            else {
                $("#table-container").attr("style", "");
                var res = JSON.parse(data);
                console.log(res);
                var el = $("<thead class='thead-dark'>");
                el.append("<tr>");
                el.append("<th>S. No.</th>");
                el.append("<th>Percentage</th>");
                el.append("<th>Title</th>");
                el.append("<th>Submitted At</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (var i = 0; i < res.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '.</td>')
                    el.append('<td>' + res[i].Percentage + '</td>');
                    el.append('<td>' + res[i].TestTitle + '</td>');
                    el.append('<td>' + res[i].createdAt.substring(0,9) + '</td>');
                    el.append("<tr>");
                }
                $("#table").append(el);
            }
        }
    });
}

function logout() {

    localStorage.removeItem('userSessionKey');
    window.location.replace(link);
}
$(document).ready(function () {
    userSession = sessionStorage.getItem('NormalSessionKey');
    //console.log(JSON.parse(userSession))
    if (userSession == null) {
        window.location.replace(link);
    }
    loadResult();
});