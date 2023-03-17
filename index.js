require('./set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/

// Module
const express = require('express'); 
const app = express();
const createError = require('http-errors');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');

cors = require('cors'),
secure = require('ssl-express-www');

// Port
const PORT = require('./port')

// Image title
app.use(favicon(path.join(__dirname,'assets','img','favicon','1.png')))

// Routes
const index = require('./routes/index'),
    main = require('./routes/main')
    api = require('./routes/api')
    game = require('./routes/game')

// App use
app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("assets"))
app.use('/', index)
app.use('/main', main)
app.use('/api', api)
app.use('/game', game)

// App use error 404
app.use(function (req, res, next) {
	next(createError(404))
	})
app.use(function (err, req, res, next) {
	res.sendFile(__path + '/views/error.html')
	})
  
// App listen (port)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:` + PORT)
	console.log(`Hii ${author}`)
	})

module.exports = app