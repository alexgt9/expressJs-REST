var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
	'Fixed': 'Fastendes Securely',
	'Movable': 'Capable to move',
	'Rotating': 'Capable to rotate'
};

router.route('/')
	.get(function(request, response){
		response.json(Object.keys(blocks));
	})
	.post(parseUrlencoded, function(request, response){
		var newBlock = request.body;
		blocks[newBlock.name] = newBlock.description;

		response.status(201).json(newBlock);
	});

router.route('/:name')
	.all(function(request, response, next){
		var blockName = request.params.name;
		request.blockName = blockName[0].toUpperCase() + blockName.slice(1).toLowerCase();

		next();
	})
	.get(function(request, response){
		var description = blocks[request.blockName];
		if (!description) {
			response.status(404).json("No description found for " + request.blockName);
		}else{
			response.json(description);
		}
	})
	.delete(function(request, response){
		if (blocks[request.blockName]) {
			delete blocks[request.blockName];
			response.sendStatus(200);
		}else{
			response.status(404).json("Block not found");
		}
	});

module.exports = router;