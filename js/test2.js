var jsonObj;
var uri = "https://rata.digitraffic.fi/api/v1/live-trains/station/TKL?arrived_trains=0&arriving_trains=10&departed_trains=0&departing_trains=0&include_nonstopping=false&train_categories=Commuter";
//var uri="https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false&train_categories=Commuter";

function loadJSONDoc() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Receive the response as JSON and parse it into a JS variable
            jsonObj = JSON.parse(xmlhttp.responseText);
            // We can now use it as any JS variable
            console.log(jsonObj.products);
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
            printJSONTable(jsonObj);
        }

    }
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

function printJSONTable(jsonObj) {

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
}


function loadSelected() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Receive the response as JSON and parse it into a JS variable
            jsonObj = JSON.parse(xmlhttp.responseText);


            // Flattener from http://jsfiddle.net/WSzec/6/
            // originally found at https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-javascript-objects            
            JSON.flatten = function(data) {
                var result = {};
                function recurse (cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                         for(var i=0, l=cur.length; i<l; i++)
                             recurse(cur[i], prop ? prop+"."+i : ""+i);
                        if (l == 0)
                            result[prop] = [];
                    } else {
                        var isEmpty = true;
                        for (var p in cur) {
                            isEmpty = false;
                            recurse(cur[p], prop ? prop+"."+p : p);
                        }
                        if (isEmpty)
                            result[prop] = {};
                    }
                }
                recurse(data, "");
                return result;
            }

            flatTimes = JSON.flatten(jsonObj);

           console.log(flatTime);

 /*          let lineIDs = ''
           for (let i=0; i < 10; i++) {
           lineIDs = (flatTimes[i + '.commuterLineID'])
       };

       console.log(lineIDs);
       myVar = 3;
       console.log(flatTimes[myVar + '.commuterLineID'])*/
   }

       
   xmlhttp.open("GET", uri, true);
   xmlhttp.send();

}
}



