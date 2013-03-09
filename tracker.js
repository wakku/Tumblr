// Export the function trackBlog to be used in other files.
// OBS: Other files should evoke require('./tracker.js'); (if in the same dir)
module.exports.trackBlogs = trackBlogs;
module.exports.postBlog = postBlog;

function postBlog(req, res){
	var hostname = req.body.hostname;
	//console.info("POST received: ", hostname);

	trackBlog(hostname, function(s){
		res.send(s);
	});
	
}

function trackBlog(hostname, cb){
	
	var https = require('https');
	var db = require('./dbManager.js');
	
	// Insert the hostname into the URL
	var url = 'https://api.tumblr.com/v2/blog/' + hostname + '/likes?\
api_key=ZtJYLO0HI9tPYsC2pqCy6ciItK3XxWL9KgQErmo2TsknKtNtEp';
	
	// do the GET request
	var get_request = https.get(url, function(res) {
		
		// Callback function to send the statusCode to the POST request
		cb(res.statusCode);
		
		// Create a variable to accumulate data.
		// It is necessary because the data could be to long.
		// Otherwise it could only be possible to receive two posts.
		var data = '';

		res.on('data', function (chunk) {
	
			data += chunk;
		});
	
		// After all data is accumulated
		res.on('end', function () {
			
			// Create the JSON only if the hostname is valid.
			// Parse the data to JSON Object
			var j = JSON.parse(data);
	
			//file.writePosts(j);
			db.saveBlog(hostname, j.response.liked_count, j.response.liked_posts);
			//file.readPosts();
			
		
		});

	});
	// Catch any errors
	get_request.end();
	get_request.on('error', function(e) {
		console.error(e);
	});

}

function trackBlogs(blog_list){
	
	//For each blog
	for(var i=0; i<blog_list.count; i++){
		
		var string = JSON.stringify(blog_list.blog[i]);
		
		// Remove quotation marks
		string = string.replace(/\"/g, "");
		
		trackBlog(string);
		
	}
	
}