case 'randomcogan': {
    result = await getBuffer(`https://danzzapi.xyz/api/cogan/random?apikey=danzz`)
    client.sendMessage(m.chat, {image: result, mimetype: 'image/png'}, {quoted:m})
    }
    break