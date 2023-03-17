/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/
// Module
const cheerio = require("cheerio")
const axios = require("axios")
const Crypto = require("crypto")
const { get } = axios
const qs = require("qs")
const fetch = require('node-fetch')
const FormData = require('form-data')
const request = require("request")
const yt = require("ytdl-core")
const yts = require("yt-search")


// Features
async function joox(query) {
  return new Promise((resolve, reject) => {
    const time = Math.floor(new Date() / 1000)
    axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
      .then(({
        data
      }) => {
        let result = []
        let hasil = []
        let promoses = []
        let ids = []
        data.itemlist.forEach(result => {
          ids.push(result.songid)
        });
        for (let i = 0; i < data.itemlist.length; i++) {
          const scrap = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
          promoses.push(
            axios.get(scrap, {
              headers: {
                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
              }
            })
            .then(({
              data
            }) => {
              const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
              hasil.push({
                lagu: res.msong,
                album: res.malbum,
                penyanyi: res.msinger,
                publish: res.public_time,
                img: res.imgSrc,
                mp3: res.mp3Url
              })

              axios.get('http://api.joox.com/web-fcgi-bin/web_lyric?musicid=' + ids[i] + '&lang=id&country=id&_=' + time)
                .then(({
                  data
                }) => {
                  const lirik = JSON.parse(data.replace('MusicJsonCallback(', '').replace('\n)', '')).lyric
                  const buff = new Buffer.from(lirik, 'base64')
                  const ash = buff.toString('utf-8')
                  result.push({
                    result: ash
                  })
                  Promise.all(promoses).then(() => resolve({
                    status: true,
                    code: 200,
                    author: 'Danzz Coding',
                    result: hasil[0],
                    lirik: result[0]
                  }))
                })
                .catch(reject)
            })
            .catch(reject)
          )
        }
      })
      .catch(reject)
  })
}
async function ytmp3(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let audio = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
            let aud = pormat[i]
            audio.push(aud.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: audio[1]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function ytmp4(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: video[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function ytplaymp3(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytplaymp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytsearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                res = data.all
                return res
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

function ttdl(URL) {
	return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
				pp: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img').attr('src'),
				username: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2) > b').text(),
				description: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
                video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)').attr('href'),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(10)').attr('href'),
                audio_original: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href')
            }
        resolve(result)
        })
    })
    })
    })
	
}

async function ttdl2(url){
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: author,
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

function ttaudio(URL) {
	return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
				pp: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img').attr('src'),
				username: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2) > b').text(),
				description: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                audio_original: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href')
            }
        resolve(result)
        })
    })
    })
    })
	
}

function ttvideo(URL) {
	return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
				pp: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img').attr('src'),
				username: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2) > b').text(),
				description: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
                video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(10)').attr('href')
            }
        resolve(result)
        })
    })
    })
    })
	
}

function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+title)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
		})
		.catch(reject)
		})
}


function aiovideodl(link) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://aiovideodl.ml/',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        }).then((src) => {
            let a = cheerio.load(src.data)
            let token = a('#token').attr('value')
            axios({
                url: 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
                method: 'POST',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
                },
                data: new URLSearchParams(Object.entries({ 'url': link, 'token': token }))
            }).then(({ data }) => {
				
                resolve(data.medias)
            },
			(error) => {
				resolve()
			}
			)	
			
		})
		.catch(reject)
		})
}

function wikimedia(title) {
    return new Promise((resolve, reject) => {
        axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`)
        .then((res) => {
            let $ = cheerio.load(res.data)
            let hasil = []
            $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
                hasil.push({
                    title: $(b).find('img').attr('alt'),
                    source: $(b).attr('href'),
                    image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                })
            })
			
            resolve(hasil)
		})
		.catch(reject)
		})
}

function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
		const random = [1,2,3,4,5,6,7,8,9,10]
		let randomgambar = random[Math.floor(Math.random() * random.length)]
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${randomgambar}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image:  $(b).find('picture > source:nth-child(2)').attr('srcset')
                })
            })
	
            resolve(hasil)
		})
		.catch(reject)
		})
}

function otakudesu(judul){
	return new Promise(async(resolve, reject) => {
	axios.get('https://otakudesu.moe/?s=' + judul + '&post_type=anime')
	.then(({ data }) => {
	const $ = cheerio.load(data)
	const result = {};
	let limk = $('#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a').attr('href')
	axios.get(limk).then(({ data }) => {
	const $$ = cheerio.load(data)
	result.img = $$('#venkonten > div.venser > div.fotoanime').find('img').attr('src')
	$$('#venkonten > div.venser > div.fotoanime > div.infozin > div').each(function(a, b) {
		result.judul = $$(b).find('p:nth-child(1)').text().replace('Judul: ','')
		result.jepang = $$(b).find('p:nth-child(2)').text().replace('Japanese: ','')
		result.rate = $$(b).find('p:nth-child(3)').text().replace('Skor: ','')
		result.produser = $$(b).find('p:nth-child(4)').text().replace('Produser: ','')
		result.tipe = $$(b).find('p:nth-child(5)').text().replace('Tipe: ','')
		result.status = $$(b).find('p:nth-child(6)').text().replace('Status: ','')
		result.episode = $$(b).find('p:nth-child(7)').text().replace('Total Episode: ','')
		result.durasi = $$(b).find('p:nth-child(8)').text().replace('Durasi: ','')
		result.rilis = $$(b).find('p:nth-child(9)').text().replace('Tanggal Rilis: ','')
		result.studio = $$(b).find('p:nth-child(10)').text().replace('Studio: ','')
		result.genre = $$(b).find('p:nth-child(11)').text().replace('Genre: ','')
		result.desc = $$('#venkonten > div.venser > div.fotoanime > div.sinopc').text().replace('.','\n') + $$(b).find('div.sinopc > p:nth-child(2)').text()
		result.batch = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	})
	const lim = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	axios.get(lim).then(({ data }) => {
	const $$$ = cheerio.load(data)
		result.batchSD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)').attr('href')
		result.batchHD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)').attr('href')
		resolve(result)
				})
			})
		})
	.catch(reject)
	})
}

function cnn(g="internasional"){
  return new Promise((resolve,reject)=>{
    axios.get(`https://www.cnnindonesia.com/${g}`).then(({ data }) => {
      const hasil = []
      const $ = cheerio.load(data)
      $('article').each(function(a, b) {
        const link = $(b).find('a').attr('href')
        const thumb = $(b).find('img').attr('src') 
        const judul = $(b).find('img').attr('alt')
        hasil.push({ judul, link, thumb })
      })
      resolve(hasil)
    }).catch(reject)
  })
}

function covid() {
return new Promise(async(resolve, reject) => {
axios.get('https://covid19.go.id/')
.then(({ data }) => {
const $ = cheerio.load(data)
const hasil = [];
$('#case > div > div > div > div > div:nth-child(2)').each(function(a,b) {
const pindo = $(b).find('div:nth-child(3) > strong').text()
const mindo = $(b).find('div:nth-child(5) > strong').text()
const sindo = $(b).find('div:nth-child(4) > strong').text()
const upindo = $(b).find('div.pt-4.text-color-black.text-1').text().trim()
$('#case > div > div > div > div > div:nth-child(1)').each(function(c,d) {
const neg = $(d).find('div:nth-child(3) > strong').text() 
const pglo = $(d).find('div:nth-child(4) > strong').text()
const nglo = $(d).find('div:nth-child(5) > strong').text()
const up = $(d).find('div.pt-4.text-color-grey.text-1').text().trim()
const result = {
indonesia : {
kasus: pindo,
kematian: mindo,
sembuh: sindo,
update: upindo.split(':')[1]
},
global: {
negara: neg,
kasus: pglo,
kematian: nglo,
update: up.split(':')[1].split('\n')[0]
}
}
hasil.push(result)
})
})
resolve(hasil)
console.log(hasil)
})
.catch(reject)
})
}

function ongoing(){
	return new Promise((reject,resolve) => {
		axios.get('https://otakudesu.moe/ongoing-anime/').then(({ data}) => {
			const $ = cheerio.load(data)
			const result = [];
			const img = [];
			const epz = [];
			const ne = [];
			const th = [];
			const ep = [];
			const nm =[];
			$('div.detpost').each(function(a,b) {
				img.push($(b).find('img').attr('src'))
				nm.push($(b).find('h2').text())
				th.push($(b).find('a').attr('href'))
			})
			$('div.epztipe').each(function(d,c) {
				epz.push($(c).text())
			})
			$('div.newnime').each(function(f,g) {
				ne.push($(g).text())
			})
			$('div.epz').each(function(m,n){
				ep.push($(n).text())
			})
		for( let i = 0; i < img.length; i++){
			result.push({
				nama: nm[i],
				image: img[i],
				episode: ep[i],
				setiap: epz[i],
				rilis: ne[i],
				link: th[i]
			})
		}
		resolve(result)
		})
		.catch(reject)
	})
}

function komiku(judul) {
	return new Promise(async(resolve,reject) => {
	axios.get('https://data3.komiku.id/cari/?post_type=manga&s=' + encodeURIComponent(judul))
	.then(({ data }) => {
	const $ = cheerio.load(data)
	const img = []; 
	const or = [];
	const ind = [];
	const up = [];
	const des = [];
	const li = [];
	const ch = [];
	const ch1 = [];
	$('div.daftar').each(function (a,b) {
		img.push($(b).find('img').attr('data-src'))
	$('div.kan').each(function(c,d) {
		or.push($(d).find('h3').text().trim())
		ind.push($(d).find('span.judul2').text())
		li.push('https://komiku.id' + $(d).find('a').attr('href'))
		up.push($(d).find('p').text().trim().split('. ')[0])
		des.push($(d).find('p').text().trim().split('. ')[1])
		ch1.push($(d).find('div:nth-child(5) > a').attr('title'))
	$('div.new1').each(function(e,f) {
		ch.push($(f).find('a').attr('title'))
		})
	})
})
	for (let i = 0 ; i < img.length; i++) {
		resolve({
			image: img[i],
			title: or[i],
			indo: ind[i],
			update: up[i],
			desc: des[i],
			chapter_awal: ch[i],
			chapter_akhir: ch1[i],
			link: li[i]
		})
	}
})
	.catch(reject)
	})
} 

function tebakgambar() {
	return new Promise(async(resolve, reject) => {
    axios.get('https://jawabantebakgambar.net/all-answers/')
    .then(({ data }) => {
    const $ = cheerio.load(data)
    const result = [];
    let random = Math.floor(Math.random() * 2836) + 2;
    let link2 = 'https://jawabantebakgambar.net'
    $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
    const img = link2 + $(b).find('img').attr('data-src')
    const jwb = $(b).find('img').attr('alt')
    result.push({
    	image: img,
    	jawaban: jwb
    })
	let res = result[Math.floor(Math.random() * result.length)]
    	resolve(res)
    })
    	})
    .catch(reject)
	})
}

function surah(no){
	return new Promise(async(resolve, reject) => {
		axios.get('https://kalam.sindonews.com/surah/' + no)
		.then(({ data }) => {
			const $ = cheerio.load(data)

			const result = [];
			const ar = [];
			const id = [];
			const lt = [];
			$('div.ayat-arab').each(function(a, b) {
				ar.push($(b).text()) 
			})
			$('li > div.ayat-text').each(function(e, f) {
				id.push($(f).text().replace(',','').trim()) })
			$('div.ayat-latin').each(function(g, h) {
				lt.push($(h).text().trim())	})
			for(let i = 0; i < ar.length ; i++){
			result.push({
				arab: ar[i],
				rumi: id[i],
				latin: lt[i],
			})
		}
		var	ya = $('body > main > div.container > div.content.clearfix > div.news.col-md-9 > section > div.list-content.clearfix > div:nth-child(1) > div.ayat-title > h1').text()
		if (!ya ) {
			resolve()
		}else{
			resolve(result)
		}
			
		})
		.catch(reject)
	})
}
function sholat(NO) {
	return new Promise(async(resolve, reject) =>{
		axios.get('https://kalam.sindonews.com/jadwalsholat/' + NO).then(({ data }) => {
			const $ = cheerio.load(data)
			const result = {};
			$('div.imsakiyah-content').each(function(a, b) {
			result.Tanggal = $(b).find('tr:nth-child(1) > td:nth-child(1)').text()
			result.imsak = $(b).find('tr:nth-child(1) > td:nth-child(2)').text()
			result.subuh = $(b).find('tr:nth-child(1) > td:nth-child(3)').text()
			result.zuhur = $(b).find('tr:nth-child(1) > td:nth-child(4)').text()
			result.ashar = $(b).find('tr:nth-child(1) > td:nth-child(5)').text()
			result.maghrib = $(b).find('tr:nth-child(1) > td:nth-child(6)').text()
			result.isya = $(b).find('tr:nth-child(1) > td:nth-child(7)').text()
			})
			resolve(result)
		})
		.catch(reject)
	})
}

function lirik(link,title){
	return new Promise(async(resolve, reject) => {
   		axios.get(link).then(async({ data }) => {
		const $ = cheerio.load(data)
   		const hasil = {};
	        	hasil.tajuk = title
				hasil.artis = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h2 > span > a').text()
		   		hasil.thumb = 'https:' + $('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
		  		$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
		   hasil.lirik = $(b).find('span > p > span').text() +'\n' + $(b).find('span > div > p > span').text()
	   })
	   resolve(hasil)
   })
   .catch(reject)
   })
}

function chara(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.wallpaperflare.com/search?wallpaper='+ query,{
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const result = [];
			$('#gallery > li > figure > a').each(function(a, b) {
				result.push($(b).find('img').attr('data-src'))
			})
			let jadi = result[Math.floor(Math.random() * result.length)]
			resolve(jadi)
		})
	.catch({status: 'err'})
	})
}

function wattpad(judul){
	return new Promise((resolve, reject) => {
		axios.get('https://www.wattpad.com/search/' + judul)
		.then(({data}) => {
			const $ = cheerio.load(data)
			const result = [];
			const jdl = [];
			const img = [];
			const des = [];
			const lnk = [];
			const red = [];
			const vt = [];
			const limk = 'https://www.wattpad.com/'
			$('div.cover.cover-xs.pull-left').each(function(a,b){
				img.push($(b).find('img').attr('src')) 
			})
			$('div.content > h5').each(function(a,b) {
				jdl.push($(b).text().trim())
			})	
			$('div.content > p').each(function(a,b){
				des.push($(b).text().trim())
			})	
			$('#results-stories > div > ul > li').each(function(a,b){
				lnk.push(limk + $(b).find('a.on-result').attr('data-id'))
			})
			$('div.content > div > small.reads').each(function(a,b){
				red.push($(b).text())
			})
			$('div.content > div > small.votes').each(function(a, b) {
				vt.push($(b).text())
			})
		for (let i = 0; i < lnk.length; i++){
			result.push({
					judul: jdl[i],
					desc: des[i],
					vote: vt[i],
					reads: red[i],
					image: img[i],
					link: lnk[i]
			})
			resolve(result)
		}
		})
	.catch({message: 'err'})
	})
}

function sfile(query) {
return new Promise((resolve, reject) => {
axios.get(`https://sfile.mobi/search.php?q=${query}&search=Search`).then(async tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.list").each(function(i, cuk) {
ico= $(cuk).find("img").attr("src");
lin= $(cuk).find("a").attr("href");
name= $(cuk).find("a").text();
const Data = {
icon: ico,
name: name,
link: lin
}
hasil.push(Data)

})
resolve(hasil)
});
});
}

function apkmody(query) {
return new Promise((resolve, reject) => {
axios.get(`https://apkmody.io/?s=${query}`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.flex-item").each(function(c, d) {
name = $(d).find("div.card-title > h2.truncate").text();
desc = $(d).find("div.card-body > p.card-excerpt.has-small-font-size.truncate").text().trim();
img = $(d).find("div.card-image > img").attr('src');
link = $(d).find("article.card.has-shadow.clickable > a").attr('href');
const Data = {
img: img,
name: name,
desc: desc,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
});
}

function moddroid(query) {
return new Promise((resolve, reject) => {
axios.get(`https://moddroid.com/?s=${query}`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.col-12.col-md-6.mb-4").each(function(c, d) {
link = $(d).find("a.d-flex.position-relative.archive-post").attr('href');
name = $(d).find("div > h3.h5.font-weight-semibold.text-truncate.text-primary.w-100").text().trim();
img = $(d).find("div.flex-shrink-0.mr-2 > img").attr('src');
desc = $(d).find("div.text-truncate.text-muted > span.align-middle").text();
const Data = {
img: img,
name: name,
desc: desc,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
});
}

function playstore(name){
	return new Promise((resolve, reject) => {
axios.get('https://play.google.com/store/search?q='+ name +'&c=apps')
.then(({ data }) => {
	const $ = cheerio.load(data)
	let ln = [];
	let nm = [];
	let dv = [];
	let lm = [];
	const result = [];
	$('div.wXUyZd > a').each(function(a,b){
const link = 'https://play.google.com' + $(b).attr('href')
ln.push(link);
	})
	$('div.b8cIId.ReQCgd.Q9MA7b > a > div').each(function(d,e){
const name = $(e).text().trim()
nm.push(name);
	})
	$('div.b8cIId.ReQCgd.KoLSrc > a > div').each(function(f,g){
const dev = $(g).text().trim();
dv.push(dev)
	})
	$('div.b8cIId.ReQCgd.KoLSrc > a').each(function(h,i){
const limk = 'https://play.google.com' + $(i).attr('href');
lm.push(limk);
	})	
for (let i = 0; i < ln.length; i++){
	result.push({
name: nm[i],
link: ln[i],
developer: dv[i]
	})
	}
resolve(result)
})
console.log(result)
	.catch(reject)
	})
}

function gcwa(nama){
	return new Promise((resolve,reject) => {
		axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
		.then(({ data }) => {
			const $ = cheerio.load(data);
			const result = [];
			const lnk = [];
			const nm = [];
		$('div.wa-chat-title-container').each(function(a,b){
			const limk = $(b).find('a').attr('href');
			lnk.push(limk)
			})
		$('div.wa-chat-title-text').each(function(c,d) {
			const name = $(d).text();
			nm.push(name)
			})
		for( let i = 0; i < lnk.length; i++){
			result.push({
				nama: nm[i].split('. ')[1],
				link: lnk[i].split('?')[0]
			})
		}
	
		resolve(result)
		})
	.catch(reject)
	})
}

function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift()
		
				resolve(hasil)
		
		})
	})
}

function snapinsta (url) {
		return new Promise(async(resolve, reject) => {
			  if (!/^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/i.test(url)) throw 'Url invalid'
			  let form = new FormData()
			  form.append('url', encodeURI(url))
			  form.append('action', 'post')
			  let res = await fetch('https://snapinsta.app/action.php', {
				method: 'POST',
				headers: {
				  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary1kCNm4346FA9yvCN',
				  'cookie': 'PHPSESSID=6d7nupv45th6ln9ldhpu62pg8s; _ga=GA1.2.1450546575.1637033620; _gid=GA1.2.1378038975.1637033620; _gat=1; __gads=ID=68a947f8174e0410-22fc6960b3ce005e:T=1637033620:RT=1637033620:S=ALNI_MbXTvxtxuISyAFMevds6-00PecLlw; __atuvc=1%7C46; __atuvs=61932694ba428f79000; __atssc=google%3B1',
				  'origin': 'https://snapinsta.app',
				  'referer': 'https://snapinsta.app/id',
				  'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
				  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
				  ...form.getHeaders()
				},
				body: form
			  })
			  let html = await res.text()
			  const $ = cheerio.load(html)
			  let results = []
			  $('div.col-md-4').each(function () {
				let thumbnail = $(this).find('div.download-items > div.download-items__thumb > img').attr('src')
				let result = $(this).find('div.download-items > div.download-items__btn > a').attr('href')
				if (!/https?:\/\//i.test(result)) result = 'https://snapinsta.app' + result
				results.push({
				  thumbnail,
				  result
				})
			  })
			  resolve(results)
			})
		}
			
	

function igdl(url){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/download-instagram-videos.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url': url,
					'action': 'post',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
}

function igvideo(link) {
return new Promise(async(resolve, reject) => {
let config = {
'url': link,
'submit': ''
}
axios('https://downloadgram.org/video-downloader.php',{
method: 'POST',
data : new URLSearchParams(Object.entries(config)),
headers: {
"cookie": "_ga=GA1.2.623704211.1625264926; __gads=ID=a078e4fc2781b47b-22330cd520ca006e:T=1625264920:RT=1625264920:S=ALNI_MYS-jyPCjNa94DU8n-sX4aNF-ODOg; __atssc=google%3B3; _gid=GA1.2.1953813019.1625397379; __atuvc=4%7C26%2C6%7C27; __atuvs=60e2ab6d67a322ec003",
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
})
.then(tod => {
const $ = cheerio.load(tod.data)
resolve({
link: $('#downloadBox > a').attr('href')
})
})
})
} 

function igimg(link) {
return new Promise(async(resolve, reject) => {
let config = {
'url': link,
'submit': ''
}
axios('https://downloadgram.org/photo-downloader.php',{
method: 'POST',
data : new URLSearchParams(Object.entries(config)),
headers: {
"cookie": "_ga=GA1.2.623704211.1625264926; __gads=ID=a078e4fc2781b47b-22330cd520ca006e:T=1625264920:RT=1625264920:S=ALNI_MYS-jyPCjNa94DU8n-sX4aNF-ODOg; __atssc=google%3B3; _gid=GA1.2.1953813019.1625397379; __atuvc=4%7C26%2C6%7C27; __atuvs=60e2ab6d67a322ec003",
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
})
.then(tod => {
const $ = cheerio.load(tod.data)
resolve({
link: $('#downloadBox > a').attr('href')
})
})
})
}

function igstory(username){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/instagram-story-downloader.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url':'https://www.instagram.com/'+ username,
					'action': 'story',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
}

function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

 function fbdl(url){
	return new Promise((resolve,reject) => {
		axios.get('https://saveas.co/')
		.then(({ data }) => {
		const $ = cheerio.load(data)
		let token = $('#token').attr('value')
		axios('https://saveas.co/system/action.php', {
			method: 'POST',
			data: 'url=' + encodeURIComponent(url + '/') + 'token=' + token
		})
		.then(({data}) => {
			resolve(data)
		})
		.catch(reject)
	})
	})
	}


function fbdown(link){
	return new Promise((resolve,reject) => {
	let config = {
		'url': link
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data)	
		resolve({
			Normal_video: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			HD: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

function ytdl(link){
	return new Promise((resolve, reject) => {
		const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
		if (ytIdRegex.test(link)) {
		let url =  ytIdRegex.exec(link)
		let config = {
			'url': 'https://www.youtube.be/' + url,
			'q_auto': 0,
			'ajax': 1
		}
		let headerss = 	{
			"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
		}
	axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: headerss
		})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let img = $('div.thumbnail.cover > a > img').attr('src');
		let title = $('div.thumbnail.cover > div > b').text();
		let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
		let size_mp3 = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
		let id = /var k__id = "(.*?)"/.exec(data.result)[1]
		let configs = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp4',
    fquality: 480
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configs)),
		headers: headerss 
	})
	.then(({data}) => {
		const $ = cheerio.load(data.result)
		let link = $('div > a').attr('href')
	let configss = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp3',
    fquality: 128
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configss)),
		headers: headerss 
	})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let audio = $('div > a').attr('href')
		resolve({
			id: url[1],
			title: title,
			size: size,
			quality: '480p',
			thumb: img,
			link: link,
			size_mp3: size_mp3,
			mp3: audio
		})

		})
			})
		})
	.catch(reject)
	}else reject('link invalid')
	})
}

function ttdownloader(url){
	return new Promise(async(resolve, reject) => {
		axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
		axios('https://ttdownloader.com/query/',{
			method: 'POST',
			data : new URLSearchParams(Object.entries(config)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
			})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			resolve({
				nowm: $('div:nth-child(2) > div.download > a').attr('href'),
				wm: $('div:nth-child(3) > div.download > a').attr('href'),
				audio: $('div:nth-child(4) > div.download > a').attr('href')
				})
			})
		})
	.catch(reject)
	})
}


function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ name: $(b).find('td:nth-child(1) > h6 > a').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            }),
            resolve(hasil)
        })
    })
}

function soundcloud (url)  {
    return new Promise((resolve, reject) => {
        axios.get('https://soundcloudmp3.org/id').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('form#conversionForm > input[type=hidden]').attr('value')
            const options = {
                method: 'POST',
                url: `https://soundcloudmp3.org/converter`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": data["headers"]["set-cookie"],
                },
                formData: {
                    _token: token,
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) return reject()
                $get = cheerio.load(body)
                const result = {
                    title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:',''),
                    duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g,''),
                    quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:',''),
                    thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
                    download: $get('#download-btn').attr('href')
                }
                resolve(result)
            });
        })
    })
}

function telesticker(url) {
    return new Promise(async (resolve, reject) => {
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`,{method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
	if (data.data.result.stickers.length > 40){
        for (let i = 0; i < 30; i++) {
			
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
		}
		resolve(hasil)
	}else{
		for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
	}
	resolve(hasil)
	}
})
    }

	function stickersearch(text) {
		return new Promise((resolve, reject) => {
			axios.get(`https://getstickerpack.com/stickers?query=${text}`)
				.then(({data}) => {
					const $ = cheerio.load(data)
					const source = []
					const link = [];
					var	ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text()
		if (!ya ) return resolve()
					$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
						source.push($(b).attr('href'))
					})
					axios.get(source[Math.floor(Math.random() * source.length)])
						.then(({
							data
						}) => {
							const $$ = cheerio.load(data)
							$$('#stickerPack > div > div.row > div > img').each(function(c, d) {
								link.push($$(d).attr('src').replace(/&d=200x200/g,''))
							})
							result = {
								title: $$('#intro > div > div > h1').text(),
								sticker_url: link
							}
							resolve(result)
						})
				}).catch(reject)
		})
	}

function sswebdesktop (url, device = 'desktop')  {
		return new Promise((resolve, reject) => {
			 const base = 'https://www.screenshotmachine.com'
			 const param = {
			   url: url,
			   device: device,
			   cacheLimit: 0
			 }
			 axios({url: base + '/capture.php',
				  method: 'POST',
				  data: new URLSearchParams(Object.entries(param)),
				  headers: {
					   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
			 }).then((data) => {
				  const cookies = data.headers['set-cookie']
				  if (data.data.status == 'success') {
					   axios.get(base + '/' + data.data.link, {
							headers: {
								 'cookie': cookies.join('')
							},
							responseType: 'arraybuffer'
					   }).then(({ data }) => {
							resolve(data)
					   })
				  } else {
					   reject()
				  }
			 }).catch(reject)
		})
   }
   
   function sswebtablet (url, device = 'tablet')  {
		return new Promise((resolve, reject) => {
			 const base = 'https://www.screenshotmachine.com'
			 const param = {
			   url: url,
			   device: device,
			   cacheLimit: 0
			 }
			 axios({url: base + '/capture.php',
				  method: 'POST',
				  data: new URLSearchParams(Object.entries(param)),
				  headers: {
					   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
			 }).then((data) => {
				  const cookies = data.headers['set-cookie']
				  if (data.data.status == 'success') {
					   axios.get(base + '/' + data.data.link, {
							headers: {
								 'cookie': cookies.join('')
							},
							responseType: 'arraybuffer'
					   }).then(({ data }) => {
							resolve(data)
					   })
				  } else {
					   reject()
				  }
			 }).catch(reject)
		})
   }
   
   function sswebphone (url, device = 'phone')  {
		return new Promise((resolve, reject) => {
			 const base = 'https://www.screenshotmachine.com'
			 const param = {
			   url: url,
			   device: device,
			   cacheLimit: 0
			 }
			 axios({url: base + '/capture.php',
				  method: 'POST',
				  data: new URLSearchParams(Object.entries(param)),
				  headers: {
					   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
			 }).then((data) => {
				  const cookies = data.headers['set-cookie']
				  if (data.data.status == 'success') {
					   axios.get(base + '/' + data.data.link, {
							headers: {
								 'cookie': cookies.join('')
							},
							responseType: 'arraybuffer'
					   }).then(({ data }) => {
							resolve(data)
					   })
				  } else {
					   reject()
				  }
			 }).catch(reject)
		})
   }

   function tafsirsurah (query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({data}) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    result = {
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function artinama(nama) {
	return new Promise((resolve, reject) => {
		axios.get('http://www.primbon.com/arti_nama.php?nama1='+nama+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const r = $('#body').text();
		const re = r.split('\n      \n        \n        \n')[0]
		const result = re.trim()
		resolve(result)
		})
	})
}

function ramalanJodoh(nama, pasangan) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+nama+'&nama2='+pasangan+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const thumb = 'https://www.primbon.com/'+$('#body > img').attr('src')
		const isi = $('#body').text().split(pasangan)[1].replace('< Hitung Kembali','').split('\n')[0]
      		const positif = isi.split('Sisi Negatif Anda: ')[0].replace('Sisi Positif Anda: ','')
      		const negatif = isi.split('Sisi Negatif Anda: ')[1]
      		const result = {
      			thumb: thumb,
      			positif: positif,
      			negatif: negatif
      		}
      		resolve(result)
		})

	})
}

function ramalanJadian(tanggal, bulan, tahun) {
  return new Promise((resolve,reject)=>{
    if(isNaN(tanggal) && isNaN(bulan) && isNaN(tahun)) throw `Tanggal bulan tahun harus berupa angka`
    axios.get(`https://www.primbon.com/tanggal_jadian_pernikahan.php?tgl=${tanggal}&bln=${bulan}&thn=${tahun}&proses=+Submit%21+`).then(({ data }) => {
      resolve(cheerio.load(data)('#body').text().trim().replace('MAKNA TANGGAL JADIAN, PERNIKAHAN', '').replace('Karakteristik:', '\nKarakteristik : ').replace('< Hitung Kembali', ''))
    }).catch(reject)
  })
}

async function mlstalk(id, zoneId) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.data.gameDetail)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

async function ffstalk(userId) {
  let data = {
    "voucherPricePoint.id": 8050,
    "voucherPricePoint.price": "",
    "voucherPricePoint.variablePrice": "",
    "email": "",
    "n": "",
    "userVariablePrice": "",
    "order.data.profile": "",
    "user.userId": userId,
    "voucherTypeName": "FREEFIRE",
    "affiliateTrackingId": "",
    "impactClickId": "",
    "checkoutId": "",
    "tmwAccessToken": "",
    "shopLang": "in_ID",
  }
  let ff = await axios({
    "headers": {
    "Content-Type": "application/json; charset\u003dutf-8"
    },
    "method": "POST",
    "url": "https://order.codashop.com/id/initPayment.action",
    "data": data
  })
  return {
    id: userId,
    nickname: ff.data["confirmationFields"]["roles"][0]["role"]
  }
}

function npmstalk(package) {
    return new Promise((resolve, reject) => {
        axios.get('https://npmjs.com/package/'+package)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let keywords = []
            let info = []
            let collaborator = []
            $('#tabpanel-readme > div.pv4 > ul > li').each(function (a, b) {
                keywords.push($(b).text())
            })
            $('div._702d723c.dib.w-50.bb.b--black-10.pr2').each(function (a, b) {
                info.push({ type: $(b).find('h3').text(), result: $(b).find('p').text() || $(b).find('a').text() })
            })
            $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div.w-100 > ul > li').each(function (a, b) {
                collaborator.push({ name: $(b).find('a').attr('href').replace('/~', ''), url: 'https://www.npmjs.com'+$(b).find('a').attr('href') })
            })
            let hasil = {
                title: $('#top > div.w-100.ph0-l.ph3.ph4-m > h2 > span').text(),
                language: $('#top > div.w-100.ph0-l.ph3.ph4-m > h2 > div').text() || 'Default',
                publish: $('#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4)').text(),
                readme: $('#readme').text() || '',
                explore: $('#package-tab-explore > span').text().replace(' Explore ', '') || '',
                dependencies: $('#package-tab-dependencies > span').text().replace(' Dependencies', '') || '',
                dependents: $('#package-tab-dependents > span').text().replace(' Dependents', '') || '',
                version_count: $('#package-tab-versions > span').text().replace(' Versions', '') || '',
                keywords: keywords || [],
                install: $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p > code > span').text(),
                info,
                collaborator
            }
            resolve(hasil)
        })
    })
}

function ghstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/users/'+user)
        .then(({ data }) => {
            let hasil = {
                username: data.login,
                nickname: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                ceated_at: data.created_at,
                updated_at: data.updated_at
            }
            resolve(hasil)
        })
    })
}

function twstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://instalker.org/'+user)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let tweets = []
            $('div.activity-posts').each(function (a, b) {
                tweets.push({
                    author: {
                        username: $(b).find('div.user-text3 > h4 > span').text(),
                        nickname: $(b).find('div.user-text3 > h4').text().split('@')[0] || $(b).find('div.user-text3 > h4').text().trim(),
                        profile_pic: $(b).find('img').attr('src') || $(b).find('img').attr('onerror'),
                        upload_at: $(b).find('div.user-text3 > span').text()
                    },
                    title: $(b).find('div.activity-descp > p').text() || '',
                    media: $(b).find('div.activity-descp > div > a').attr('href') || $(b).find('div.activity-descp > p > video').attr('src') || $(b).find('div.activity-descp > div > a > img').attr('src') || $(b).find('div.activity-descp > div > a > video').attr('src') || 'No Media Upload',
                    retweet: $(b).find('div.like-comment-view > div > a:nth-child(1) > span').text().replace('Download Image', ''),
                    likes: $(b).find('div.like-comment-view > div > a:nth-child(2) > span').text()
                })
            })
            let hasil = {
                username: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3 > span').text(),
                nickname: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text().split('@')[0] || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text(),
                background: $('body > main > div.dash-todo-thumbnail-area1 > div.todo-thumb1.dash-bg-image1.dash-bg-overlay').attr('style').split('url(')[1].split(')')[0],
                profile: $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a > img').attr('src') || $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a').attr('href'),
                desc_text: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(2)').text() || '',
                join_at: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(3)').text() || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(5)').text(),
                map: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(4)').text() || '',
                tweets_count: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > div.dscun-numbr').text(),
                followers: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(2) > div > div.dscun-numbr').text(),
                following: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(3) > div > div.dscun-numbr').text(),
                media_count: tweets.length,
                media: tweets || 'No Media Upload'
            }
            resolve(hasil)
        })
    })
}

function igstalk(user) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://www.instagram.com/' + user + "/?__a=1",
            method: "GET",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                'cookie': 'crsftoken=au1sbQzCDp2Ri5TZF688kVeWOfvaa3Ox; ds_user_id=26641471282; ig_did=54AA06C9-3A86-4F53-A7F6-C9127DC153AC; ig_nrcb=1; mid=YU0dFwALAAHPggeAvlvEiV8DP9zM; sessionid=26641471282%3AnPDRQn9Qe628rm%3A26'
            }
        }).then((data) => {
            const Format = {
                full_name: data.data.graphql.user.full_name,
                user_name: data.data.graphql.user.username,
                user_id: data.data.graphql.user.id,
                followers: data.data.graphql.user.edge_follow.count,
                following: data.data.graphql.user.edge_followed_by.count,
                bussines: data.data.graphql.user.is_business_account,
                profesional: data.data.graphql.user.is_professional_account,
                verified: data.data.graphql.user.is_verified,
                private: data.data.graphql.user.is_private,
                biography: data.data.graphql.user.biography,
                bio_url: data.data.graphql.user.external_url,
                profile_ed: data.data.graphql.user.profile_pic_url,
                profile_hd: data.data.graphql.user.profile_pic_url_hd
            }
            resolve(Format)
        })
    })
}

function ttstalk(user) {
    return new Promise((resolve, reject) => {
        let User = user.startsWith('@') ? user : '@' + user
        axios({
            url: `https://www.tiktok.com/${User}?lang=id`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
		'Cookie': 'tt_csrf_token=psXax5iA3QxSpE_LI2j6iHU0; ttwid=1%7Cfpftinh7CEhYgKNa0Zi6Tg8okKrRQQej6DsUM8Bym-M%7C1640705402%7C7837ecf88b4283018f0b3bc91eef9e42af9fc4a68e64eea290eb3fb13539fa47; _abck=EBA03DEC357EB172FA758A935B33C888~-1~YAAQt3/3SLKkT919AQAA7kGpAQfZl7orSpqNkGxpXGcM0UZcExmPHHWIMV11g1ixLjDwfQ44s7VLGsfSc7A9UlHmuRsCv8JTcypSAWOAQB4fy3pTTTcuMD1vsc9raahBXw7HjHqBLUxy+GOb3AkbggZpldZIJTm9+CDo3XIs6JyMTgF/YIzlC2u4uDK0fX2AYbRTl2J/FdR/GuRXCW/whXmk7zQ9ZECfPM6sYpSQyXMKnSMwEZXl0LkSZ3wRE5Bj2uRJbxRk0fEuwyOSkN6FyS0lDU3EKoQpAvu2MhS98YdKjeX7dXbCNRYbgSMGJa++Pr2cIuwyZfBI4X/glj5dWW4JtVHW2NBxpuJrkG1cOFN3gz1LJepTuVv8BmtHSM7YTpoTbW3oJ4XabQ==~-1~-1~-1; bm_sz=E65E8E40342F6F53DEA6389742304A35~YAAQt3/3SLOkT919AQAA7kGpAQ4Ix9bfuKB/TNEc7AzfgEouOWl9EUtetDzyJWjxZ/u8OoNJm/LH3ahXONGH4/RBzfapPYF1Xw/lY/if6nlx4yaJl8LfIU1iVBz+Y0WOcJ9tOlg15Sn/fTu2VsGOMsGr1sx0FplV6VkJPd4xA4Oc5UVGM46e9gwWLLnVU9K6NeYhfynfXv0sa4ljpfOBrDL0YlVB0wOP3d9cNoUptyImzHbURICOLWMz7hy7NsQ3z5yra5d06fW0jSTa8ujpX/TRpI0raskHtOYoW83WqgRD0UU=~3291202~3688002'
            }
        }).then((data) => {
            let $ = cheerio.load(data.data)
            let res = $('body').find('#__NEXT_DATA__').get()[0].children[0]
			let result = JSON.parse(res.data).props.pageProps.userInfo
            resolve(result)
        })
    })
}

function tgstalk(user) {
    return new Promise((resolve, reject) => {
        let User = user.startsWith('@') ? user : '@' + user
        axios({
            url: 'https://in.tgstat.com/channel/'+User,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                'cookie': '_ga=GA1.2.2145921501.1640416771; _gat=1; _gid=GA1.2.1701284558.1640416771; _ym_d=1640416774; _yn_uid=1640416774851926759; tgstat_sirk=se5opc311gme57h03vl7q72r44'
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = {
                nickname: $('div.small-12.medium-5.large-5.columns > h1').text(),
                username: $('div.small-12.medium-5.large-5.columns > a:nth-child(3) > span:nth-child(2)').text(),
                channel_url: $('div.small-12.medium-5.large-5.columns > a:nth-child(3)').attr('href'),
                likes: $('div.small-12.medium-5.large-5.columns > a.btn.btn-default.btn-sm.btn-heart.not-hover.popup_ajax > span').text().replace('Like', ''),
                description: $('div.small-12.medium-5.large-5.columns > div:nth-child(8)').text().trim(),
                channel_geo_lang: $('div.medium-4.large-4.columns.hide-for-small-only > div:nth-child(1) > div:nth-child(1)').text().replace(`Channel's geo & Language`, '').trim(),
                channel_category: $('div.medium-4.large-4.columns.hide-for-small-only > div:nth-child(1) > div:nth-child(2)').text().replace('Category', '').trim(),
                members: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(1) > div > div:nth-child(1)').text().trim(),
                post_reach: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(2) > div > div:nth-child(1)').text().trim(),
                daily_reach: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(3) > div > div:nth-child(1)').text().trim(),
                post_per_day: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(4) > div > div:nth-child(1)').text().trim(),
                err: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(5) > div > div:nth-child(1)').text(),
                citation_index: $('body > div.wrap > div > div.row.margin-top15.small-no-padding > div:nth-child(6) > div > div:nth-child(1)').text(),
                mentions_of_channel: $('div.columns.large-4.medium-12.small-12 > b').text(),
                post_mentions: $('div.columns.large-5.medium-12.small-12 > b').text(),
                forwards: $('div.columns.large-3.medium-12.small-12 > b').text(),
                profile_pic: 'https:'+$('body > div.wrap > div > div.row.small-collapse.medium-uncollapse.sticky-canceller-container.margin-bottom15 > div.small-12.medium-3.large-3.columns > div > img').attr('data-src') || $("meta[property='og:image']").attr('content')
            }
            resolve(hasil)
        })
    })
}

function hoax() {
return new Promise((resolve, reject) => {
axios.get(`https://turnbackhoax.id/`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("figure.mh-loop-thumb").each(function(a, b) {
$("div.mh-loop-content.mh-clearfix").each(function(c, d) {
link = $(d).find("h3.entry-title.mh-loop-title > a").attr('href');
img = $(b).find("img.attachment-mh-magazine-lite-medium.size-mh-magazine-lite-medium.wp-post-image").attr('src');
title = $(d).find("h3.entry-title.mh-loop-title > a").text().trim();
desc = $(d).find("div.mh-excerpt > p").text().trim();
date = $(d).find("span.mh-meta-date.updated").text().trim();
const Data = {

title: title,
thumbnail: img,
desc: desc,
date: date,
link: link
}
hasil.push(Data)
})
})
resolve(hasil)
}).catch(reject)
});
}

function tribunnews() {
return new Promise((resolve, reject) => {
axios.get(`https://www.tribunnews.com/news`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("li.p1520.art-list.pos_rel").each(function(c, d) {
title = $(d).find("div.mr140 > h3 > a.f20.ln24.fbo.txt-oev-2").text().trim()
thumb = $(d).find("div.fr.mt5.pos_rel > a > img.shou2.bgwhite").attr('src')
desc = $(d).find("div.grey2.pt5.f13.ln18.txt-oev-3").text().trim()
date = $(d).find("div.grey.pt5 > time.foot.timeago").text().trim()
link = $(d).find("div.fr.mt5.pos_rel > a").attr('href')
const Data = {
title: title,
thumb: thumb,
desc: desc,
date: date,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
})
}

function kompasnews() {
return new Promise((resolve, reject) => {
axios.get(`https://news.kompas.com/`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.col-bs9-3").each(function(c, d) {
title = $(d).find("h3.article__title > a.article__link").text()
desc = $(d).find("div.article__lead").text().trim()
date = $(d).find("div.article__date").text().trim()
link = $(d).find("h3.article__title > a.article__link").attr('href')
const Data = {
title: title,
desc: desc,
date: date,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
})
}

function jalantikus(query) {
return new Promise((resolve, reject) => {
axios.get(`https://jalantikus.com/search/articles/${query}/`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.post-block-with-category").each(function(c, d) {
title = $(d).find("a.post-block-with-category__link").text()
category = $(d).find("a.post-info__category-link").text()
date = $(d).find("time").text()
link = `https://jalantikus.com${$(d).find("a").attr('href')}`
const Data = {
title: title,
category: category,
date: date,
link: link
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
})
}

function xnxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xnxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xxxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xxxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xxxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function otakudesuSearch(title) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://otakudesu.info/?s='+title+'&post_type=anime',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let search = []
            $('#venkonten > div > div.venser > div > div > ul > li').each(function (a, b) {
                search.push($(b).find('h2 > a').attr('href'))
                let url = search[Math.floor(Math.random() * search.length)]
                axios({
                    url,
                    method: 'GET',
                    headers: {
                        "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                    }
                }).then(({ data }) => {
                    let $ = cheerio.load(data)
                    let link_eps = []
                    $('#venkonten > div.venser > div.episodelist > ul > li').each(function (a, b) {
                        link_eps.push({ episode: $(b).find('span > a').text(), upload_at: $(b).find('span.zeebr').text(), link: $(b).find('span > a').attr('href') })
                    })
                    let hasil = {
                        title: { 
                            indonesia: $('#venkonten > div.venser > div.jdlrx > h1').text(),
                            synonym: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', ''),
                            japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '')
                        },
                        score: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ', ''),
                        producer: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ', ''),
                        type: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ', ''),
                        status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ', ''),
                        total_eps: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ', ''),
                        duration: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ', ''),
                        release: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis: ', ''),
                        studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio: ', ''),
                        genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ', ''),
                        synopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc > p').text(),
                        link_eps: link_eps
                    }
                    resolve(hasil)
                })
            })
        })
    })
}

function otakudesuDetail(url) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let link_eps = []
            $('#venkonten > div.venser > div.episodelist > ul > li').each(function (a, b) {
                link_eps.push({ episode: $(b).find('span > a').text(), upload_at: $(b).find('span.zeebr').text(), link: $(b).find('span > a').attr('href') })
            })
            let hasil = {
                title: { 
                    indonesia: $('#venkonten > div.venser > div.jdlrx > h1').text(),
                    anonym: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', ''),
                    japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '')
                },
                score: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ', ''),
                producer: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ', ''),
                type: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ', ''),
                status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ', ''),
                total_eps: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ', ''),
                duration: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ', ''),
                release: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis: ', ''),
                studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio: ', ''),
                genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ', ''),
                synopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc > p').text(),
                link_eps: link_eps
            }
            resolve(hasil)
        })
    })
}

function otakudesuDownload(url) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let mp4 = []
            $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(2) > li').each(function (a, b) {
                $(b).find('a').each(function (c, d) {
                    mp4.push({ resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href') })
                })
            })
            let mkv = []
            $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(3) > li').each(function (a, b) {
                $(b).find('a').each(function (c, d) {
                    mkv.push({ resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href') })
                })
            })
            let hasil = {
                title: $('#venkonten > div.venser > div.venutama > h1').text(),
                post: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(2)').text().replace('Posted by ', ''),
                release: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(4)').text().replace('Release on ', ''),
                credit: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(1)').text().replace('Credit: ', ''),
                encoder: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(2)').text().replace('Encoder: ', ''),
                genres: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(3)').text().replace('Genres: ', ''),
                duration: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(4)').text().replace('Duration: ', ''),
                type: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(5)').text().replace('Tipe: ', ''),
                image: $('#venkonten > div.venser > div.cukder > img').attr('src'),
                link_mp4: mp4,
                link_mkv: mkv
            }
            resolve(hasil)
        })
    })
}

function anime(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/anime.php?cat=anime&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let anime = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                anime.push($(b).find('td:nth-child(1) > div > a').attr('href') || '')
            })
            let random = anime[Math.floor(Math.random() * anime.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({ type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2)').text() })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(0).find('table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > h3').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > h3 > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        },
                        voice_actor: {
                            name: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').text(),
                            origin: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').attr('href'),
                            image: $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('data-src') || $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('src')
                        }
                    })
                })
                let staff = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(1).find('table').each(function (a, b) {
                    staff.push({
                        name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                        status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                        detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                        image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                    })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({ type: $$(b).text().split(':')[0].trim().split('\n')[0] || $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim().split('\n')[0] || $$(b).text().split(':')[1].trim() || '' })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1').text(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    trailer: $$('div.anime-detail-header-video.di-tc.va-t.pl16 > div.video-promotion > a').attr('href'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td > p').text(),
                    related,
                    character,
                    staff
                }
                resolve(hasil)
            })
        })
    })
}

function manga(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/manga.php?cat=manga&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let manga = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                manga.push($(b).find('td:nth-child(2) > a').attr('href') || '')
            })
            let random = manga[Math.floor(Math.random() * manga.length)]
            axios.get(random)
            .then((res)=> {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({ type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2) > a').text(), url: 'https://myanimelist.net'+$$(b).find('td:nth-child(2) > a').attr('href') })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({ type: $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim() })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix > div.left-column.fl-l.divider > table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text().trim(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        }
                    })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > h1').text().trim(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > span').text(),
                    related,
                    character
                }
                resolve(hasil)
            })
        })
    })
}

function wibu(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/character.php?cat=character&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let character = []
            $('#content > table > tbody > tr').each(function (a, b) {
                character.push($(b).find('td:nth-child(2) > a').attr('href'))
            })
            let random = character[Math.floor(Math.random() * character.length)]
            axios.get(random+'/pics')
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = []
                $$('#content > table > tbody > tr > td:nth-child(2) > table > tbody > tr').each(function (a, b) {
                    hasil.push({ name: $$(b).find('img').attr('alt'), image: $$(b).find('a').attr('href') ||$(b).find('img').attr('src') || $$(b).find('img').attr('data-src') })
                })
                resolve(hasil)
            })
        })
    })
}

function fandom(q) {
    return new Promise((resolve, reject) => {
        axios.get(`https://jump.fandom.com/wiki/Special:Search?query=${q}&scope=internal&navigationSearch=true`)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let getres = []
            $('#mw-content-text > section > div > div.unified-search__layout__main > ul > li').each(function (a, b) {
                getres.push($(b).find('article > h1 > a').attr('href'))
            })
            let random = "https://jump.fandom.com/wiki/JoJo%27s_Bizarre_Adventure"
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let part = []
                $$('#mw-content-text > div > ul > li').each(function (a, b) {
                    part.push({ part: $$(b).text().trim(), url: random.split('/')[0]+$$(b).find('a').attr('href') })
                })
                let info = []
                $$('#mw-content-text > div > table > tbody > tr').each(function (a, b) {
                    info.push({ type: $$(b).find('td:nth-child(1)').text().trim(), result: $$(b).find('td:nth-child(2)').text() })
                })
                let hasil = {
                    title: $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main > div.page-header > div.page-header__bottom > div.page-header__title-wrapper > h1').text().trim(),
                    info: $$('#mw-content-text > div > p:nth-child(2)').text(),
                    plot: $$('#mw-content-text > div > p:nth-child(6)').text(),
                    image: $$('#mw-content-text > div > table > tbody > tr:nth-child(1) > td > a').attr('href') || $$('#mw-content-text > div > table > tbody > tr:nth-child(1) > td > a > img').attr('src'),
                    part,
                    info,
                    lisensi: $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main > div.page-footer > div.license-description').text()
                }
                resolve(hasil || $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main').text())
            })
        })
    })
}

function character(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/character.php?cat=character&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let character = []
            $('#content > table > tbody > tr').each(function (a, b) {
                character.push($(b).find('td:nth-child(2) > a').attr('href'))
            })
            let random = character[Math.floor(Math.random() * character.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let voice = []
                $$('#content > table > tbody > tr > td:nth-child(2) > table').each(function (a, b) {
                    voice.push({ name: $$(b).find('td:nth-child(2) > a').text(), origin: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let animeography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(6) > tbody > tr').each(function (a, b) {
                    animeography.push({ name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let mangaography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(9) > tbody > tr').each(function (a, b) {
                    mangaography.push({ name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let hasil = {
                    name: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > h1').text(),
                    image: $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('src'),
                    detail: $$('#content > table > tbody > tr > td:nth-child(2)').text().split('Characters')[1].split('Voice Actors')[0].trim(),
                    voice_actor: voice,
                    animeography,
                    mangaography
                }
                resolve(hasil)
            })
        })
    })
}

function topAnime(type = 'anime') {
    return new Promise((resolve, reject) => {
        // type = 1. airing, 2. upcoming, 3. tv, 4. movie, 5. ova, 6. ona, 7. special, 8. bypopularity, 9. favorite
        axios.get('https://myanimelist.net/topanime.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3').text(),
                    info: $(b).find('td.title.al.va-t.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}

function topManga(type = 'manga') {
    // type = 1. manga, 2. oneshots, 3. doujin, 4. lightnovels, 5. novels, 6. manhwa, 7.manhua, 8. bypopularity, 9. favorite
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/topmanga.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3').text(),
                    info: $(b).find('td.title.al.va-t.clearfix.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}

const resep = async (menu) => new Promise((resolve, reject) => {
    get('https://api-masak-danzzcoding.vercel.app/api/search/?q=' + menu)
        .then(async (res) => {
            const { results } = await res.data
            const random = Crypto.randomInt(0, 16)
            get('https://api-masak-danzzcoding.vercel.app/api/recipe/' + results[random].key)
                .then(async (result) => {
                    const { results: resData } = await result.data
                    const bahannya = `${resData.ingredient}`
                    const bahan = bahannya.replace(/,/g, '\n')
                    const tutornya = `${resData.step}`
                    const tutornih = tutornya.replace(/,/g, '\n')
                    const tutor = tutornih.replace(/.,/g, '\n')
                    const hasil = `*Judul:* ${resData.title}\n*Penulis:* ${resData.author.user}\n*Rilis:* ${resData.author.datePublished}\n*Level:* ${resData.dificulty}\n*Waktu:* ${resData.times}\n*Porsi:* ${resData.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`
                    resolve(hasil)
                })
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
})

const kbbi = async (query) => new Promise((resolve, reject) => {
	const url = 'https://kbbi.web.id/'

	axios.get(url + query).then(res => {
		const $ = cheerio.load(res.data)
		const arti = $('div#d1').text().trim()
		resolve(arti)
	}).catch(reject)
})

const ssstik = (browser, url) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		let baseUrl = "https://ssstik.io"

		await page.goto(baseUrl)
		await page.type("#main_page_text", `${url}`)
		await page.click("#submit", {
			delay: 300,
		})

		await page.waitForSelector("#target > div > div.result_overlay", {
			delay: 300,
		})
		let mp4 = await page.$eval(
			"#target > div > div.result_overlay > a.without_watermark",
			(element) => {
				return element.getAttribute("href")
			}
		)
		let mp3 = await page.$eval(
			"#target > div > div.result_overlay > a.music",
			(element) => {
				return element.getAttribute("href")
			}
		)

		resolve({
			mp4: baseUrl + mp4,
			mp3: mp3,
		})
		page.close()
	} catch (err) {
		if (err.name == 'TimeoutError') resolve(null)
		else reject(err)
	}
})

const snaptik = (browser, url) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		const baseUrl = 'https://snaptik.app/'
		await page.goto(baseUrl)
		await page.type("#url", `${url}`)
		await page.click("#submiturl", {
			delay: 300,
		})

		await page.waitForSelector("div.snaptik-right", {
			delay: 300,
		})
		let d1 = await page.$eval(
			"div.snaptik-right > div > a",
			(element) => {
				return element.getAttribute("href")
			})
		let d2 = await page.$eval(
			"div.snaptik-right > div > a:nth-child(2)",
			(element) => {
				return element.getAttribute("href")
			}
		)
		let d3 = await page.$eval(
			"div.snaptik-right > div > a:nth-child(3)",
			(element) => {
				return element.getAttribute("href")
			}
		)
		if (d1 == undefined || d3 == undefined) reject(undefined)
		page.close()
		resolve({
			server1: d1.startsWith('/') ? baseUrl + d1 : d1,
			server2: d2.startsWith('/') ? baseUrl + d2 : d2,
			source: d3.startsWith('/') ? baseUrl + d3 : d3,
		})
	} catch (err) {
		if (err.name == 'TimeoutError') resolve(null)
		else reject(err)
	}
})

const saveFrom = (browser, url, isIG = false) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		await page.goto("https://en.savefrom.net/20/")
		await page.waitForSelector("#sf_url", {
			delay: 300,
		})
		await page.type("#sf_url", `${url}`)
		await page.click("#sf_submit", {
			delay: 300,
		})

		await page.waitForSelector("div.media-result", {
			delay: 300,
		})

		if (isIG) {
			let res = await page.$eval(
				`#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box > a`,
				(a) => {
					return a.getAttribute('href')
				}
			)
			page.close()
			resolve(res)
		} else {
			let res = await page.$$eval(
				"#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.drop-down-box > div.list > div > div > div > a",
				(a) => {
					let resu = a.map(el => {
						let data = {}
						data.url = el.getAttribute("href")
						data.quality = el.getAttribute("data-quality")
						data.type = el.getAttribute("data-type")
						return data
					})
					return resu
				})
			page.close()
			resolve(res)
		}
	} catch (e) {
		if (e.name == 'TimeoutError') resolve(null)
		else reject(e)
	}
})

function bilangangka(number) {
    const data = String(number).split('').reverse()
    let combine = ''
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 3 == 0 && i != data.length - 1) {
            data[i] = `.${data[i]}`
        }
    }
    combine = `${data.reverse().join('')}`
    return combine
}

async function zippydl(url) {
    return new Promise((resolve, reject) => {
        axios.get(urls).then(({ data }) => {
            const $ = cheerio.load(data)
            const li = $.html()
            const po = $('#dlbutton').next().html()
            const le = po.split(';')[0]
            const lo = le.split("document.getElementById('dlbutton').href =")[1]
            const result = `${urls.split('/v')[0]}${eval(lo)}`
            const ho = $('#lrbox').text().replace(/\n/g, '')
			const ext = ho.split('Name:')[1].split('Size:')[0].split('.')[1]
            const hasil = {
                title: ho.split('Name:')[1].split('Size:')[0].trim(),
				extension: ext,
                filesize: ho.split('Size:')[1].split('Uploaded:')[0].trim(),
                upload: ho.split('Uploaded:')[1].split('          ')[0].trim(),
                link: result
            }
            resolve(hasil)
        })
    })
}

module.exports.snapinsta = snapinsta
module.exports.tafsirsurah = tafsirsurah
module.exports.sswebdesktop = sswebdesktop
module.exports.sswebtablet = sswebtablet
module.exports.sswebphone = sswebphone
module.exports.stickersearch  = stickersearch
module.exports.telesticker  = telesticker
module.exports.soundcloud  = soundcloud
module.exports.otakudesu = otakudesu
module.exports.covid = covid
module.exports.cnn = cnn
module.exports.ongoing = ongoing
module.exports.komiku = komiku
module.exports.tebakgambar = tebakgambar
module.exports.surah = surah
module.exports.sholat = sholat
module.exports.lirik = lirik
module.exports.chara = chara
module.exports.wattpad = wattpad
module.exports.playstore = playstore
module.exports.pinterest = pinterest
module.exports.igdl = igdl
module.exports.igstory = igstory
module.exports.twitter = twitter
module.exports.fbdown = fbdown
module.exports.fbdl = fbdl
module.exports.joox = joox
module.exports.ytdl = ytdl
module.exports.ytsearch = ytsearch
module.exports.ytplaymp3 = ytplaymp3
module.exports.ytplaymp4 = ytplaymp4
module.exports.ytmp3 = ytmp3
module.exports.ytmp4 = ytmp4
module.exports.ttdownloader = ttdownloader
module.exports.wallpaper = wallpaper
module.exports.wikimedia = wikimedia
module.exports.aiovideodl = aiovideodl
module.exports.ringtone = ringtone
module.exports.styletext = styletext
module.exports.ttdl = ttdl
module.exports.ttdl2 = ttdl2
module.exports.ttaud = ttaudio
module.exports.ttvid = ttvideo
module.exports.artinama = artinama
module.exports.ramalanJodoh = ramalanJodoh
module.exports.ramalanJadian = ramalanJadian
module.exports.mlstalk = mlstalk
module.exports.ffstalk = ffstalk
module.exports.npmstalk = npmstalk
module.exports.ghstalk = ghstalk
module.exports.twstalk = twstalk
module.exports.igstalk = igstalk
module.exports.ttstalk = ttstalk
module.exports.tgstalk = tgstalk
module.exports.moddroid = moddroid
module.exports.apkmody = apkmody
module.exports.sfile = sfile
module.exports.hoax = hoax
module.exports.igvideo = igvideo
module.exports.igimg = igimg
module.exports.tribunnews = tribunnews
module.exports.kompasnews = kompasnews
module.exports.jalantikus = jalantikus
module.exports.xnxxsearch = xnxxsearch
module.exports.xnxxdl = xnxxdl
module.exports.xxxxsearch = xxxxsearch
module.exports.xxxxdl = xxxxdl
module.exports.otakudesuSearch = otakudesuSearch
module.exports.otakudesuDetail = otakudesuDetail
module.exports.otakudesuDownload = otakudesuDownload
module.exports.anime = anime
module.exports.manga = manga
module.exports.wibu = wibu
module.exports.fandom = fandom
module.exports.character = character
module.exports.topAnime = topAnime
module.exports.topManga = topManga
module.exports.gcwa = gcwa
module.exports.resep = resep
module.exports.kbbi = kbbi
module.exports.ssstik = ssstik
module.exports.snaptik = snaptik
module.exports.saveFrom = saveFrom
module.exports.bilangangka = bilangangka
module.exports.zippydl = zippydl