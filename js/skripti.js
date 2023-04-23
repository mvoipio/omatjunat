var jsonObj;
var uri = "https://rata.digitraffic.fi/api/v1/live-trains/station/TKL?arrived_trains=0&arriving_trains=10&departed_trains=0&departing_trains=0&include_nonstopping=false&train_categories=Commuter";


function loadJSONRaw() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Receive the response as JSON and parse it into a JS variable
            jsonObj = JSON.parse(xmlhttp.responseText);
            // We can now use it as any JS variable
            console.log(jsonObj);
            // Just output the raw data
            document.getElementById("junadata").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}


function loadTrainsWithParse() {

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

           console.log(flatTimes);

           // First I tried an array
/*          let lineIDs = [];
           let lineID = '';
           for (let i=0; i < 10; i++) {
           lineID = (flatTimes[i + '.commuterLineID']);
            lineIDs.push(lineID);
           };

           console.log(lineIDs); */

           // Then realized that I wouldn't need an array
          var out = "<table>";
           let lineID = '';
//           var destination = '';
           for (var i = 0; i < 10; i++) {
           lineID = (flatTimes[i + '.commuterLineID']); // dot notation doesn't work with numbers, have to be brackets
           //IF chain for destinations does not work properly
/*           if (lineID = "K"){
                destination = "Kerava";
            } else if (lineID = "P"){
                destination = "Helsinki";
            } else if (lineID = "I"){
                destination = "Lentoasema";
            } else if (lineID = "Z"){
                destination = "Lahti";
            } else if (lineID = "R"){
                destination = "Riihimäki (Hämeenlinna / Tampere) ";
            } else {
                destination = "Ei tiedossa / Tuntematon";
            }; */
            out += '<tr>';
            out += '<td>' + lineID + '</td>'; // line letter
//            out += '<td>' + destination + '</td>'; // final destination
            out += '</tr>';
        }
        // After all the data has been set, we will output closing tag for the table
        out += "</table>";

 //       console.log(out);
        
        //place table on web page
        document.getElementById("junadata").innerHTML = out;

   }

}    
   xmlhttp.open("GET", uri, true);
   xmlhttp.send();

}