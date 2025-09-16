// run the initialize function.
initialize();

//creates the cityPop variable and loads in the city data.
function initialize(){
    var cityPop = [
		//items inside the variable.
        {city: 'Madison', population: 233209},
        {city: 'Milwaukee', population: 594833},
        {city: 'Green Bay', population: 104057},
        {city: 'Superior', population: 27244}
    ];

    //calls the functions created below.
    cities(cityPop);
    addColumns(cityPop);
    addEvents();
}

//creates the table with cities and their populations
function cities(cityPop){
	//creates the table.
    var table = document.createElement("table");
	//creates the top row for the table.
    var headerRow = document.createElement("tr");
    
	//adds titles for the rows City and Population and appends them to the table header.
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>");
    table.appendChild(headerRow);
    
	//add rows and city data to the table.
    for (var i = 0; i < cityPop.length; i++){
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        table.insertAdjacentHTML('beforeend', rowHtml);
    }
    
    //links the table to the HTML.
    document.querySelector("#mydiv").appendChild(table);
}

/*seperately creates the City Size column and fills it with city size data, catigorizing
based on city population size.*/
function addColumns(cityPop){
    document.querySelectorAll("tr").forEach(function(row, i){
        if (i === 0){
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            var citySize;
			//applies 'Small' label to smaller cities.
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
			//applies 'Medim' label to medium-sized cities cities.
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
			//applies 'Large' label to large cities.
            } else {
                citySize = 'Large';
            }
			//inserts label into row.
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
}

/*creates two event listeners, one for changing the table's text color when moused over 
 and one for displaying a message when the table is clicked on.*/
function addEvents(){
	//specifies the first event listener to work when the table is moused over.
    document.querySelector("table").addEventListener("mouseover", function(){
		//selects random colors for the table to change to.
        var color = "rgb(";
        for (var i=0; i<3; i++){
            var random = Math.round(Math.random() * 255);
            color += random;
            if (i<2){
                color += ",";
            } else {
                color += ")";
            }
        }
		//applies the event listener to the table.
        document.querySelector("table").style.color = color;
    });
    
	/*specifies second event listener to work when the table is clicked, then it will
	display the message,'Hey, you clicked me!'.*/ 
    document.querySelector("table").addEventListener("click", function(){
        alert('Hey, you clicked me!');
    });
}

//links the MegaCities.geojson data to the html page.
function debugCallback(myData){
    document.querySelector("#mydiv")
        .insertAdjacentHTML(
            'beforeend',
            //pretty-prints the JSON with 2-space indentation.
            '<pre>' + JSON.stringify(myData, null, 2) + '</pre>'
        );
}

//fetches the GeoJSON file and handles any errors.
function debugAjax(){
    //requests the GeoJSON file from the data folder.
    fetch("/data/MegaCities.geojson")
        .then(response => {
            //checks to see if the http response is successful.
            if (!response.ok) {
                // If not, it throws an error with the http status code.
                throw new Error("HTTP error " + response.status);
            }
            //if it is successful, it parses the response body directly as JSON.
            return response.json();
        })
        //after the JSON is successfully parsed, calls debugCallback to display it.
        .then(data => {
            debugCallback(data);
        })
        //log any errors to the console.
        .catch(error => {
            console.error("Error loading GeoJSON:", error);
        });
}

//calls the function.
debugAjax(); 
