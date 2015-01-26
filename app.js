var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
	'Fixed': 'Fastendes Securely',
	'Movable': 'Capable to move',
	'Rotating': 'Capable to rotate'
};

app.use(express.static('public'));

app.param('name', function(request, response, next){
	var blockName = request.params.name;
	request.blockName = blockName[0].toUpperCase() + blockName.slice(1).toLowerCase();

	next();
});

app.get('/blocks', function(request, response){
	response.json(Object.keys(blocks));
});

app.get('/blocks/:name', function(request, response){
	var description = blocks[request.blockName];
	if (!description) {
		response.status(404).json("No description found for " + request.blockName);
	}else{
		response.json(description);
	}
});

app.post('/blocks', parseUrlencoded, function(request, response){
	var newBlock = request.body;
	blocks[newBlock.name] = newBlock.description;

	response.status(201).json(newBlock);
});

app.listen(3000, function(){
	console.log('Running Express');
});
