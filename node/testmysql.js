var http = require('http'), 
mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database: "test"
});
http.createServer(function (req, res) {
	// Query the database. 
      connection.query('SELECT * FROM user;', function (error, rows, fields) { 
         res.writeHead(200, {'Content-Type': 'text/plain'});
		 str='';
		 for(i=0;i<rows.length;i++)
			str = str + rows[i].username +'\n';
		 res.end( str);
         // Send data as JSON string. 
         // Rows variable holds the result of the query. 
         //console.log(rows.length + ' ROWS found');
      }); 
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

      
   