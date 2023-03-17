router.get('/search/youtube', async(req, res, next) => {
	var q = req.query.q
	
	let fetch = require('node-fetch')
	fetch(encodeURI(`https://danzzapi.xyz/api/search/google?query=${q}&apikey=YOUR_APIKEY`))
	.then(response => response.json())
	.then(ress => {
		var result = ress;
		res.json({
			result
			})
		})
	})
})