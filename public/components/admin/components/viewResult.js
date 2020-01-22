function loadResult() {
    $.ajax({
        type: "POST",
        data: JSON.stringify({ 
            TestId: sessionStorage.getItem("testKey")
        }),
        url: 'http://localhost:3000/getResult',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            if (data == "[]") {
                $("#container").append("<div class='text-center' style='font-size: 30px;'>No one gave the test yet.<br></div>");
            }
            else {
                $("#table-container").attr("style", "");
                var res = JSON.parse(data);
                console.log(res);
                var el = $("<thead class='thead-dark'>");
                el.append("<tr>");
                el.append("<th>S. No.</th>");
                el.append("<th>Student Name</th>");
                el.append("<th>Percentage</th>");
                el.append("<th>Title</th>");
                el.append("<th>Submitted At</th>");
                el.append("</tr>");
                $("#table").append(el);
                $("#table").append("<tbody>");
                for (var i = 0; i < res.length; i++) {
                    el.append("<tr>");
                    el.append('<td>' + parseInt(i + 1) + '.</td>')
                    el.append('<td>' + res[i].StudentName.toUpperCase() + '</td>');
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
    window.location.replace('http://localhost:3000');
}
$(document).ready(function () {
    let userSession = sessionStorage.getItem('userSessionKey');
    if (userSession == null) {
        window.location.replace('http://localhost:3000');
    }
    loadResult();
});