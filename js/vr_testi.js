var jsonObj;
var uri = "https://rata.digitraffic.fi/api/v1/live-trains/station/TKL?arrived_trains=0&arriving_trains=10&departed_trains=0&departing_trains=0&include_nonstopping=false&train_categories=Commuter";


function loadJSONDoc() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Receive the response as JSON and parse it into a JS variable
            jsonObj = JSON.parse(xmlhttp.responseText);
            // We can now use it as any JS variable
            console.log(jsonObj);
            // Just output the raw data
            document.getElementById("rawdata").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}


function loadJSONDocWithParse() {


    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //	document.getElementById("content").innerHTML = xmlhttp.responseText;
            jsonObj = JSON.parse(xmlhttp.responseText);
            console.log(jsonObj);
            // Call for a function which will parse the data to a table
 //           printJSONTable(jsonObj);
        }

    }
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

/* function printJSONTable(jsonObj) {

    // JSON data is stored in data variable
    var data = jsonObj;
    console.log(data.products);
    // Create a loop, which will run through the JSON data array. All the data will be collected to out -variable
    var out = "<table>";

    for (var i = 0; i < data.products.length; i++) {
        // for each loop round, we will create a new table for <tr> -tag and append (+=) the data to existing out -variable
        out += '<tr>';
        // For each cell, we will output data fields from JSON
        out += '<td>' + data.products[i].id + '</td>';
        out += '<td>' + data.products[i].title + '</td>';
        out += '<td>' + data.products[i].description + '</td>';
        out += '<td>' + data.products[i].price + '</td>';
        //out += '<td>' + data[i].picture + '</td>';
        out += '<td><img src="' + data.products[i].thumbnail + '" alt ="...kuvalinkki on rikki"></td>';
        out += '</tr>';
    }
    // After all the data has been set, we will output closing tag for the table
    out += "</table>";

    // Place the newly created table in tabledata-div
    document.getElementById("rawdata").innerHTML = out;
}*/

