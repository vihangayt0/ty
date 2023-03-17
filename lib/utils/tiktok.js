const fetch = require('node-fetch')

function tiktok(url) {
	return new Promise((resolve, reject) => {
		fetch(`https://saipulanuar.ga/api/download/tiktok?url=${url}`)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports = tiktok