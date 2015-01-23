var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var blocks = {
	'Fixed': 'Fastendes Securely',
	'Movable': 'Capable to move',
	'Rotating': 'Capable to rotate'
};

app.use(express.static('public'));

app.get('/blocks/:name', function(request, response){
	var description = blocks[request.params.name];
	if (!description) {
		response.status(404).json("No description found for " + request.params.name);
	}else{
		response.json(description);
	}
});

app.listen(3000, function(){
	console.log('Running Express');
});
