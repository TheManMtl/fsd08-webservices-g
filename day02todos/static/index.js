$(document).ready(() => {
    $("#viewAddEditPane").hide();
    refreshTodoList();
    zeroo();
    /* $('#showAddItem').on('click',()=>{
        $('#showAddItem').ontoggle();
    }); */
})

function showAddEditPane(){
    $('#showAddItem').on('click',()=>{
        $('#viewAddEditPane').toggle();
    });
}


function refreshTodoList() {
    $.ajax({
        url: "/api/todos",
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }
    }).done((todoList) => {
        var result = '<tr><th>#</th><th>Task</th><th>Due date</th><th>Done?</th></tr>';
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i];
            result += '<tr onclick="selectItem(' + todo.id + ')">';
            result += '<td>' + todo.id + '</td>';
            result += '<td>' + todo.task + '</td>';
            result += '<td>' + todo.dueDate + '</td>';
            result += '<td>' + todo.isDone + '</td>';
            result += '</tr>' + "\n";
        }
        $("#listTable").html(result);
    })
}