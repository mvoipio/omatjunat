# omatjunat

PURPOSE

The aim with this trinket was to give me an easy way of checking the next commuter trains leaving from Tikkurila/Pasila/Helsinki railway stations. An even better version would have e.g. the next mainline commuter trains going from Tikkurila to Helsinki or Pasila/Helsinki to Tikkurila, because that's what I most often need. As far as I know, there's currently no service like that.
The reality is that while the data is open source, the format defeated me. It is JSON, but it is not JSON, or something like that. I can almost make it work... Thus you can currently only get the codes of the next 10 commuter trains leaving Tikkurila and nothing else. It is only sorted by train number, it should be sorted e.g. by destination (e.g. K can be on the way to either Helsinki or Kerava) or by departure time.


FILES

The system consists of the web page, index.html, a script file js/skripti.js and a css file css/junat.css. Web page is plain html, css formats the look, the script fetches the data and inputs it as an html table.


FETCHING THE DATA

All the train operation data is listed at https://www.digitraffic.fi/rautatieliikenne/. I picked mine from the section https://www.digitraffic.fi/rautatieliikenne/#liikennepaikan-saapuvat-ja-l%C3%A4htev%C3%A4t-junat-lukum%C3%A4%C3%A4r%C3%A4rajoitus. The link for next 10 commuter trains leaving Helsinki is there as an example, so I just had to check the station codes at https://rata.digitraffic.fi/api/v1/metadata/stations (entry 468, Tikkurila = TKL) and change the parameters a bit to get https://rata.digitraffic.fi/api/v1/live-trains/station/TKL?arrived_trains=0&arriving_trains=10&departed_trains=0&departing_trains=0&include_nonstopping=false&train_categories=Commuter".


PICKING OUT THE CORRECT INFORMATION

This is the part where I failed. I first thought the problem was the nested tables in general, but after 4-5 days I realized that the problem is probably data format and missing keys/array names.

So, first I tried these:

Picking values out of an array:
https://www.thequantizer.com/javascript-json-get-value-by-key/?utm_content=cmp-true
Couldn't use this because of the JSON format.

Extract value of a property from an array:
https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
Doesn't seem to work because of the JSON format.

Get an Object's Value using a Variable Key in JavaScript:
https://bobbyhadz.com/blog/javascript-get-object-value-by-variable-key
Would work if there was a key...

Then, finally, I found the flattener that flattens the data and numbers the lines.
Flattener:
https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-javascript-objects
Code from http://jsfiddle.net/WSzec/6/ (it's linked ot the above page)

I used the flattener as is, I don't have the skills to adjust it in any way. It took me couple of hours just of figure out how to enter the data into the flattener, but then it worked like charm.
The links to Flattener are included in the script itself.

Because flattener numbers the entries, I can use a loop to to get 0.commuterLineID, 1.commuterLineID etc. out of the flattened JSON. Unfortunately my skills didn't extend to dig things out from deeper in, a combination of multiple looms and if statements would be needed e.g. to find out out when the next K train going to Helsinki is departing from Tikkurila.


TURNING THE SELECTED DATA INTO HTML

 After I figured out how to get the data out, a simple loop was all that I needed for extracting the line letters and inputting them into html, all at one go. Things are made easier by the fact that the list is always 10 entries long - there is no time limit, so even when used in the middle of the night, it will give you the next 10 commuter trains out of Tikkurila.