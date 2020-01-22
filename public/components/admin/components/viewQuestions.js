function loadQuestions() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/getQuestions',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            if (data == "[]") {
                $("#container").append("<div class='text-center' style='font-size: 30px;'>Nothing here yet.<br> <a href='#' data-toggle='modal' data-target='#questionsModal'><button class='btn btn-primary'>Add Questions</button></a></div>");
            }
            else {
                $("#table-container").attr("style", "");
                var res = JSON.parse(data);
                var el = $("<thead class='thead-dark'>");
                el.append("<tr>");
                el.append("<th>S. No.</th>");
                el.append("<th>Title</th>");
                el.append("<th>Description</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (var i = 0; i < res.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '</td>')
                    el.append('<td>' + res[i].Title + '</td>');
                    el.append('<td>' + res[i].Description + '</td>');
                    el.append("<tr>");
                }
                $("#table").append(el);
            }
        }
    });
}

function logout() {

    localStorage.removeItem('userSessionKey');
    window.location.replace('http://localhost:3000');
}
$(document).ready(function () {
    let userSession = sessionStorage.getItem('userSessionKey');
    if (userSession == null) {
        window.location.replace('http://localhost:3000');
    }
    loadQuestions();
});