# Basic RESTful API using Node js and ExpressJs framework

I have followed the course [Building blocks of express js](http://campus.codeschool.com/courses/building-blocks-of-express-js/contents) in Code School

## Server
node app.js, it will run in the port 3000

## Resources
There is just one resource **blocks**

- /blocks

### Create blocks
You can create an user making a POST request to ```/blocks``` with the following parameters

	{
		"name": "Rectangle",
		"description": "Very interesting"
	}

### Get blocks
And get them going to ```/blocks```

### Get a block
Get just one going to ```/blocks/:block_name```

### Delete the block
DELETE ```/blocks/:block_name```

There is a simple web to make all CRUD operations if you go to [http://localhost:3000/](http://localhost:3000/)