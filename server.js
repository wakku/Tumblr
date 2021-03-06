// Linking to other files
tracker = require('./tracker.js');
db = require('./dbManager.js');
trend = require('./trendManager.js');
express = require('express');

var port = 31010;

// Making a function be executed every hour:
var interval = 3600000; // 1 hour in milliseconds

// Create an express application
var app = express();

// Configuring the app
app.configure(function (req, res) {
	app.use(express.bodyParser());
});

/// Define the REST API:
// Define POST:
app.post('/blog', tracker.postBlog);
// Define GET:
app.get('/blog/:hostname/trends/:order/:limit', trend.trendBlog);
app.get('/blog/:hostname/trends/:order', trend.trendBlog);
app.get('/blogs/trends/:order/:limit', trend.trendAll);
app.get('/blogs/trends/:order', trend.trendAll);

app.listen(port);

var runningFunction = setInterval(everyhourFunction, interval);



db.createDB(function(){
	// Lauch the tracker as soon as the server begin
	everyhourFunction();
});

function everyhourFunction() {
	// Code to be executed:
	
	db.updateAll();
	
}

// [If necessary] Removing the running condition:
//clearInterval(interval);

