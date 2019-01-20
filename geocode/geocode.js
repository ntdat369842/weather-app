const request = require('request');

const id = 'c6e565efcb47a6';

let geocodeAddress = (address) => {
    let encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `https://us1.locationiq.com/v1/search.php?key=${id}&q=${encodedAddress}&format=json`,
            json: true
        }, (err, res, body) => {

            if (err) {
                reject('Unable to connect to map server!!');
            } else if (body.error) {
                reject('Unable to find that address!!');
            } else if (body.length) {
                resolve({
                    address: body[0].display_name,
                    lat: body[0].lat,
                    lon: body[0].lon
                });
            }

        });
    });
}

module.exports = {
    geocodeAddress
};