var selectedId = 0;
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
function refreshTodoList(sortOrder) {

    let url = (sortOrder === undefined) ? "/api/todos" : "/api/todos?sort=" + sortOrder
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }
    }).done((todoList) => {
        var thId = `<th onclick="refreshTodoList('id')">#</th>`;
        var thTask = `<th onclick="refreshTodoList('task')">Task</th>`;
        var thDueDate = `<th onclick="refreshTodoList('dueDate')">Due date</th>`;
        var thIsDone = `<th onclick="refreshTodoList('isDone')">Done?</th></tr>`;
        var result = `<tr>${thId}${thTask}${thDueDate}${thIsDone}</tr>`;
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
            selectedId = 0;
            $("#currentId").text(selectedId);
            $('#date-input').val('');
            $('#task').val('');
            $('#isDone').attr('checked',false);
        })
    } else {
        var result = '<div class"row"> <p class="col-12 text-center" id="res" onclick="deleteHide()">  No row is selected</p></div>';
       
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


    }).done((todo) => {

        var isChecked = todo.isDone == "Done" ? true : false;

        $('#date-input').val(todo.parsedDate);
        $('#task').val(todo.task);
        $('#isDone').attr('checked', isChecked);

        $('#saveOrAdd').text('Save');
        //$('#delete').prop('disabled', true);

    })

}


function resultPane() {
    var result = '<p id="res" onclick="deleteHide()"></p>';

    $("#res").html(result);
    $('#res').hide();
}


function saveOrUpdateRow() {

    let saveOrUpade = selectedId !== 0 ? 'save' : 'add';


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
        selectedId = 0;
    })

    refreshTodoList();
}

/* 
function sort(sortOrder) {

    console.log("task sort:", sortOrder);

    let prepUrl = (sortOrder === undefined) ? "/api/todos" : "/api/todos?task=" + sortOrder
    console.log("prepUrl: ",prepUrl);

    $.ajax({
        url: prepUrl,
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done((todoList) => {
        var result = `<tr><th>#</th><th onclick='sort("task")'>Task</th>` +
            `<th onclick='sort("dueDate")'>Due date</th><th onclick='sort("isDone")'>Done?</th></tr>`;
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


}  */