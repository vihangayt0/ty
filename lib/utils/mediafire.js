const axios = require('axios')
const cheerio = require('cheerio')
/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/
const mediafiredl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = {}
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
mime = mime[1]
hasil.title = nama 
hasil.size = size
hasil.url = link
return hasil
}

module.exports = mediafiredl