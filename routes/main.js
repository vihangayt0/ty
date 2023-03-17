require('../set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://www.danzzcoding.my.id
*/

// Module
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

// Lib
const { runtime, muptime } = require('../lib/myfunc')

// Statistic
router.get('/statistic', async (req, res, next) => {
const date = new Date
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()
const neww = performance.now()
const old = performance.now()
const ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
const cpu = require('os').cpus()
/*const json = await (await fetch('https://api.ipify.org/?format=json')).json()*/
const port = require('../port')
    status = {
        status: true,
        memory: ram,
        cpu: cpu,
        port: port,
        /*ip: json.ip,*/
        time: `${hour} : ${minute} : ${second}`,        
        speed: `${old - neww}ms`,
        info:{       
            author: 'Danzz Coding'
        }
    }
    res.json(status)
})

// Runtime
router.get('/runtime', async (req, res, next) => {
	runtim = {
		status: true,
		runtime: runtime(process.uptime()),
		info:{       
            author: 'Danzz Coding'            
        }
    }
    res.json(runtim)
})

// Uptime
router.get('/uptime', async (req, res, next) => {
	uptim = {
		status: true,
		uptime: muptime(process.uptime()),
		info:{       
            author: 'Danzz Coding'            
        }
    }
    res.json(uptim)
})

module.exports = router