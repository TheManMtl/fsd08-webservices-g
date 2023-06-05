var selectedCode='';

$(document).ready(() => {

    refreshAirportsList();//load all records airport from db 
    $("#showAddItem").on('click', showAddEditPane);// show add/edit pane
    $("#viewAddEditPane").hide(); // hide add/edit pane
    $("#delete").on('click', deleteByCode); // delete a todo
    /* 
    
    $("#saveOrAdd").on('click', saveOrUpdateRow); // delete a todo
     */
})


//retrieve data from db to html table
function refreshAirportsList(sortOrder) {
    console.log(sortOrder);
    let url = sortOrder===undefined? "/api/airports?sort=code" : "/api/airports?sort=" + sortOrder;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }
    }).done((airportsList) => {
        var thCode = `<th onclick='refreshAirportsList("code")'>Airport Code</th>`;
        var thCity = `<th onclick="refreshAirportsList("city")">City</th>`;
        var thlat = `<th onclick="refreshAirportsList('latitude')">Latitude</th>`;
        var thLon = `<th onclick="refreshAirportsList('longitude')">Longitude</th>`;
        var thKind = `<th onclick="refreshAirportsList('kind')">Type</th>`;
        var result = `<tr>${thCode}${thCity}${thlat}${thLon}${thKind}</tr>`;
        for (var i = 0; i < airportsList.length; i++) {
            var airport = airportsList[i];

            result += '<tr onclick="selectItem(' + airport.code + ')">';
            result += '<td>' + airport.code + '</td>';
            result += '<td>' + airport.city + '</td>';
            result += '<td>' + airport.latitude + '</td>';
            result += '<td>' + airport.longitude + '</td>';
            result += '<td>' + airport.kind + '</td>';
            result += '</tr>' + "\n";
        }
        $("#listTable").html(result);
        table = result;
    })
}

// hide/unhide add/edit pane
function showAddEditPane() {

    $('#viewAddEditPane').show();
    $('#saveOrAdd').text('Add');
    $('#delete').prop('disabled', false);


}

function hideShowEditPane() {
    $("#viewAddEditPane").hide(); // hide add/edit pane
}

//FIXME not implemented
//delete by selecting a row
function deleteByCode() {

    let toDelete = confirm('Are you sure?\n to proceed delete press OK\ncancel to resume surfing');
    if (toDelete && selectedId != '') {
        $.ajax({
            url: "/api/airports/" + selectedId,
            type: "DELETE",
            dataType: "json",
            error: function (jqxhr, status, errorThrown) {
                alert("AJAX error: " + jqxhr.responseText);
            }

        }).done(() => {

            //TODO:  add modal to show results of actions

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

function selectItem(code) {
    $('#viewAddEditPane').show();
    selectedCode = code;
    $("#currCode").text(selectedCode);

   /*  findOneByCode(selectedCode); */

}
/*
function findOneByCode(code) {

    $.ajax({
        url: `/api/airports/${code}`, // 
        type: "GET",
        dataType: "json",
        error: function (jqxhr, status, errorThrown) {
            alert("AJAX error: " + jqxhr.responseText);
        }


    }).done((airport) => {

        

        $('#currCode').val(airport.code);
        $('#city').val(airport.city);
        $('#lat').val(airport.latitude);
        $('#lon').val(airport.longitude);
        $('#kind').val(airport.kind);

        $('#saveOrAdd').text('Save');
        
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

 */