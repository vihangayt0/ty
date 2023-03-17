__path = process.cwd()

/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/

const express = require('express'); 
const server = express();
const createError = require('http-errors');
const port = require('./port')

// Create Error
server.use(function (req, res, next) {
	next(createError(404))
	})
server.use(function (err, req, res, next) {
	res.sendFile(__path + '/views/404.html')
	})
	
// Port
server.listen(port, () => {
    console.log(`Server running on http://localhost:` + port)
	})
	
module.exports = server