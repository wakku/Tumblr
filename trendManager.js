module.exports.trendBlog = trendBlog;
module.exports.trendAll = trendAll;

function trendBlog (req, res){
	var hostname = req.params.hostname;
	
	console.log("Must retrieve the trends for ", hostname);
}

function trendAll (req, res){
	
	console.log("Must retrieve all trends being tracked");
}