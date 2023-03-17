require('../set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/

// Module
const express = require('express');
const router = express.Router();

// List API Key
const listkey = ['danzz','razanxx','9286c1a775','9267ic6a0f1','927j59de9c','921n567ea6','921h5a4282','925n2c494','928b0323c9','927b0k3hp7o2','925b04ib0j','023l1qhbpk','92b1a0h7ts','92a70b789c','9291a7bk0p1','92a7o8pe9c','92y1a7l0a6','9221a7i9h2','921a7k3n94','92a0kk2bc9','921a7l9pho2','92a2n1kb0j','92b0a75k6f','92u1a7pr8s'];
const listkeyprem = ['danzzpremkey','razanxx'];
const listkeyvip = ['danzzvipkey'];

// Check Apikey
router.get('/checkapikey', async (req, res, next) => {
	var apikey = req.query.apikey

	if(!apikey) return res.json({message: 'apikey invalid' })
	if(listkey.includes(apikey))
	
	var keys = apikey
	if (keys) {
	json = JSON.stringify({
		status: true,
		author: 'Danzz Coding',
		result: {
         apikey: keys
		},
	})
} else {
	json = JSON.stringify({
		status: false,
		apikey: 'Not Found'
	})
}
res.send(JSON.parse(json))
})

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/home.html')
})
router.get('/dash', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/profile', (req, res) => {
    res.sendFile(__path + '/views/profile.html')
})
router.get('/pricing', (req, res) => {
    res.sendFile(__path + '/views/pricing.html')
})
router.get('/settings', (req, res) => {
    res.sendFile(__path + '/views/settings.html')
})
router.get('/reset-password', (req, res) => {
    res.sendFile(__path + '/views/reset-password.html')
})
router.get('/reset-password-verify', (req, res) => {
    res.sendFile(__path + '/views/reset-password-verify.html')
})
router.get('/create-new-password', (req, res) => {
    res.sendFile(__path + '/views/create-new-password.html')
})
router.get('/get-started', (req, res) => {
    res.sendFile(__path + '/views/get-started.html')
})
router.get('/sign-in', (req, res) => {
    res.sendFile(__path + '/views/sign-in.html')
})
router.get('/sign-up', (req, res) => {
    res.sendFile(__path + '/views/sign-up.html')
})
router.get('/verify-account', (req, res) => {
    res.sendFile(__path + '/views/verify-account.html')
})
router.get('/example-code/raw/case-wa-bot-media', (req, res) => {
	res.sendFile(__path + '/views/example-code/raw/case-wa-bot-media.txt')
})
router.get('/example-code/raw/case-wa-bot-result', (req, res) => {
	res.sendFile(__path + '/views/example-code/raw/case-wa-bot-result.txt')
})
router.get('/example-code/raw/router-media', (req, res) => {
	res.sendFile(__path + '/views/example-code/raw/router-media.txt')
})
router.get('/example-code/raw/router-result', (req, res) => {
	res.sendFile(__path + '/views/example-code/raw/router-result.txt')
})
router.get('/report-bug', (req, res) => {
    res.sendFile(__path + '/views/report-bug.html')
})

module.exports = router