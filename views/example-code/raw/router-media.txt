router.get('/cogan/random', async (req, res, next) => {
    var result = {
    url: `https://danzzapi.xyz/api/cogan/random?apikey=danzz`, method: 'GET', encoding: null };
    request(result, function(error, response, body) {
    res.set('Content-Type', 'image/png');
    res.send(body)
    })
    })