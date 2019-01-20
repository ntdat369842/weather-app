const request = require('request');

let getWeather = (lat, lon) => {

    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/993767198788471901f2b816ee992b9a/${lat},${lon}`,
            json: true
        }, (err, res, body) => {
            
            if (err) {
                reject('Cant connect to weather server');
            } else if (res.statusCode == 400) {
                reject('Invalid input');
            } else if (res.statusCode == 200) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                })
            }
        });
    })
}

module.exports = {
    getWeather
}