$(document).ready(() => {

    refreshAirportsList();//load all records airport from db 
    /* $("#showAddItem").on('click', showAddEditPane);// show add/edit pane
    $("#delete").on('click', deleteById); // delete a todo
    $("#saveOrAdd").on('click', saveOrUpdateRow); // delete a todo
    $("#viewAddEditPane").hide(); // hide add/edit pane */
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
        var thCode = `<th onclick="refreshAirportsList('code')">Airport Code</th>`;
        var thCity = `<th onclick="refreshAirportsList('city')">City</th>`;
        var thlat = `<th onclick="refreshAirportsList('latitude')">Latitude</th>`;
        var thLon = `<th onclick="refreshAirportsList('longitude')">Longitude</th>`;
        var thKind = `<th onclick="refreshAirportsList('kind')">Type</th></tr>`;
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

