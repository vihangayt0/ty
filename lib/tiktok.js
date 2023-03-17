require('../set.js')
const fetch = require('node-fetch')
const baseURI = `${baseURL}`
const apikey = `${freeKEY}`
const apikeyprem = `${premKEY}`
const apikeyvip = `${vipKEY}`

module.exports.ytplay = function ytplay(query) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ytplay?query=' + query +'&apikey=' + apikeyprem)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ytplayaudio = function ytplayaudio(query) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ytplaymp3?query=' + query +'&apikey=' + apikeyprem)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ytplayvideo = function ytplayvideo(query) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ytplaymp4?query=' + query +'&apikey=' + apikeyprem)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ytaudio = function ytaudio(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ytmp3?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ytvideo = function ytvideo(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ytmp4?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ttaudio = function ttaudio(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ttmp3?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ttvideo = function ttvideo(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ttmp4?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.fbdl = function fbdl(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/facebook?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.twdl = function twdl(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/twitter?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.igstory = function igstory(username) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/igstory?username=' + username +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.igreels = function igreels(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/igreels?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.igdl = function igdl(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/igvideo?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.igimg = function igimg(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/igimg?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.snapinsta = function snapinsta(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/snapinsta?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.ssstik = function ssstik(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/ssstik?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.snaptik = function snaptik(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/snaptik?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.sfrom = function sfrom(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/savefrom?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}
	
module.exports.mediafire = function mediafire(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/mediafire?url=' + url +'&apikey=' + apikeyprem)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.zippy = function zippy(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/zippy?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}

module.exports.scloud = function scloud(url) {
	return new Promise((resolve, reject) => {
		fetch(baseURI+'/api/downloader/soundcloud?url=' + url +'&apikey=' + apikey)
		.then(res => res.json())
		.then(resolve)
		.catch(reject)
	})
}
