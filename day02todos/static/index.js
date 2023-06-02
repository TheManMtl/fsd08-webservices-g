var selectedId;
var table;
var returnedId;

$(document).ready(() => {

    refreshTodoList();//load all records todos in db 
    $("#showAddItem").on('click', showAddEditPane);// show add/edit pane
    $("#delete").on('click', deleteById); // delete a todo
    $("#saveOrAdd").on('click', saveOrUpdateRow); // delete a todo
    $("#viewAddEditPane").hide(); // hide add/edit pane
})


// hide/unhide add/edit pane
function showAddEditPane() {

    $('#viewAddEditPane').show();
    $('#saveOrAdd').text('Add');
    $('#delete').prop('disabled', false);


    //$('#delete').attr('data-id', yourId);

}



function hideShowEditPane() {
    $("#viewAddEditPane").hide(); // hide add/edit pane
}
//retrieve data from db to html table
function refreshTodoList() {
    $.ajax({
        url: "/api/todos",
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }
    }).done((todoList) => {
        var result = '<tr><th>#</th><th onclick="sortByTask(task)">Task</th>' +
            '<th onclick="sortByTask(dt)>Due date</th><th onclick="sortByTask(done)>Done?</th></tr>';
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i];

            result += '<tr onclick="selectItem(' + todo.id + ')">';
            result += '<td>' + todo.id + '</td>';
            result += '<td>' + todo.task + '</td>';
            result += '<td>' + todo.parsedDate + '</td>';
            result += '<td>' + todo.isDone + '</td>';
            result += '</tr>' + "\n";
        }
        $("#listTable").html(result);
        table = result;
    })
}

//delete by selecting a row
function deleteById() {

    let toDelete = confirm('Are you sure?\n OK to proceed delete\ncancel to cancel delete');
    if (toDelete && selectedId != '') {
        $.ajax({
            url: "/api/todos/" + selectedId,
            type: "DELETE",
            dataType: "json",
            error: function (jqxhr, status, errorThrown) {
                alert("AJAX error: " + jqxhr.responseText);
            }

        }).done(() => {
            var result = '<p id="res" onclick="deleteHide()"> id : ' + selectedId + ' is deleted</p>';

            $("#res").html(result);

            refreshTodoList();
        })
    } else {
        var result = '<p id="res" onclick="deleteHide()">  No row is selected</p>';

        $("#res").html(result);
    }
}


function selectItem(id) {
    $('#viewAddEditPane').show();
    selectedId = id;
    $("#currentId").text(selectedId);

    findOneById(selectedId);

}

function findOneById(id) {

    $.ajax({
        url: "/api/todos/" + id, // test with ``
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done((todoList) => {

        var todo = todoList;

        var checked = todo.isDone == "Done" ? true : false;
        $('#date-input').val(todo.parsedDate);
        $('#task').val(todo.task);
        $('#isDone').attr('checked', checked);

        $('#saveOrAdd').text('Save');
        $('#delete').prop('disabled', true);

        returnedId = todo.id;
    })

}


function deleteHide() {
    var result = '<p id="res" onclick="deleteHide()"></p>';

    $("#res").html(result);
    $('#res').hide();
}

function saveOrUpdateRow() {

    let saveOrUpade = selectedId !== undefined ? 'save' : 'add';


    if (saveOrUpade === 'add') {
        add();
    } else {
        save();
    }
}

function add() {
    let dt = $('#date-input').val();
    let task = $('#task').val();
    let isDone = $('#isDone').prop('checked') === false ? "Pending" : "Done";

    var data = {
        task: task,
        dueDate: dt,
        isDone: isDone
    };

    $.ajax({
        url: "/api/todos",
        type: "POST",
        data: data,
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done((todoList) => {

        var todo = todoList;

        //var parsedDate = new Date(todo.dueDate);

        table += '<tr onclick="selectItem(' + todo.id + ')">';
        table += '<td>' + todo.id + '</td>';
        table += '<td>' + todo.task + '</td>';
        table += '<td>' + todo.parsedDate + '</td>';
        table += '<td>' + todo.isDone + '</td>';
        table += '</tr>' + "\n";

        $("#listTable").html(table);
        $('#viewAddEditPane').hide();
    })

    refreshTodoList();
}

function save() {
    let dt = $('#date-input').val();
    let task = $('#task').val();
    let isDone = $('#isDone').prop('checked') === true ? "Done" : "Pending";

    var data = {
        task: task,
        dueDate: dt,
        isDone: isDone
    };

    $.ajax({
        url: "/api/todos/" + selectedId,
        type: "PUT",
        data: data,
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done(() => {

        $('#viewAddEditPane').hide();
    })

    refreshTodoList();
}

function sortByTask(type) {

    console.log("task sort");
    
    $.ajax({
        url: "/api/todos?sortElem=" + type,
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done((todoList) => {
        var result = '<tr><th>#</th><th onclick="sortByTask()">Task</th><th>Due date</th><th>Done?</th></tr>';
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i];

            //var parsedDate = new Date(todo.dueDate);

            result += '<tr onclick="selectItem(' + todo.id + ')">';
            result += '<td>' + todo.id + '</td>';
            result += '<td>' + todo.task + '</td>';
            result += '<td>' + todo.parsedDate + '</td>';
            result += '<td>' + todo.isDone + '</td>';
            result += '</tr>' + "\n";
        }
        $("#listTable").html(result);
        table = result;
    })


}