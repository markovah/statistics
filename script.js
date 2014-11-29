window.onload = init;

window.setInterval(putToPage, 10000);

function init(){
	getCSV() ;	
}

function getCSV() {
//var csv ;
   $.get('https://dax-rest.comscore.eu/v1/reportitems.csv?itemid=17253&startdate=today&site=supersite&client=mtv3&user=antero&password=pitkanen')
   .done(function(data) {
     // data-muuttujassa olisi nyt haettu data ja se pitäisi iskeä  taulukkoon
        document.getElementById("output").innerHTML = data ;
        putToPage(data) ;
   })
   .fail(function() {
     // API-kysely epäonnistui
       document.getElementById("output").innerHTML = "Error retrieving data" ;
   });
   
}

function putToPage(csv) {
    var rows = csv.split(/\r\n|\n/);
    var table = document.createElement('table');

    for ( var i = 0; i <rows.length; i++ ) {
        var row = document.createElement('tr');
        var tds = rows[i].split('|');
        for ( var j = 1; j < tds.length-1; j++ ) {
           row.appendChild(document.createElement('td'));
		   row.cells[j-1].appendChild(document.createTextNode(tds[j] ));
        }
        table.appendChild(row);
    }
    var output = document.getElementById('output');
    var elements = document.getElementsByTagName('table');
    for (var i = 0; i < elements.length; i++) {
        output.removeChild(elements[i]);
}
    output.appendChild(table);
}