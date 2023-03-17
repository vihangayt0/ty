require('../set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/

// Module
const lolkilScraper = require('lolkil-scraper')
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const translate = require('translate-google-api');
const googleIt = require('google-it');
const textto = require('soundoftext-js');
const isUrl = require('is-url');
const TinyUrl = require('tinyurl');
const BitlyClient = require('bitly').BitlyClient

// Lib
const danzz = require("../lib/listapi");
const { fetchJson, getBuffer } = require('../lib/myfunc');

// List API Key
const listkey = ['danzz','9286c1a775','9267ic6a0f1','927j59de9c','921n567ea6','921h5a4282','925n2c494','928b0323c9','927b0k3hp7o2','925b04ib0j','023l1qhbpk','92b1a0h7ts','92a70b789c','9291a7bk0p1','92a7o8pe9c','92y1a7l0a6','9221a7i9h2','921a7k3n94','92a0kk2bc9','921a7l9pho2','92a2n1kb0j','92b0a75k6f','92u1a7pr8s'];
const listkeyprem = ['danzzpremkey'];
const listkeyvip = ['danzzvipkey'];

// Features
// Downloader
router.get('/downloader/ytplay', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.ytplaymp3(query)
	.then(data => {
		if (!data ) return res.json(mess.notquery)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/ytplaymp3', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.ytplaymp3(query)
	.then(data => {
		if (!data ) return res.json(mess.notquery)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/ytplaymp4', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.ytplaymp4(query)
	.then(data => {
		if (!data ) return res.json(mess.notquery)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/ytmp3', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ytmp3(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/ytmp4', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ytmp4(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/facebook', async (req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey
	
	if (!url) return res.json(mess.noturl)  
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

danzz.fbdl(url)
.then(data => {
	if (!data.links) return res.json(mess.noturl)
	res.json({
	status: true,
	author: `${author}`,
	result:	data
	})
	})
	 .catch(e => {
		res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/twitter', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)   
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
danzz.twdl(url)
.then(data => {
	if (!data.thumb ) res.json(mess.noturl)
var result = data
res.json({
status: true,
author: `${author}`,
result
})
})
.catch(e => {
res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/tiktok', async (req, res, next) => {
	var url = req.query.url
		
	if (!url) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if(listkey.includes(apikey)){
	danzz.tiktok(url)
	.then(data => {
		res.json(data.result)
})
.catch((err) =>{
	res.sendFile(__path + '/views/error.html')
})
} else {
	res.sendFile(__path + '/views/notapikey.html')
}
})

/*
router.get('/downloader/ttmp3', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

danzz.ttaud(url)
.then(data => {
	var result = data
	res.json({
	status: true,
	author: `${author}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(mess.noturl)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/ttmp4', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

danzz.ttvid(url)
.then(data => {
	var result = data
	res.json({
	status: true,
	author: `${author}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(mess.noturl)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})
*/

router.get('/downloader/igstory', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)   
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.igstory(username)
	.then(data => {
		if (!data ) return res.sendFile(__path + '/views/error.html')
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {  
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/igreels', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

	danzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {     
			 res.sendFile(__path + '/views/error.html')	
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/instagram', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/igvideo', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.igvideo(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/igimg', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.igimg(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/snapinsta', async (req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey
	
	if (!url) return res.json(mess.noturl)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.snapinsta(url)
.then((data) =>{ 
	if (!data) return res.json(mess.noturl)
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/ssstik', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ssstik(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/snaptik', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.snaptik(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/savefrom', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.saveFrom(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/mediafire', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.mediafiredl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/zippy', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.zippydl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/soundcloud', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.soundcloud(url)
	.then(data => {
		if (!data.download ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/aiovideo', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.aiovideodl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/downloader/xnxx', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.xnxxdl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/downloader/xxxx', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	danzz.xxxxdl(url)
	.then(data => {
		if (!data ) return res.json(mess.noturl)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

// Asupan
router.get('/asupan/random', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkeyprem.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/random?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/asupan/santuy', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/santuy?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/asupan/bocil', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/bocil?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/asupan/ukhty', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/ukhty?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/asupan/hijaber', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/hijaber?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/asupan/gheayubi', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/gheayubi?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/asupan/rikagusriani', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/asupan/rikagusriani?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'video/mp4');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Cecan
router.get('/cecan/random', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkeyprem.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/random?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/cecan/hijaber', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/hijaber?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/china', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkeyprem.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/china?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/cecan/indonesia', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/indonesia?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/japan', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/japan?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/korea', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/korea?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/malaysia', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/malaysia?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/thailand', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/thailand?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/cecan/vietnam', async (req, res, next) => {
var apikey = req.query.apikey
if(!apikey) return res.json(mess.notapikey)
if(listkeyprem.includes(apikey)){
	
var result = {
url: `https://danzz-apiv3.up.railway.app/api/cecan/vietnam?apikey=danzz`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

// Cogan
router.get('/cogan/random', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/cogan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/cogan.png', data)
        res.sendFile(__path+'/tmp/cogan.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Search
router.get('/search/youtube', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ytsearch(query)
	.then(data => {
		if (!data ) return res.json(mess.notquery)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/joox', async(req, res, next) => {
  const query = req.query.query
  const apikey = req.query.apikey
  
  if(!query) return res.json(mess.notquery)
  if(!apikey) return res.json(mess.notapikey)
  
  if(listkey.includes(apikey)){
  danzz.joox(query)
  .then((result) => {
  res.json(result)
    res.json(result)
  });
  } else {
    res.sendFile(__path + '/views/notapikey.html')
  }
});

router.get('/search/xnxxvideo', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
	
	danzz.xnxxsearch(query)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/search/xxxxvideo', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
	
	danzz.xxxxsearch(query)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/search/pornhub', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	lolkilScraper.pornhub.search(query)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/search/ringtone', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if(listkey.includes(apikey)){
	danzz.ringtone(query)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
	res.sendFile(__path + '/views/error.html')
})
} else {
	res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/gcwa', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.gcwa(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/sticker', async (req, res, next) => {
	var query = req.query.query
		
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if(listkey.includes(apikey)){
	danzz.stickersearch(query)
	.then(data => {
		if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
	        author: `${author}`,
			result: data
		})
})
.catch((err) =>{
	res.sendFile(__path + '/views/error.html')
})
} else {
	res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/wikimedia', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
  
	if(!query) return res.json(mess.notquery)
	if(!apikey) return res.json(mess.notapikey)
	
	if(listkey.includes(apikey)){
	danzz.wikimedia(query)
	.then((data) =>{ 
	if (!data[0] ) return res.sendFile(__path + '/views/error.html')
	res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/pinterest', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.pinterest(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/shopee', async (req, res, next) => {
       	var query = req.query.query
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(mess.notquery)
       	if (!apikey) return res.json(mess.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/shopee?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	author: `${author}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/gplaystore', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.playstore(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/appstore', async (req, res, next) => {
       	var query = req.query.query
       	var num = req.query.num
       	var page = req.query.page
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(mess.notquery)
       	if (!num) return res.json(mess.notnum)
       	if (!page) return res.json(mess.notpage)
       	if (!apikey) return res.json(mess.notapikey)           
           if(listkey.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/appstore?query=${query}&num=${num}&page=${page}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	author: `${author}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/happymod', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
danzz.happymod(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/search/sfile', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.sfile(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/apkmody', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.apkmody(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/moddroid', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.moddroid(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/gsmarena', async (req, res, next) => {
       	var query = req.query.query
       	var apikey = req.query.apikey
       
       	if (!query) return res.json(mess.notquery)
       	if (!apikey) return res.json(mess.notapikey)           
           if(listkeyprem.includes(apikey)){
           	
         fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/search/gsmarena?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	author: `${author}`,
                 result: result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/search/wallpaper', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.wallpaper(query)
.then((data) =>{ 
	if (!data[0]) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/google', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
googleIt({'query': query}).then(results => {
		if (!results[0]) return res.sendFile(__path + '/views/error.html')
			res.json({
				status: true,
				author: `${author}`,
				result: results
			})

	}).catch(e => {	
		res.sendFile(__path + '/views/error.html')
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/search/googleimage', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
var gis = require('g-i-s')
gis(query, logResults)

function logResults(error, results) {
  if (error) {
	res.sendFile(__path + '/views/error.html')
  }
  else {
	if (!results[0]) return res.sendFile(__path + '/views/error.html')
	res.json({
		status: true,
		author: `${author}`,
		result:  results
	})
   
  }
}
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Film
router.get('/film/search', async (req, res, next) => {           
       	var query = req.query.query
       	var apikey = req.query.apikey
       	
       	if (!query) return res.json(mess.notquery)
       	if (!apikey) return res.json(mess.notapikey)           
           if(listkeyprem.includes(apikey)){
           	
         fetch(encodeURI(`https://lk21-api-zahirr.herokuapp.com/search?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	author: `${author}`,
                 result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/film/play', async (req, res, next) => {
           var query = req.query.query
       	var apikey = req.query.apikey
       	
       	if (!query) return res.json(mess.notquery)
       	if (!apikey) return res.json(mess.notapikey)           
           if(listkeyprem.includes(apikey)){
           	
         fetch(encodeURI(`https://filmapik-api-zahirr.herokuapp.com/play?id=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	status: true,
             	author: `${author}`,
                 result
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

// Text Pro
router.get('/textpro/pencil', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/glitch', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/blackpink', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/berry', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/neon', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})



router.get('/textpro/logobear', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/3dchristmas', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext) 
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/thunder', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/3dboxtext', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/textpro/glitch2', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)   
	if (!text2) return res.json(mess.nottext2) 
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/glitchtiktok', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)
	if (!text2) return res.json(mess.nottext2)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)
	if (!text2) return res.json(mess.nottext2)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)
	if (!text2) return res.json(mess.nottext2)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)
	if (!text2) return res.json(mess.nottext2)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/green-horror', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/magma', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/3d-neon-light', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/3d-orange-juice', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/textpro/strawberry', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Photo Oxy
router.get('/photooxy/flaming', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/shadow-sky', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/metallic', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/naruto', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/pubg', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	var apikey = req.query.apikey
	
	if (!text1) return res.json(mess.nottext1)
	if (!text2) return res.json(mess.nottext2)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/under-grass', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/harry-potter', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/flower-typography', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/picture-of-love', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/coffee-cup', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/butterfly', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/night-sky', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/carved-wood', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/photooxy/illuminated-metallic', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/photooxy/sweet-candy', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Canvas
router.get('/canvas/welcome', async (req, res, next) => {
var apikey = req.query.apikey
var name = req.query.name
var gcname = req.query.gcname
var member = req.query.member
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!member) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/welcome1?name=${name}&gpname=${gcname}&member=${member}&pp=${pp}&bg=${bg}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/welcome2', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, author : `${author}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-yogipw.herokuapp.com/api/welcome?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/welcome3', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var gcicon = req.query.gcicon
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, author : `${author}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if (!gcicon) return res.json({ status : false, author : `${author}`, message : "Enter Group Icon Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-yogipw.herokuapp.com/api/welcome2?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}&gcicon=${gcicon}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/goodbye', async (req, res, next) => {
var apikey = req.query.apikey
var name = req.query.name
var gcname = req.query.gcname
var member = req.query.member
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!member) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/goodbye1?name=${name}&gpname=${gcname}&member=${member}&pp=${pp}&bg=${bg}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/goodbye2', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, author : `${author}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-yogipw.herokuapp.com/api/goodbye?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/goodbye3', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var gcname = req.query.gcname
var picurl = req.query.picurl
var bgurl = req.query.bgurl
var gcicon = req.query.gcicon
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, author : `${author}`, message : "Enter Group Name"})
if (!picurl) return res.json({ status : false, author : `${author}`, message : "Enter Pic Url"})
if (!bgurl) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})
if (!gcicon) return res.json({ status : false, author : `${author}`, message : "Enter Group Icon Url"})
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-yogipw.herokuapp.com/api/goodbye2?name=${name}&mem=${mem}&gcname=${gcname}&picurl=${picurl}&bgurl=${bgurl}&gcicon=${gcicon}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/verify', async (req, res, next) => {

var name = req.query.name
var mem = req.query.mem
var sn = req.query.sn
var pp = req.query.pp
var bg = req.query.bg
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!mem) return res.json({ status : false, author : `${author}`, message : "Enter Members Amount"})
if (!sn) return res.json({ status : false, author : `${author}`, message : "Enter Seri"})
if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})

if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://hadi-api.herokuapp.com/api/card/verify?nama=${name}&member=${mem}&seri=${sn}&pp=${pp}&bg=${bg}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/verify2', async (req, res, next) => {

var name = req.query.name
var name2 = req.query.name2
var nameverify = req.query.nameverify
var pp = req.query.pp
var pp2 = req.query.pp2
var bg = req.query.bg
var apikey = req.query.apikey

if (!name) return res.json({ status : false, author : `${author}`, message : "Enter Name"})
if (!name2) return res.json({ status : false, author : `${author}`, message : "Enter Name2"})
if (!nameverify) return res.json({ status : false, author : `${author}`, message : "Enter Verify Name"})
if (!pp) return res.json({ status : false, author : `${author}`, message : "Enter Pp Url"})
if (!pp2) return res.json({ status : false, author : `${author}`, message : "Enter Pp2 Url"})
if (!bg) return res.json({ status : false, author : `${author}`, message : "Enter Background Url"})

if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://hadi-api.herokuapp.com/api/card/verify2?name=${name}&memverify=${nameverify}&gcname=${name2}&gcicon=${pp}&pp=${pp2}&bg=${bg}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/sadcat', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(mess.nottext) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/sadcat?text=${text}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/facts', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(mess.nottext) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/facts?text=${text}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/pikachu', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(mess.nottext) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/pikachu?text=${text}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/biden', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(mess.nottext) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/biden?text=${text}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/canvas/oogway', async (req, res, next) => {
var text = req.query.text
var apikey = req.query.apikey

if (!text) return res.json(mess.nottext) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/oogway?text=${text}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Maker
router.get('/maker/gun', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/gun?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/darkness', async (req, res, next) => {
var url = req.query.url
var no = req.query.no
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if (!no) return res.json({ message: 'Enter patameter no' })
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/darkness?url=${url}&no=${no}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/greyscale', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/greyscale?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/ad', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/ad?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/blur', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/blur?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/facepalm', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/facepalm?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/pixelate', async (req, res, next) => {
var url = req.query.url
var no = req.query.no
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if (!no) return res.json({ message: 'Enter parameter no' })
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/pixelate?url=${url}&no=${no}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/rainbow', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/rainbow?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/uncover', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://myselfff.herokuapp.com/docs/canvas/uncover?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/invert', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl) 
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/invert?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/circle', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/circle?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/beautiful', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/beautiful?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/wanted', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/wanted?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/trigger', async (req, res, next) => {
var url = req.query.url
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/trigger?url=${url}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/resize', async (req, res, next) => {
var url = req.query.url
var width = req.query.width
var height = req.query.height
var apikey = req.query.apikey

if (!url) return res.json(mess.noturl)
if (!width) return res.json({ message: 'Enter Width' })
if (!height) return res.json({ message: 'Enter Height' })
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/resize?url=${url}&width=${width}&height=${height}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/emojimix', async (req, res, next) => {
var emoji = req.query.emoji
var emoji2 = req.query.emoji2
var apikey = req.query.apikey

if (!emoji) return res.json(mess.notmoji1)
if (!emoji2) return res.json(mess.notmoji2)
if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
var result = {
url: `https://api-danzzgz.up.railway.app/api/maker/emojimix?emoji1=${emoji}&emoji2=${emoji2}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/maker/ttp', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(mess.nottext)
  if(!apikey) return res.json(mess.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://api-danzzgz.up.railway.app/api/maker/ttp?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/ttp.png', data)
  res.sendFile(__path +'/tmp/ttp.png')
  } else {
    res.sendFile(__path + '/views/notapikey.html')
  }
})

router.get('/maker/attp', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(mess.nottext)
  if(!apikey) return res.json(mess.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://api-danzzgz.up.railway.app/api/maker/attp?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/attp.gif', data)
  res.sendFile(__path +'/tmp/attp.gif')
  } else {
    res.sendFile(__path + '/views/notapikey.html')
  }
})

router.get('/maker/nulis', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(mess.nottext)
  if(!apikey) return res.json(mess.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://xteam.xyz/magernulis?nama=%20&kelas=%20&text=${text}&APIKEY=af294af2d7b1fcd0`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/nulis.png', data)
  res.sendFile(__path +'/tmp/nulis.png')
  } else {
    res.sendFile(__path + '/views/notapikey.html')
  }
});

router.get('/maker/nulis2', async(req, res, next) => {
  const text = req.query.text
  const apikey = req.query.apikey
  
  if(!text) return res.json(mess.nottext)
  if(!apikey) return res.json(mess.notapikey)
  
  if(listkey.includes(apikey)) {
  let result = `https://hadi-api.herokuapp.com/api/canvas/nulis?text=${text}`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/nulis2.png', data)
  res.sendFile(__path +'/tmp/nulis2.png')
  } else {
    res.sendFile(__path + '/views/notapikey.html')
  }
});

// Wallpaper
router.get('/wallpaper/random', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallrandom`)
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/wallpaper/ml', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallml`)
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/wallpaper/pubg', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallpubg`)
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/wallpaper/neon', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallneon`)
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/wallpaper/code', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/wallpaper/wallcode`)
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Fun
router.get('/fun/rate', async (req, res, next) => {
	var text = req.query.text
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	if(!text) return res.json({ status : false, author : `${author}`, message : "Enter Parameter Text"})
	
	let data = ['1%','2%','3%','4%','5%','10%','15%','20%','30%','40%','50%','60%','70%','80%','90%','100%'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/siapakahaku', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/siapakahaku.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/siapakahdia', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['orang','manusia','robot','tanya mak lu','gatau','setannn'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/kapankah', async (req, res, next) => {
	var text = req.query.text
    var apikey = req.query.apikey
	
	if (!text) return res.json({ msg_err: 'Enter parameter text' })
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['mungkin besok','mungkin tahun depan','mungkin 1 menit lagi','tanya mak lu','mungkin 99 tahun','minggu depan','2 minggu lagi','gatau'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/dimanakah', async (req, res, next) => {
	var text = req.query.text
    var apikey = req.query.apikey
	
	if (!text) return res.json({ msg_err: 'Enter parameter text' })
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['di hutan','di atas genting','di sawah','tanya mak lu','di hati mu, eakkkk.','di depan rumah lu','di kasur','di oyo','gatau'];
	var result = data[Math.floor(Math.random() * data.length)];
	  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekgay', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['100% lari ada orang gay...','90% awas bro dia gay.','10% masih aman lah.','tanya mak lu','99999% anjir ngeri tingkat dewa, (lari... karena gay:v)','70% tobat bro...'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/ceklesby', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['100% lari ada orang lesby...','90% awas bro dia lesby.','10% masih aman lah.','tanya mak lu','99999% anjir ngeri tingkat dewa, (lari... karena lesby:v)','70% tobat bro...'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekganteng', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['5%','10%','15%','20%','30%','40%','50%','60%','70%','80%','90%','100%'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekcantik', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['5%','10%','15%','20%','30%','40%','50%','60%','70%','80%','90%','100%'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekmasadepan', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['masa depan lu sukses dan masa depan pembuat restAPI juga sukses (aminin bro)','100% masa depan lo suram..','90%','10% cerah, masih aman lah.','tanya mak lu','99999% suram, anjir ngeri moga aja kaga.','70% suram, mending lu tobat bro'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekpositifcovid', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['100% awas bro jaga jarak 10m..','90% jan deket-deket!!!','10% masih aman lah.','tanya mak lu','99999 anjir ngeri postif tingkat dewa!!!.','70% mending lu pulang bro'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekkaya', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['100% wow anda benar² kaya (kaya monyet)..','90% gif alok bang...','10% semangat bro.','tanya mak lu','99999 anjir boleh lah trakteer makan.','70% gg'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/cekmiskin', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = ['100% sabar bro..','90% tetap tabah bro...','10% semangat bro.','tanya mak lu','99999 anjir kasian bat lu bro.','70% semangat'];
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/asahotak', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/asahotak.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/caklontong', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/caklontong.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/truth', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/truth.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/dare', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/dare.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/darkjoke', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/darkjoke.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/family100', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/family100.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	data: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/pantun', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/pantun.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebakgabut', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebakgabut.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebaklucu', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebaklucu.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebakgambar', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.tebakgambar()
.then((data) =>{ 
		  
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/susunkata', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/susunkata.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebakbendera', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebakbendera.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})


router.get('/fun/tebakgame', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebakgame.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebakkata', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
		
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebakkata.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebaklirik', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebaklirik.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebaklagu', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebaklagu.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
		  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/fun/tebakkimia', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let tebak = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/tebakkimia.json')
	let tebak2 = tebak[Math.floor(Math.random() * tebak.length)]
	  
  res.json({
	status: true,
	author: `${author}`,
	result: tebak2
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Simi
router.get('/simi/simi', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
        var lang = req.query.lang
   
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(mess.nottext)
        if(!lang) return res.json({ message: 'Enter Lang' })

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=${lang}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/simi/simi-en', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(mess.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=en`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/simi/simi-jp', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(mess.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=jp`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/simi/simi-id', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(mess.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=id`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/simi/simi-ar', async (req, res, next) => {
        var apikey = req.query.apikey
        var text = req.query.text
   
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){
        if(!text) return res.json(mess.nottext)

       fetch(encodeURI(`https://simsumi.herokuapp.com/api?text=${text}&lang=ar`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

// Anime
router.get('/anime/search', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.anime(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/manga', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.manga(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/wibu', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.wibu(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/fandom', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.fandom(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/character', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.character(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/topanime', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.topAnime()
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/topmanga', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.topManga()
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/otakudesusearch', async (req, res, next) => {
	var query = req.query.query
	var apikey = req.query.apikey
	
	if (!query) return res.json(mess.notquery)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.otakudesu(query)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/otakudesudetail', async (req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey
	
	if (!url) return res.json(mess.noturl)
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.otakudesuDetail(url)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/anime/otakudesudownload', async (req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey
	
	if (!url) return res.json(mess.noturl)   
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
danzz.otakudesuDownload(url)
.then((data) =>{
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Sfw
router.get('/sfw/waifu', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/waifu.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/sfw/husbu', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/husbu.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/sfw/loli', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/loli.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/sfw/milf', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/milf.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/sfw/neko', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/neko.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/sfw/shota', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkey.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/sfw/shota.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/sfw.png', data)
        res.sendFile(__path+'/tmp/sfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Nsfw
router.get('/nsfw/hentai', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/hentai.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/glasses', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/glasses.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/neko', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/neko.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/orgy', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/orgy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/panties', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/panties.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/foot', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/foot.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/cuckold', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/cuckold.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/pussy', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/pussy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/yuri', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/yuri.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/jahy', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/jahy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/ahegao', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/ahegao.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/bdsm', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/bdsm.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/blowjob', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/blowjob.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/gangbang', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/gangbang.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/cum', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/cum.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/ero', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/ero.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/femdom', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/femdom.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/manga', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/manga.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/masturbation', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/masturbation.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/ass', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/ass.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/eba', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/eba.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/thighs', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/thighs.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/nsfw/zettai', async (req, res, next) => {
        var apikey = req.query.apikey
        
		if (!apikey) return res.json(mess.notapikey)
        if(listkeyprem.includes(apikey)){
        
        fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/zettai.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/nsfw.png', data)
        res.sendFile(__path+'/tmp/nsfw.png')
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

// Random
router.get('/random/meme', async (req, res, next) => {
var apikey = req.query.apikey

if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/random/meme`)
	var imgnya = `${data.result.url}`
var result = {
url: `${imgnya}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/random/katakasar', async (req, res, next) => {
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/fun/katakasar.json')
	var result = data[Math.floor(Math.random() * data.length)];
		  
  res.json({
	status: true,
	author: `${author}`,
	result: result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/random/quotes', async (req, res, next) => {
        var apikey = req.query.apikey
            
		if(!apikey) return res.json(mess.notapikey)
		if(listkey.includes(apikey)){

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/quotes`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                 author : `${author}`,
                 result
             })
         })
         .catch(e => {
         	res.sendFile(__path + '/views/error.html')
})
} else {
res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/random/dadu', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(mess.notapikey)
	
	let dadu = await fetchJson('https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/random_image/dadu.json')
	let random = dadu[Math.floor(Math.random() * dadu.length)]
	var result = await getBuffer(random.result)
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/random/coffee', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(mess.notapikey)
	
	var result = await getBuffer('https://coffee.alexflipnote.dev/random')
	res.set({'Content-Type': 'image/png'})
	res.send(result)
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Other
router.get('/other/qrcode', (req, res) => {
 var apikey = req.query.apikey
 var qr = require('qr-image')
 var url = req.query.url
 if (!apikey) return res.json(mess.notapikey)
 if(listkey.includes(apikey)){
 if(!url) return res.json(mess.noturl)
 var img = qr.image(url,{size :13});
 res.writeHead(200, {'Content-Type': 'image/png'});
 img.pipe(res);
}
else {
  res.sendFile(__path + '/views/notapikey.html')
}
});
router.get('/other/couplepp', async (req, res, next) => {
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if (!apikey) return res.json(mess.notapikey)
	
	let resultt = await fetchJson('https://raw.githubusercontent.com/Ramdaniofficial/result-rest-api/main/kopel.json')
	let random = resultt[Math.floor(Math.random() * resultt.length)]

	res.json({
	status: true,
	author: `${author}`,
		result: {
			male: random.male,
			female: random.female
		}
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})
router.get('/other/balikhuruf', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/balikhuruf?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/balikangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/balikangka?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/bilangangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/bilangangka?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/besarkecil', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/besarkecil?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/heleh', async(req, res) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	var text = req.query.text
	if(!text) return res.json(mess.nottext)
	const lower = /[aeueo]/g
	const upper = /[AEUEO]/g
	const result = text.replace(lower, 'e').replace(upper, 'E')
	res.json({
	status: true,
	author: `${author}`,
	result: result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/huluh', async(req, res) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	var text = req.query.text
	if(!text) return res.json(mess.nottext)
	const lower = /[auieo]/g
	const upper = /[AUIEO]/g
	const result = text.replace(lower, 'u').replace(upper, 'U')
	res.json({
	status: true,
	author: `${author}`,
	result: result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/hilih', async(req, res) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	var text = req.query.text
	if(!text) return res.json(mess.nottext)
	const lower = /[aiueo]/g
	const upper = /[AIUEO]/g
	const result = text.replace(lower, 'i').replace(upper, 'I')
	res.json({
	status: true,
	author: `${author}`,
	result: result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/halah', async(req, res) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	var text = req.query.text
	if(!text) return res.json(mess.nottext)
	const lower = /[iaueo]/g
	const upper = /[IAUEO]/g
	const result = text.replace(lower, 'a').replace(upper, 'A')
	res.json({
	status: true,
	author: `${author}`,
	result: result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/kapital', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/kapital?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/katajago', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/katajago?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/resepmasakan', async (req, res, next) => {
	var menu = req.query.menu
	if (!menu ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.resep(menu)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/jumblahhuruf', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/jumlahhuruf?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/jumblahangka', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/jumlahangka?query=${text}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/other/detailhero', async (req, res, next) => {
	var hero = req.query.hero
	if(!hero) return res.json(mess.nottext)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/heroml?query=${hero}`)
	if(!data.data) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if(!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.data
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Stalk
router.get('/stalker/github', async (req, res, next) => {
	var username = req.query.username
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!username) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let ghstalk = await fetchJson(`https://api.github.com/users/${username}`)
	if (!ghstalk.login) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: ghstalk
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/githubrepo', async (req, res, next) => {
	var repo = req.query.repo
	if (!repo ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	lolkilScraper.search.github_repo(repo)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/tiktok', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ttstalk(username)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/instagram', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.igstalk(username)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/twitter', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.twstalk(username)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/tg', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.tgstalk(username)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/npm', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.npmstalk(username)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickhago', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let hg = await fetchJson(`https://zenzapis.xyz/stalker/nickhago?apikey=sonelstore&query=${id}`)
	if (!hg.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: hg.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickccfun', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let cf = await fetchJson(`https://zenzapis.xyz/stalker/nickcocofun?apikey=sonelstore&query=${id}`)
	if (!cf.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: cf.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickbgl', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let bgl = await fetchJson(`https://zenzapis.xyz/stalker/nickbigolive?apikey=sonelstore&query=${id}`)
	if (!bgl.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: bgl.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nicknmtv', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let nmtv = await fetchJson(`https://zenzapis.xyz/stalker/nicknimotv?apikey=soneletore&query=${id}`)
	if (!nmtv.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: nmtv.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickpubg', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let pubg = await fetchJson(`https://zenzapis.xyz/stalker/nickpubg?apikey=sonelstore&query=${id}`)
	if (!pubg.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: pubg.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickff', async (req, res, next) => {
	var id = req.query.id
	if (!id ) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.ffstalk(id)
	.then(data => {
		if (!data ) return res.json(mess.notid)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickml', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	if (!id ) return res.json(mess.notid)
	if (!zoneid) return res.json(mess.notid)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.mlstalk(id, zoneid)
	.then(data => {
		if (!data ) return res.json(mess.notid)
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickmla', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!zoneid) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let mla = await fetchJson(`https://zenzapis.xyz/stalker/nickmladventure?apikey=sonelstore&query=${id}&query2=${zoneid}`)
	if (!mla.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: mla.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nicklokapala', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let lp = await fetchJson(`https://zenzapis.xyz/stalker/nicklokapala?apikey=sonelstore&query=${id}`)
	if (!lp.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: lp.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickdomino', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let dm = await fetchJson(`https://zenzapis.xyz/stalker/nickdomino?apikey=sonelstore&query=${id}`)
	if (!dm.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: dm.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickzepeto', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let jp = await fetchJson(`https://zenzapis.xyz/stalker/nickzepeto?apikey=sonelstore&query=${id}`)
	if (!jp.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: jp.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nicksausage', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let sg = await fetchJson(`https://zenzapis.xyz/stalker/nicksausage?apikey=sonelstore&query=${id}`)
	if (!sg.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: sg.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickaov', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let aov = await fetchJson(`https://zenzapis.xyz/stalker/nickaov?apikey=sonelstore&query=${id}`)
	if (!aov.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: aov.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickcod', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let cod = await fetchJson(`https://zenzapis.xyz/stalker/nickcod?apikey=sonelstore&query=${id}`)
	if (!cod.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: cod.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/stalker/nickpb', async (req, res, next) => {
	var id = req.query.id
	var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	
	if (!id) return res.json(mess.notid)
	if (!apikey) return res.json(mess.notapikey)
	
	let pb = await fetchJson(`https://zenzapis.xyz/stalker/nickpb?apikey=sonelstore&query=${id}`)
	if (!pb.result) return res.sendFile(__path + '/views/error.html')

	res.json({
	status: true,
	author: `${author}`,
	result: pb.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Short Link
router.get('/shortlink/tinyualias', async (req, res, next) => {
	var url = req.query.url
	var alias = req.query.alias
	if (!url ) return res.json(mess.noturl)  
	if (!alias ) return res.json({ status : false, author : `${author}`, message : "Enter Alias"})  

    var islink = isUrl(url)
	if (!islink ) return res.json(mess.noturl)  
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	const { shortText } = require("limit-text-js")
	const data = { 'url': url, 'alias': shortText(alias, 30) }

	TinyUrl.shortenWithAlias(data).then(function(url)  {	
		if (url == "Error") return res.json(mess.ready)

	res.json({
		status: true,
		author: `${author}`,
		result: url
		})
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/shortlink/tinyurl', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl)  

    var islink = isUrl(url)
	if (!islink ) return res.json(mess.noturl)  

	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

TinyUrl.shorten(url, function(url, err) {
  if (err) return res.sendFile(__path + '/views/error.html')
	res.json({
		status: true,
		author: `${author}`,
		result: url
		})
});
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/shortlink/cuttly', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl) 
	
    var islink = isUrl(url)
	if (!islink ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

	let randomapicuttly = apicuttly[Math.floor(Math.random() * apicuttly.length)]
	var hasil = await fetchJson(`https://cutt.ly/api/api.php?key=${randomapicuttly}&short=${url}`)
  if (!hasil.url.shortLink ) return res.sendFile(__path + '/views/error.html')

	res.json({
		status: true,
		author: `${author}`,
		result: hasil.url.shortLink
		})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
});

router.get('/shortlink/bitly', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(mess.noturl) 
	
    var islink = isUrl(url)
	if (!islink ) return res.json(mess.noturl)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){

	let randomapibitly = apibitly[Math.floor(Math.random() * apibitly.length)]
	const bitly = new BitlyClient(randomapibitly)
	bitly
	.shorten(url)
	.then(function(result) {
		res.json({
			status: true,
			author: `${author}`,
			result : result.link
			})
	 
	})
	.catch(function(error) {
	 res.sendFile(__path + '/views/error.html')
	});
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Islamic
router.get('/islamic/randomimage', async (req, res, next) => {
var apikey = req.query.apikey

if(!apikey) return res.json(mess.notapikey)
if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/islamic/random_img.json`)
	var imgnya = data[Math.floor(Math.random() * data.length)];
var result = {
url: `${imgnya}`, method: 'GET', encoding: null };
request(result, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/jadwalsholat', async (req, res, next) => {
	var no = req.query.no
	var apikey = req.query.apikey
	
	if (!no) return res.json({message: 'Enter Parameter No'})
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.sholat(no)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/kisahnabi', async (req, res, next) => {
	var apikey = req.query.apikey
	var name = req.query.name
	
	if (!name) return res.json({ msg_err: 'Enter name nabi' })
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/islamic/kisah_nabi/${name}.json`)
	res.json({
	status: true,
	author: `${author}`,
	result: data
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/asmaulhusna', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/islamic/asmaul_husna.json`)
	res.json({
	status: true,
	author: `${author}`,
	result: data
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/hadist', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/islamic/hadist`)
	if (!data.list ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.list
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/quran', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/islamic/quran.json`)
	res.json({
	status: true,
	author: `${author}`,
	result: data
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/surah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.surah(text)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/islamic/tafsirsurah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(mess.nottext)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.tafsirsurah(text)
.then((data) =>{ 
	if (!data[0] ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Trending
router.get('/trending/bekasi', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/bekasi`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/depok', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/depok`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/pekanbaru', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/pekanbaru`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/surabaya', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/surabaya`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/makassar', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/makassar`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/bandung', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/bandung`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/jakarta', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/jakarta`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/medan', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/medan`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/palembang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/palembang`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/semarang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/semarang`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/trending/tangerang', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/trending/tangerang`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// News
router.get('/news/cnn', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.cnn()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/news/tribun', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.tribunnews()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/news/kompas', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.kompasnews()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/news/inews', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/berita`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/news/okezone', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/okezone`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/news/antara', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/news/antara`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Information
router.get('/information/gempa', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.gempa()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/covid', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.covid()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/covidworld', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://api-yogipw.herokuapp.com/api/info/covidworld`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/postalcode', async (req, res, next) => {
	var city = req.query.city
	if (!city ) return res.json({ status : false, author : `${author}`, message : "Enter City"})  
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	lolkilScraper.search.kodepos(city)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/hoax', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.hoax()
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/jadwalbola', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jadwalbola`)
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/clock', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jam`)
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/worldclock', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/information/jamdunia`)
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/kbbi', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.kbbi(query)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        author: `${author}`,
			result
		})
		})
         .catch(e => {
         
			 res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/information/wikipedia', async (req, res, next) => {
	var query = req.query.query
	if (!query ) return res.json(mess.notquery)
	
	let data = await fetchJson(`https://myselfff.herokuapp.com/docs/random/wikipedia?query=${query}`)
	if (!data.result ) return res.sendFile(__path + '/views/error.html')
	
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	res.json({
	status: true,
	author: `${author}`,
	result: data.result
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Primbon
router.get('/primbon/artinama', async (req, res, next) => {
	var apikey = req.query.apikey
	var name = req.query.name
	if (!name) return res.json({msg_error: 'Enter Parameter Name'})
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.artinama(name)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/primbon/ramalanjodoh', async (req, res, next) => {
	var apikey = req.query.apikey
	var name1 = req.query.name1
	var name2 = req.query.name2
	if (!name1) return res.json({msg_error: 'Enter Parameter Name 1'})
	if (!name1) return res.json({msg_error: 'Enter Parameter Name 2'})
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.ramalanJodoh(name1, name2)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/primbon/ramalanjadian', async (req, res, next) => {
	var apikey = req.query.apikey
	var date = req.query.date
	var month = req.query.month
	var year = req.query.year
	
	if (!date) return res.json({msg_error: 'Enter Parameter Date'})
	if (!month) return res.json({msg_error: 'Enter Parameter Month'})
	if (!month) return res.json({msg_error: 'Enter Parameter Year'})
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
		
	danzz.ramalanJodoh(date, month, year)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
		res.json({
			status: true,
			author: `${author}`,
			result: data
		})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/primbon/tafsirmimpi', async (req, res, next) => {
    var dream = req.query.dream
    var apikey = req.query.apikey
	
	if(listkey.includes(apikey)){
	if(!dream) return res.json({ status : false, author : `${author}`, message : "Enter Dream"})
	if(!apikey) return res.json(mess.notapikey)
	
	let data = await fetchJson(`http://kocakz.herokuapp.com/api/primbon/tafsirmimpi?mimpi=${dream}`)
	
  res.json({
	status: true,
	author: `${author}`,
	result: data.result
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

// Tools
router.get('/tools/ebase64', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(mess.nottext)
	if (text.length > 2084) return res.json({ status : false, author : `${author}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
		
		res.json({
			status: true,
			author: `${author}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/tools/dbase64', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(mess.nottext)  
	if (text.length > 2084) return res.json({ status : false, author : `${author}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
		
		res.json({
			status: true,
			author: `${author}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/tools/ebase32', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(mess.nottext)
	if (text.length > 2084) return res.json({ status : false, author : `${author}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
		
		res.json({
			status: true,
			author: `${author}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/tools/dbase32', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(mess.nottext)  
	if (text.length > 2084) return res.json({ status : false, author : `${author}`, message : "Maximal 2.084 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyvip.includes(apikey)){
		
		res.json({
			status: true,
			author: `${author}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyvip.html')
}
})

router.get('/tools/ebinary', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json({ status : false, author : `${author}`, message : "[!] masukan parameter text"})  
	if (text.length > 2048) return res.json({ status : false, author : `${author}`, message : "[!] Maximal 2.048 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
		
	function encodeBinary(char) {
		return char.split("").map(str => {
			 const converted = str.charCodeAt(0).toString(2);
			 return converted.padStart(8, "0");
		}).join(" ")
	 }

		res.json({
			status: true,
			author: `${author}`,
			result:{
				string: string,
				encode: encodeBinary(text)
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/tools/dbinary', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	var string = req.query.text
	
	if (!text ) return res.json(mess.nottext)  
	if (text.length > 2084) return res.json({ status : false, author : `${author}`, message : "[!] Maximal 2.084 String!"})
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
		
	function dcodeBinary(char) {
		return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
	 }

		res.json({
			status: true,
			author: `${author}`,
			result:{
				string: string,
				decode: dcodeBinary(text)
				}
		})
}
else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/tools/styletext', async (req, res, next) => {
	var text = req.query.text
	var apikey = req.query.apikey
	
	if (!text ) return res.json(mess.nottext)
	if (!apikey) return res.json(mess.notapikey)
	if(listkeyprem.includes(apikey)){
	
	const { shortText } = require("limit-text-js")
	var text = shortText(text, 10000)
	danzz.styletext(text)
.then((data) =>{ 
	if (!data ) return res.sendFile(__path + '/views/error.html')
  res.json({
	status: true,
	author: `${author}`,
	result: data
})
})
.catch((err) =>{
 res.sendFile(__path + '/views/error.html')

})
} else {
  res.sendFile(__path + '/views/notapikeyprem.html')
}
})

router.get('/tools/tts', async (req, res, next) => {
	var apikey = req.query.apikey
	var text1 = req.query.text
	var lang1 = req.query.lang
	if (!text1 ) return res.json(mess.nottext)   
	if (!lang1 ) return res.json({ status : false, author : `${author}`, message : "Please Enter Lang. View Lang In https://soundoftext.com/docs"})
    
	if(listkey.includes(apikey)){
textto.sounds.create({ text: text1, voice: lang1 })
.then(soundUrl => {
		  
	res.json({
		status: true,
		author: `${author}`,
		text: text1,
		result: soundUrl
	})
})
.catch(e => {
	res.sendFile(__path + '/views/error.html')
})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/tools/translate', async (req, res, next) => {
	var text = req.query.text
    var lang = req.query.lang
    var apikey = req.query.apikey
    
	if(listkey.includes(apikey)){
	
	if (!text) return res.json(mess.nottext)  
	if (!lang) return res.json({ status : false, author : `${author}`, message : "Please Enter Lang. View Lang In https://cloud.google.com/translate/docs/languages"})
	if (!apikey) return res.json(mess.notapikey)
	
	const defaultLang = 'en'
	const tld = 'cn'
	

	let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        
    } finally {
		res.json({
			status: true,
			author: `${author}`,
			result: result
		})
        
    }
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/tools/sswebdesktop', async (req, res, next) => {
	var link = req.query.url
	var islink = isUrl(link)
	var apikey = req.query.apikey
	
	if (!link) return res.json(mess.noturl)  
	if (!islink) return res.json(mess.noturl)  
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.sswebdesktop(link)
	.then((data) =>{ 
		if (!data) return res.json(mess.noturl)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.sendFile(__path + '/views/error.html')
	
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/tools/sswebtablet', async (req, res, next) => {
	var link = req.query.url
	var islink = isUrl(link)
	var apikey = req.query.apikey
	
	if (!link) return res.json(mess.noturl)  
	if (!islink) return res.json(mess.noturl)  
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.sswebtablet(link)
	.then((data) =>{ 
		if (!data) return res.json(mess.noturl)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.sendFile(__path + '/views/error.html')
	
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/tools/sswebphone', async (req, res, next) => {
	var link = req.query.url
	var islink = isUrl(link)
	var apikey = req.query.apikey
	
	if (!link) return res.json(mess.noturl)  
	if (!islink) return res.json(mess.noturl)  
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	danzz.sswebphone(link)
	.then((data) =>{ 
		if (!data) return res.json(mess.noturl)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.sendFile(__path + '/views/error.html')
	
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

router.get('/tools/fakeaddress', async (req, res, next) => {
	var apikey = req.query.apikey
	if (!apikey) return res.json(mess.notapikey)
	if(listkey.includes(apikey)){
	
	let data = await fetchJson(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/tools/fake_address.json`)
	res.json({
	status: true,
	author: `${author}`,
	result: data
	})
} else {
  res.sendFile(__path + '/views/notapikey.html')
}
})

module.exports = router