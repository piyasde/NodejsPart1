var application_root = __dirname,
    express = require("express"),
	mysql = require('mysql');
    path = require("path");

var app = express();

// Database

var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database: "test"
});
// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});


app.get('/getallusers', function (req, res) {
   connection.connect();
  	
   connection.query('SELECT * FROM user;', function (error, rows, fields) { 
         res.writeHead(200, {'Content-Type': 'text/plain'});
		 str='';
		 for(i=0;i<rows.length;i++)
			str = str + rows[i].username +'\n';
		 res.end( str);
      }); 
      connection.end();   
     
});

app.get('/user/:id', function (req, res){
	connection.connect();
  
	connection.query('SELECT * FROM user where id ='+req.params.id, function (error, rows, fields) { 
         res.writeHead(200, {'Content-Type': 'text/plain'});
		 str='';
		 if(rows.length==0)
		 {
			res.end( 'no such record found...');
			//break;
		 }
		 else
		 {
			str = str + 'User is '+ rows[0].username +'\n';
			res.end( str);
		}
      });
      connection.end();   

});

app.post('/insertuser', function (req, res){
  console.log("POST: ");
  connection.connect();
  username = req.body.user;
  password = req.body.user;
  console.log('insert into user ( username , password ) values (' + "'" + username +"'" +',' + "'"+ password +"'" +');');
  connection.query('insert into user ( username , password ) values (' + "'" + username +"'" +',' + "'"+ password +"'" +');', function (error, rows, fields) { 
		//console.log(error);
         res.writeHead(200, {'Content-Type': 'text/plain'});
		 
			res.end( 'record inerted...');
		      }); 
	connection.end();   
});
// Launch server


app.listen(1212);
